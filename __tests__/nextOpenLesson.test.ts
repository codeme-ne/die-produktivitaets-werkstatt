import { getNextOpenLesson } from "@/libs/pwCourse";
import type { Course } from "@/types/course";
import type { ModuleReleaseState } from "@/libs/releases";
import type { CourseProduct } from "@/types/products";
import * as pwCourse from "@/libs/pwCourse";

const courseFixture: Course = {
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
          resources: [],
        },
        {
          slug: "l2",
          title: "Lesson 2",
          order: 2,
          moduleSlug: "modul-01",
          description: "",
          resources: [],
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
          resources: [],
        },
      ],
    },
  ],
};

const releaseMapLive: Record<string, ModuleReleaseState> = {
  "modul-01": {
    moduleSlug: "modul-01",
    releaseAt: null,
    released: false,
    isReleased: false,
    sendEmail: false,
  },
  "modul-02": {
    moduleSlug: "modul-02",
    releaseAt: null,
    released: true,
    isReleased: true,
    sendEmail: false,
  },
};

beforeEach(() => {
  pwCourse.clearCourseCache();
  jest.spyOn(pwCourse, "loadCourse").mockReturnValue(courseFixture);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("getNextOpenLesson with release map", () => {
  it("returns first incomplete lesson in released modules", () => {
    const progress: Record<string, boolean> = {};
    const result = getNextOpenLesson(
      progress,
      releaseMapLive,
      "live",
      courseFixture,
    );
    expect(result).toEqual({
      moduleSlug: "modul-02",
      lessonSlug: "l1",
      title: "Lesson 1",
    });
  });

  it("falls back to last lesson of last released module when all done", () => {
    const progress: Record<string, boolean> = {
      "modul-02/l1": true,
    };
    const result = getNextOpenLesson(
      progress,
      releaseMapLive,
      "live",
      courseFixture,
    );
    expect(result).toEqual({
      moduleSlug: "modul-02",
      lessonSlug: "l1",
      title: "Lesson 1",
    });
  });

  it("ignores release locks for self-paced product", () => {
    const progress: Record<string, boolean> = {};
    const releaseMapLocked: Record<string, ModuleReleaseState> = {
      "modul-01": { ...releaseMapLive["modul-01"], isReleased: false },
      "modul-02": { ...releaseMapLive["modul-02"], isReleased: false },
    };
    const result = getNextOpenLesson(
      progress,
      releaseMapLocked,
      "self-paced" as CourseProduct,
      courseFixture,
    );
    expect(result).toEqual({
      moduleSlug: "modul-01",
      lessonSlug: "l1",
      title: "Lesson 1",
    });
  });
});
