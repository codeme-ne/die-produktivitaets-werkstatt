import type { CSSProperties } from "react";

export const metadata = {
  title: "PW-Kurs Wireframes | Produktivitäts-Werkstatt",
  description: "Drei responsive Wireframes für die Kursplattform",
};

export default function PWWireframes() {
  // Beispiel-Daten für 12 Module
  const modules = [
    {
      id: 1,
      title: "Grundlagen der Produktivität",
      icon: "🎯",
      description: "Einführung in die Kernprinzipien effektiver Produktivität",
      progress: 100,
      status: "completed",
    },
    {
      id: 2,
      title: "Zeitmanagement Basics",
      icon: "⏰",
      description: "Zeitblöcke, Kalender und Prioritäten richtig setzen",
      progress: 100,
      status: "completed",
    },
    {
      id: 3,
      title: "Deep Work Methoden",
      icon: "🧠",
      description: "Konzentriertes Arbeiten ohne Ablenkung meistern",
      progress: 75,
      status: "in-progress",
    },
    {
      id: 4,
      title: "Energie Management",
      icon: "⚡",
      description: "Deine Energie optimal über den Tag verteilen",
      progress: 0,
      status: "locked",
    },
    {
      id: 5,
      title: "Gewohnheiten aufbauen",
      icon: "🔄",
      description: "Nachhaltige Routinen entwickeln und beibehalten",
      progress: 0,
      status: "locked",
    },
    {
      id: 6,
      title: "Fokus-Techniken",
      icon: "🎪",
      description: "Pomodoro, Timeboxing und weitere Fokus-Methoden",
      progress: 0,
      status: "locked",
    },
    {
      id: 7,
      title: "Digitale Tools",
      icon: "💻",
      description: "Die richtigen Apps und Tools für deine Produktivität",
      progress: 0,
      status: "locked",
    },
    {
      id: 8,
      title: "Prokrastination überwinden",
      icon: "🚀",
      description: "Strategien gegen Aufschieberitis",
      progress: 0,
      status: "locked",
    },
    {
      id: 9,
      title: "Kommunikation & Meetings",
      icon: "💬",
      description: "Effiziente Kommunikation und Meeting-Management",
      progress: 0,
      status: "locked",
    },
    {
      id: 10,
      title: "Work-Life-Balance",
      icon: "⚖️",
      description: "Balance zwischen Arbeit und Privatleben finden",
      progress: 0,
      status: "locked",
    },
    {
      id: 11,
      title: "Reflexion & Optimierung",
      icon: "🔍",
      description: "Systeme analysieren und kontinuierlich verbessern",
      progress: 0,
      status: "locked",
    },
    {
      id: 12,
      title: "Langfristige Strategien",
      icon: "🎓",
      description: "Produktivität als Lebensweise etablieren",
      progress: 0,
      status: "locked",
    },
  ];

  const completedCount = modules.filter((m) => m.status === "completed").length;
  const overallProgress = Math.round((completedCount / modules.length) * 100);

  return (
    <div className="min-h-screen bg-base-100 p-4 sm:p-8">
      {/* Navigation zwischen Wireframes */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">PW-Kurs Wireframes</h1>
        <div className="tabs tabs-boxed">
          <a href="#wireframe-1" className="tab tab-active">
            Modul-Übersicht
          </a>
          <a href="#wireframe-2" className="tab">
            Einzelne Lektion
          </a>
          <a href="#wireframe-3" className="tab">
            Fortschritts-Dashboard
          </a>
        </div>
      </div>

      {/* WIREFRAME 1: Module Grid View */}
      <section id="wireframe-1" className="max-w-7xl mx-auto mb-16">
        <div className="divider divider-start text-2xl font-bold">
          Wireframe 1: Modul-Übersicht
        </div>

        {/* Header mit Gesamtfortschritt */}
        <div className="bg-base-200 rounded-box p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Radial Progress */}
            <div className="flex-shrink-0">
              <div
                className="radial-progress text-primary"
                style={
                  {
                    "--value": overallProgress,
                    "--size": "10rem",
                    "--thickness": "0.8rem",
                  } as CSSProperties
                }
                role="progressbar"
                aria-valuenow={overallProgress}
              >
                {overallProgress}%
              </div>
            </div>

            {/* Stats */}
            <div className="stats stats-vertical lg:stats-horizontal shadow flex-1">
              <div className="stat">
                <div className="stat-title">Abgeschlossen</div>
                <div className="stat-value text-success">{completedCount}</div>
                <div className="stat-desc">von {modules.length} Modulen</div>
              </div>
              <div className="stat">
                <div className="stat-title">Verbleibend</div>
                <div className="stat-value text-warning">
                  {modules.length - completedCount}
                </div>
                <div className="stat-desc">Module offen</div>
              </div>
              <div className="stat">
                <div className="stat-title">Dein Fortschritt</div>
                <div className="stat-value text-primary">
                  {overallProgress}%
                </div>
                <div className="stat-desc">Gesamtfortschritt</div>
              </div>
            </div>
          </div>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div key={module.id} className="card bg-base-200 shadow-md">
              <div className="card-body">
                {/* Modul-Nummer Badge */}
                <div className="flex items-start justify-between mb-2">
                  <div className="badge badge-primary badge-lg">
                    Modul {module.id}
                  </div>
                  {/* Status Badge */}
                  {module.status === "completed" && (
                    <div className="badge badge-success">Abgeschlossen</div>
                  )}
                  {module.status === "in-progress" && (
                    <div className="badge badge-warning">In Bearbeitung</div>
                  )}
                  {module.status === "locked" && (
                    <div className="badge badge-error">Gesperrt</div>
                  )}
                </div>

                {/* Titel mit Icon */}
                <h2 className="card-title">
                  <span className="text-3xl mr-2">{module.icon}</span>
                  <span className="text-lg">{module.title}</span>
                </h2>

                {/* Beschreibung */}
                <p className="text-sm text-base-content/70 mb-4">
                  {module.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Fortschritt</span>
                    <span className="font-semibold">{module.progress}%</span>
                  </div>
                  <progress
                    className="progress progress-primary w-full"
                    value={module.progress}
                    max="100"
                  ></progress>
                </div>

                {/* CTA Button */}
                <div className="card-actions justify-end mt-4">
                  {module.status === "completed" && (
                    <button className="btn btn-outline btn-sm">
                      Wiederholen
                    </button>
                  )}
                  {module.status === "in-progress" && (
                    <button className="btn btn-primary btn-sm">
                      Weiterlernen
                    </button>
                  )}
                  {module.status === "locked" && (
                    <button className="btn btn-disabled btn-sm">
                      Gesperrt
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WIREFRAME 2: Single Video/Lesson View */}
      <section id="wireframe-2" className="max-w-5xl mx-auto mb-16">
        <div className="divider divider-start text-2xl font-bold">
          Wireframe 2: Einzelne Lektion
        </div>

        {/* Breadcrumbs */}
        <div className="breadcrumbs text-sm mb-6">
          <ul>
            <li>
              <a>Start</a>
            </li>
            <li>
              <a>Produktivitäts-Werkstatt</a>
            </li>
            <li>
              <a>Modul 3: Deep Work</a>
            </li>
            <li>Lektion 2</li>
          </ul>
        </div>

        {/* Video Hero */}
        <div className="mb-8">
          <div className="aspect-video w-full bg-base-300 rounded-box flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🎥</div>
              <p className="text-xl font-semibold">Video-Player Placeholder</p>
              <p className="text-sm text-base-content/60">
                16:9 aspect-video Container
              </p>
            </div>
          </div>
        </div>

        {/* Titel */}
        <h1 className="text-4xl font-bold mb-2">
          Lektion 2: Die Pomodoro-Technik
        </h1>
        <p className="text-base-content/70 mb-6">
          Modul 3: Deep Work Methoden • 18 Minuten
        </p>

        {/* Tabs für Inhalte */}
        <div role="tablist" className="tabs tabs-boxed mb-6">
          <input
            type="radio"
            name="content_tabs"
            role="tab"
            className="tab"
            aria-label="Beschreibung"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-200 border-base-300 rounded-box p-6 mt-4"
          >
            <h3 className="text-xl font-semibold mb-4">Über diese Lektion</h3>
            <p className="mb-4">
              In dieser Lektion lernst du die Pomodoro-Technik kennen – eine der
              effektivsten Methoden für fokussiertes Arbeiten. Du erfährst, wie
              du 25-Minuten-Arbeitsblöcke optimal nutzt und regelmäßige Pausen
              einhältst.
            </p>
            <p className="mb-4">
              Die Technik hilft dir dabei, Ablenkungen zu minimieren und deine
              Konzentration über längere Zeiträume aufrechtzuerhalten.
            </p>
            <div className="divider">Lernziele</div>
            <ul className="list-disc list-inside space-y-2">
              <li>Die Grundprinzipien der Pomodoro-Technik verstehen</li>
              <li>Einen Pomodoro-Timer richtig einsetzen</li>
              <li>Pausen sinnvoll gestalten</li>
              <li>Die Technik an deinen Alltag anpassen</li>
            </ul>
          </div>

          <input
            type="radio"
            name="content_tabs"
            role="tab"
            className="tab"
            aria-label="Ressourcen"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-200 border-base-300 rounded-box p-6 mt-4"
          >
            <h3 className="text-xl font-semibold mb-4">
              Downloads & Ressourcen
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-base-100 rounded-box">
                <span className="text-2xl">📄</span>
                <div className="flex-1">
                  <p className="font-semibold">Pomodoro-Vorlage.pdf</p>
                  <p className="text-xs text-base-content/60">420 KB • PDF</p>
                </div>
                <button className="btn btn-sm btn-primary">Download</button>
              </div>
              <div className="flex items-center gap-3 p-3 bg-base-100 rounded-box">
                <span className="text-2xl">📊</span>
                <div className="flex-1">
                  <p className="font-semibold">Tracking-Sheet.xlsx</p>
                  <p className="text-xs text-base-content/60">85 KB • Excel</p>
                </div>
                <button className="btn btn-sm btn-primary">Download</button>
              </div>
              <div className="flex items-center gap-3 p-3 bg-base-100 rounded-box">
                <span className="text-2xl">🔗</span>
                <div className="flex-1">
                  <p className="font-semibold">Empfohlene Timer-Apps</p>
                  <p className="text-xs text-base-content/60">Externe Links</p>
                </div>
                <button className="btn btn-sm btn-outline">Öffnen</button>
              </div>
            </div>
          </div>

          <input
            type="radio"
            name="content_tabs"
            role="tab"
            className="tab"
            aria-label="Quiz"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-200 border-base-300 rounded-box p-6 mt-4"
          >
            <h3 className="text-xl font-semibold mb-4">Wissenstest</h3>
            <p className="mb-4">
              Überprüfe dein Wissen mit 5 kurzen Fragen zur Pomodoro-Technik.
            </p>
            <button className="btn btn-primary">Quiz starten</button>
          </div>
        </div>

        {/* Steps Navigation */}
        <div className="card bg-base-200 shadow-md mb-8">
          <div className="card-body">
            <h3 className="card-title text-sm">Lektionen in diesem Modul</h3>
            <ul className="steps steps-horizontal lg:steps-vertical w-full">
              <li data-content="✓" className="step step-primary">
                Lektion 1: Einführung
              </li>
              <li data-content="●" className="step step-primary">
                Lektion 2: Pomodoro-Technik
              </li>
              <li data-content="○" className="step">
                Lektion 3: Timeboxing
              </li>
              <li data-content="○" className="step">
                Lektion 4: Flow-State
              </li>
              <li data-content="○" className="step">
                Lektion 5: Zusammenfassung
              </li>
            </ul>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button className="btn btn-outline">
            <span className="mr-2">←</span>
            Zurück
          </button>
          <button className="btn btn-primary">
            Nächste Lektion
            <span className="ml-2">→</span>
          </button>
        </div>

        {/* Floating FAB */}
        <div className="fab">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-lg btn-circle btn-primary"
          >
            ✓
          </div>
          <div>
            Als abgeschlossen markieren
            <button className="btn btn-lg btn-circle btn-success">✓</button>
          </div>
          <div>
            Lesezeichen setzen
            <button className="btn btn-lg btn-circle">🔖</button>
          </div>
          <div>
            Notiz hinzufügen
            <button className="btn btn-lg btn-circle">📝</button>
          </div>
        </div>
      </section>

      {/* WIREFRAME 3: Progress Dashboard */}
      <section id="wireframe-3" className="max-w-6xl mx-auto mb-16">
        <div className="divider divider-start text-2xl font-bold">
          Wireframe 3: Fortschritts-Dashboard
        </div>

        {/* Stats Karten */}
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full mb-8">
          <div className="stat">
            <div className="stat-figure text-primary">
              <span className="text-4xl">✅</span>
            </div>
            <div className="stat-title">Abgeschlossene Module</div>
            <div className="stat-value text-primary">2</div>
            <div className="stat-desc">von 12 Modulen fertig</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-warning">
              <span className="text-4xl">📚</span>
            </div>
            <div className="stat-title">Verbleibende Module</div>
            <div className="stat-value text-warning">10</div>
            <div className="stat-desc">noch zu absolvieren</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-success">
              <span className="text-4xl">🔥</span>
            </div>
            <div className="stat-title">Lern-Streak</div>
            <div className="stat-value text-success">7</div>
            <div className="stat-desc">Tage in Folge</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-info">
              <span className="text-4xl">⏱️</span>
            </div>
            <div className="stat-title">Geschätzte Restzeit</div>
            <div className="stat-value text-info">6h</div>
            <div className="stat-desc">bis zum Abschluss</div>
          </div>
        </div>

        {/* Timeline mit 12 Modulen */}
        <div className="card bg-base-200 shadow-md mb-8">
          <div className="card-body">
            <h2 className="card-title">Dein Kurs-Fortschritt</h2>
            <ul className="timeline timeline-horizontal lg:timeline-vertical">
              {modules.map((module, index) => (
                <li key={module.id}>
                  {index !== 0 && (
                    <hr
                      className={
                        module.status === "completed" ? "bg-primary" : ""
                      }
                    />
                  )}
                  <div className="timeline-start lg:timeline-box">
                    <div className="font-semibold">Modul {module.id}</div>
                    <div className="text-xs">
                      {module.icon} {module.title}
                    </div>
                  </div>
                  <div className="timeline-middle">
                    <button
                      className={`btn btn-circle btn-sm ${
                        module.status === "completed"
                          ? "btn-primary"
                          : module.status === "in-progress"
                            ? "btn-warning"
                            : "btn-outline"
                      }`}
                    >
                      {module.status === "completed"
                        ? "✓"
                        : module.status === "in-progress"
                          ? "●"
                          : "○"}
                    </button>
                  </div>
                  <div className="timeline-end lg:hidden">
                    {module.progress}%
                  </div>
                  {index !== modules.length - 1 && (
                    <hr
                      className={
                        module.status === "completed" ? "bg-primary" : ""
                      }
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Collapse für abgeschlossene Module */}
        <div className="space-y-2 mb-8">
          <h3 className="text-xl font-semibold mb-4">
            Abgeschlossene Module im Detail
          </h3>

          {modules
            .filter((m) => m.status === "completed")
            .map((module) => (
              <div
                key={module.id}
                className="collapse collapse-arrow bg-base-200"
              >
                <input type="radio" name="completed_modules" />
                <div className="collapse-title font-medium">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{module.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold">
                        Modul {module.id}: {module.title}
                      </div>
                      <div className="text-xs text-base-content/60">
                        Abgeschlossen am 15.10.2025
                      </div>
                    </div>
                    <div className="badge badge-success">100%</div>
                  </div>
                </div>
                <div className="collapse-content">
                  <div className="divider divider-start">Details</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold">Abschlussdatum</p>
                      <p className="text-sm text-base-content/70">
                        15.10.2025, 14:32 Uhr
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Bearbeitungszeit</p>
                      <p className="text-sm text-base-content/70">2h 15min</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Quiz-Ergebnis</p>
                      <p className="text-sm text-base-content/70">
                        5/5 Punkten (100%)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Zertifikat</p>
                      <p className="text-sm text-base-content/70">Verfügbar</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-sm btn-outline">
                      Wiederholen
                    </button>
                    <button className="btn btn-sm btn-primary">
                      Zertifikat laden
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* CTA zum nächsten Modul */}
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="text-6xl">🚀</div>
              <div className="flex-1 text-center lg:text-left">
                <h2 className="card-title text-2xl mb-2">
                  Bereit für das nächste Modul?
                </h2>
                <p>Modul 3: Deep Work Methoden wartet auf dich!</p>
              </div>
              <div className="card-actions">
                <button className="btn btn-lg btn-wide bg-base-100 text-base-content hover:bg-base-200">
                  Modul 3 starten
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing am Ende */}
      <div className="h-32"></div>
    </div>
  );
}
