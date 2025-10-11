import Link from 'next/link';
import { verifyAccess } from '@/libs/jwt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { lessons } from '@/content/lessons/manifest';
import { readProgress, getCompletionStats } from '@/libs/progress';
import LogoutButton from '@/components/LogoutButton';

export default async function DashboardPage() {
  // Verify JWT and get user data
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (!token) {
    redirect('/');
  }

  let email: string;
  try {
    const payload = await verifyAccess(token.value);
    email = payload.email;
  } catch {
    redirect('/');
  }

  // Get progress data
  const progress = await readProgress();
  const stats = await getCompletionStats(lessons.length);

  // Calculate next open lesson
  const nextOpenLesson = lessons.find((lesson) => !progress.completed.includes(lesson.slug));

  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Dashboard</h1>
          <p className="text-lg text-base-content/70">Willkommen zurück, {email}</p>
        </div>
        <LogoutButton />
      </div>

      {/* Progress Overview Card */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Kursfortschritt</h2>

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Progress Ring */}
            <div
              className="radial-progress text-primary"
              style={{ '--value': stats.percentage, '--size': '12rem', '--thickness': '1rem' } as any}
              role="progressbar"
              aria-valuenow={stats.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="text-3xl font-bold">{stats.percentage}%</div>
            </div>

            {/* Stats & CTA */}
            <div className="flex-1">
              <div className="stats stats-vertical lg:stats-horizontal shadow mb-4">
                <div className="stat">
                  <div className="stat-title">Abgeschlossen</div>
                  <div className="stat-value text-primary">{stats.completed}</div>
                  <div className="stat-desc">von {stats.total} Lektionen</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Verbleibend</div>
                  <div className="stat-value">{stats.total - stats.completed}</div>
                  <div className="stat-desc">Lektionen offen</div>
                </div>
              </div>

              {nextOpenLesson ? (
                <Link href={`/course/${nextOpenLesson.slug}`} className="btn btn-primary btn-block">
                  Weiterlernen: {nextOpenLesson.title}
                </Link>
              ) : (
                <div className="alert alert-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Glückwunsch! Du hast alle Lektionen abgeschlossen! 🎉</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lessons List Card */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Alle Lektionen</h2>

          <div className="space-y-2">
            {lessons.map((lesson) => {
              const isCompleted = progress.completed.includes(lesson.slug);

              return (
                <Link
                  key={lesson.slug}
                  href={`/course/${lesson.slug}`}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-base-200 transition-colors"
                >
                  {/* Status Badge */}
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <div className="badge badge-success badge-lg gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="inline-block w-4 h-4 stroke-current"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    ) : (
                      <div className="badge badge-outline badge-lg">
                        Lektion {lesson.order}
                      </div>
                    )}
                  </div>

                  {/* Lesson Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{lesson.title}</h3>
                    <p className="text-sm text-base-content/70">{lesson.summary}</p>
                  </div>

                  {/* Arrow */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex gap-4 mt-8">
        <Link href="/course" className="btn btn-outline">
          Zur Kursübersicht
        </Link>
      </div>
    </main>
  );
}
