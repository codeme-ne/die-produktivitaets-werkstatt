import { NextRequest, NextResponse } from "next/server";
import { existsSync, writeFileSync, copyFileSync, readFileSync } from "fs";
import { requireAdminApi } from "@/libs/apiAuth";
import { clearCourseCache } from "@/libs/pwCourse";
import {
  ensureLessonDir,
  getLessonContent,
  resolveLessonPath,
  listLessonBackups,
  toRelativePath,
} from "@/libs/lessonContent";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    await requireAdminApi();
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Unauthorized" }, { status: 401 });
  }

  const moduleSlug = req.nextUrl.searchParams.get("module");
  const lessonSlug = req.nextUrl.searchParams.get("lesson");

  if (!moduleSlug || !lessonSlug) {
    return NextResponse.json({ error: "module and lesson query params required" }, { status: 400 });
  }

  const backupCandidate = req.nextUrl.searchParams.get("backup");

  if (backupCandidate) {
    const backups = listLessonBackups(moduleSlug, lessonSlug);
    if (backups.length === 0) {
      return NextResponse.json({ error: "No backups available" }, { status: 404 });
    }

    let resolvedPath: string | undefined;
    if (backupCandidate === "latest") {
      resolvedPath = backups[0];
    } else {
      const decoded = decodeURIComponent(backupCandidate);
      resolvedPath = backups.find((path) => {
        const rel = toRelativePath(path);
        return rel === decoded || path.endsWith(decoded);
      });
    }

    if (!resolvedPath) {
      return NextResponse.json({ error: "Backup not found" }, { status: 404 });
    }

    const content = readFileSync(resolvedPath, "utf-8");
    return NextResponse.json({
      module: moduleSlug,
      lesson: lessonSlug,
      source: "backup",
      backupPath: toRelativePath(resolvedPath),
      content,
    });
  }

  const result = getLessonContent(moduleSlug, lessonSlug);
  if (!result) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  const backups = listLessonBackups(moduleSlug, lessonSlug).map((path) =>
    toRelativePath(path),
  );

  return NextResponse.json({
    module: result.moduleSlug,
    lesson: result.lessonSlug,
    title: result.title,
    source: result.source,
    content: result.content,
    backups,
  });
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdminApi();
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Unauthorized" }, { status: 401 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const moduleSlug = body.moduleSlug || body.module;
  const lessonSlug = body.lessonSlug || body.lesson;
  const content = body.content;

  if (
    typeof moduleSlug !== "string" ||
    typeof lessonSlug !== "string" ||
    typeof content !== "string" ||
    !moduleSlug ||
    !lessonSlug
  ) {
    return NextResponse.json({ error: "moduleSlug, lessonSlug and content are required" }, { status: 400 });
  }

  const filePath = resolveLessonPath(moduleSlug, lessonSlug);
  ensureLessonDir(moduleSlug);

  let backupPath: string | null = null;
  if (existsSync(filePath)) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    backupPath = `${filePath}.bak.${timestamp}`;
    copyFileSync(filePath, backupPath);
  }

  const normalizedContent = content.endsWith("\n") ? content : `${content}\n`;
  writeFileSync(filePath, normalizedContent, "utf-8");
  clearCourseCache();

  return NextResponse.json({
    success: true,
    module: moduleSlug,
    lesson: lessonSlug,
    backup: backupPath ? backupPath.replace(`${process.cwd()}/`, "") : null,
  });
}
