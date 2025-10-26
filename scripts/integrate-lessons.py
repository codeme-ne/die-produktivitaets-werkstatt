#!/usr/bin/env python3
"""
Integration Script für Videobeschreibungen Module 4-6
Parst die modulbasierten MD-Dateien und erstellt/überschreibt Lesson-Dateien
"""

import re
import os
from pathlib import Path
from typing import Dict, List, Tuple

# Basis-Pfade
DOCS_DIR = Path("/home/lukasz/development/active/ship-fast-ts/docs")
LESSONS_DIR = Path("/home/lukasz/development/active/ship-fast-ts/content/lessons")

# Modul-Konfiguration
MODULES = {
    4: {
        "source": "PW_ Videobeschreibungen Circle Modul 1-12(4).md",
        "lessons": list(range(24, 32)),  # 24-31
        "target_dir": "modul-04",
        "mapping": {
            24: "reflexion-lebenskompass.md",
            25: "dein-protokoll-fuer-einen-produktiven-tag.md",
            26: "dein-idealer-dienstag.md",
            27: "dein-morgen-manifest.md",
            28: "fokuszeit.md",
            29: "abendliches-abschalten.md",
            30: "experiment-woche-4-morgen-manifest-und-idealer-dienstag.md",
            31: "produktive-tage-feedback-badge-verfuegbar.md"
        },
        "delete": ["reflexion-produktive-tage.md"]
    },
    5: {
        "source": "PW_ Videobeschreibungen Circle Modul 1-12(5).md",
        "lessons": list(range(32, 38)),  # 32-37
        "target_dir": "modul-05",
        "mapping": {
            32: "reflexion-produktive-tage.md",
            33: "zukunftsskizze-ueberblick.md",
            34: "dein-odyssee-plan.md",
            35: "dein-vision-board.md",
            36: "dein-drei-jahres-traum.md",
            37: "zukunftsskizze-feedback.md"
        },
        "delete": []
    },
    6: {
        "source": "PW_ Videobeschreibungen Circle Modul 1-12(6).md",
        "lessons": list(range(38, 44)),  # 38-43
        "target_dir": "modul-06",
        "mapping": {
            38: "reflexion-zukunftsskizze.md",
            39: "der-ausgeglichene-wochenplan.md",
            40: "das-woechentliche-planungsritual.md",
            41: "die-ideale-woche.md",
            42: "experiment-woche-6-deine-ideale-woche.md",
            43: "ausgeglichene-wochen-feedback-badge-verfuegbar.md"
        },
        "delete": []
    }
}


def parse_lessons_from_file(file_path: Path) -> Dict[int, str]:
    """
    Parst eine Modul-Datei und extrahiert alle Lessons mit Inhalt

    Returns:
        Dict mit Lesson-Nummer → Lesson-Content
    """
    print(f"📖 Parse {file_path.name}...")

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split bei "Lesson X of 51"
    lessons = {}
    # Pattern: Lesson X of 51, dann Content bis zum nächsten "---\n\nLesson" oder Ende
    pattern = r'Lesson (\d+) of 51\n\n(.*?)(?=\n---\n\nLesson|\Z)'

    matches = re.finditer(pattern, content, re.DOTALL)

    for match in matches:
        lesson_num = int(match.group(1))
        lesson_content = match.group(2).strip()

        # Bereinige doppelte Trennlinien am Ende
        lesson_content = re.sub(r'\n\n---\n\n---$', '', lesson_content)
        lesson_content = lesson_content.strip()

        lessons[lesson_num] = lesson_content
        print(f"  ✓ Lesson {lesson_num} ({len(lesson_content)} Zeichen)")

    return lessons


def clean_content(content: str) -> str:
    """Bereinigt den Lesson-Content"""
    # Entferne trailing "---" am Ende
    content = re.sub(r'\n---\s*$', '', content)

    # Entferne doppelte Leerzeilen (mehr als 2)
    content = re.sub(r'\n{3,}', '\n\n', content)

    # Trim whitespace
    content = content.strip()

    # Stelle sicher dass Datei mit Newline endet
    if not content.endswith('\n'):
        content += '\n'

    return content


def process_module(module_num: int, dry_run: bool = False) -> Dict:
    """
    Verarbeitet ein komplettes Modul

    Returns:
        Stats dict mit created, updated, deleted counts
    """
    config = MODULES[module_num]
    stats = {"created": 0, "updated": 0, "deleted": 0, "errors": []}

    print(f"\n{'='*60}")
    print(f"🔧 Verarbeite Modul {module_num}")
    print(f"{'='*60}")

    # 1. Parse Source-Datei
    source_path = DOCS_DIR / config["source"]
    if not source_path.exists():
        error = f"❌ Quelldatei nicht gefunden: {source_path}"
        print(error)
        stats["errors"].append(error)
        return stats

    lessons = parse_lessons_from_file(source_path)

    # 2. Lösche Dateien falls konfiguriert
    target_dir = LESSONS_DIR / config["target_dir"]
    for filename in config["delete"]:
        file_path = target_dir / filename
        if file_path.exists():
            if not dry_run:
                file_path.unlink()
            print(f"🗑️  Gelöscht: {filename}")
            stats["deleted"] += 1
        else:
            print(f"⚠️  Zu löschen, aber nicht gefunden: {filename}")

    # 3. Erstelle/Überschreibe Dateien
    for lesson_num, filename in config["mapping"].items():
        file_path = target_dir / filename

        if lesson_num not in lessons:
            error = f"❌ Lesson {lesson_num} nicht in Quelldatei gefunden"
            print(error)
            stats["errors"].append(error)
            continue

        content = clean_content(lessons[lesson_num])

        # Prüfe ob Datei existiert
        exists = file_path.exists()
        action = "📝 Überschrieben" if exists else "🆕 Neu erstellt"

        if not dry_run:
            file_path.write_text(content, encoding='utf-8')

        print(f"{action}: {filename} ({len(content)} Zeichen)")

        if exists:
            stats["updated"] += 1
        else:
            stats["created"] += 1

    return stats


def main():
    """Hauptfunktion"""
    print("🚀 Integration Videobeschreibungen Module 4-6")
    print("="*60)

    # Dry-Run Option
    import sys
    dry_run = "--dry-run" in sys.argv

    if dry_run:
        print("⚠️  DRY RUN - Keine Änderungen werden geschrieben\n")

    total_stats = {"created": 0, "updated": 0, "deleted": 0, "errors": []}

    # Verarbeite alle Module
    for module_num in sorted(MODULES.keys()):
        stats = process_module(module_num, dry_run=dry_run)

        # Aggregiere Stats
        for key in ["created", "updated", "deleted"]:
            total_stats[key] += stats[key]
        total_stats["errors"].extend(stats["errors"])

    # Zusammenfassung
    print(f"\n{'='*60}")
    print("📊 ZUSAMMENFASSUNG")
    print(f"{'='*60}")
    print(f"🆕 Neu erstellt: {total_stats['created']}")
    print(f"📝 Überschrieben: {total_stats['updated']}")
    print(f"🗑️  Gelöscht: {total_stats['deleted']}")
    print(f"📁 Total bearbeitet: {total_stats['created'] + total_stats['updated'] + total_stats['deleted']}")

    if total_stats["errors"]:
        print(f"\n❌ Fehler: {len(total_stats['errors'])}")
        for error in total_stats["errors"]:
            print(f"  {error}")
        return 1

    print("\n✅ Integration erfolgreich abgeschlossen!")
    return 0


if __name__ == "__main__":
    exit(main())
