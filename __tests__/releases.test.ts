import fs from "fs";
import os from "os";
import path from "path";
import {
  getReleaseMap,
  processDueReleases,
  upsertModuleRelease,
} from "@/libs/releases";
import type { ModuleReleaseState } from "@/libs/releases";

const sendEmailMock = jest.fn();
const listActiveParticipantsMock = jest.fn();

jest.mock("@/libs/resend", () => ({
  sendEmail: (...args: any[]) => sendEmailMock(...args),
}));

jest.mock("@/libs/participants", () => ({
  listActiveParticipants: (...args: any[]) =>
    listActiveParticipantsMock(...args),
}));

jest.mock("@/libs/pwCourse", () => {
  const course = {
    modules: [
      {
        slug: "modul-01",
        title: "Modul 1",
        order: 1,
        lessons: [
          {
            slug: "l1",
            title: "Lesson 1",
            order: 1,
            moduleSlug: "modul-01",
            description: "",
            resources: [] as [],
          },
        ],
      },
      {
        slug: "modul-02",
        title: "Modul 2",
        order: 2,
        lessons: [
          {
            slug: "l1",
            title: "Lesson 1",
            order: 1,
            moduleSlug: "modul-02",
            description: "",
            resources: [] as [],
          },
        ],
      },
    ],
  };
  return {
    loadCourse: () => course,
  };
});

describe("Module release scheduling", () => {
  const originalCwd = process.cwd();
  let tempDir: string;

  beforeAll(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "pw-releases-"));
    process.chdir(tempDir);
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
  });

  afterAll(() => {
    process.chdir(originalCwd);
  });

  beforeEach(() => {
    sendEmailMock.mockReset();
    listActiveParticipantsMock.mockReset();
    listActiveParticipantsMock.mockResolvedValue([
      { email: "a@test.de", productType: "live", status: "active" },
    ]);
  });

  it("keeps module locked until release time, then releases and sends emails", async () => {
    // Plan a future release
    const future = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    await upsertModuleRelease({
      moduleSlug: "modul-01",
      releaseAt: future,
      released: false,
      sendEmail: true,
    });

    const initialMap = await getReleaseMap();
    expect(initialMap["modul-01"].isReleased).toBe(false);

    // Process when still in future -> no email
    await processDueReleases();
    expect(sendEmailMock).not.toHaveBeenCalled();

    // Re-schedule to past and process
    const past = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    await upsertModuleRelease({
      moduleSlug: "modul-01",
      releaseAt: past,
      released: false,
      sendEmail: true,
    });

    await processDueReleases();

    expect(sendEmailMock).toHaveBeenCalledTimes(1);
    expect(sendEmailMock.mock.calls[0][0]).toMatchObject({
      to: "a@test.de",
    });

    const afterMap: Record<string, ModuleReleaseState> = await getReleaseMap();
    expect(afterMap["modul-01"].isReleased).toBe(true);
  });
});
