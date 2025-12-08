# Claude-Flow v2.7 - Vollständige Dokumentation

## Überblick

Claude-Flow ist eine Enterprise-Grade KI-Orchestrierungsplattform für die Koordination von Multi-Agenten-Schwärmen und autonomen Workflows.

### Kern-Features
- **66+ spezialisierte Agenten** für verschiedene Entwicklungsdomänen
- **100+ MCP-Tools** für Schwarm-Orchestrierung und Automatisierung
- **AgentDB v1.3.9** mit 96x-164x schnellerer Vektorsuche
- **Hive-Mind-Architektur** mit Queen-geführter Agentenkoordination
- **Persistente Speichersysteme** (ReasoningBank + AgentDB)

### Performance-Metriken
- 84.8% SWE-Bench Lösungsrate
- 32.3% Token-Reduktion
- 2.8-4.4x Geschwindigkeitsverbesserung
- 2-3ms Query-Latenz

---

## Installation & Setup

### Voraussetzungen
- Node.js 18+
- npm 9+
- Claude Code (muss zuerst installiert sein)

### Quick Start
```bash
# Claude Code global installieren
npm install -g @anthropic-ai/claude-code

# Claude-Flow initialisieren
npx claude-flow@alpha init --force

# Hilfe anzeigen
npx claude-flow@alpha --help

# MCP-Server zu Claude hinzufügen
claude mcp add claude-flow npx claude-flow@alpha mcp start
```

---

## Haupt-Befehle

### 1. Hive Mind (Schwarm-Intelligenz)

```bash
# Interaktiver Wizard (EMPFOHLEN für Anfänger)
npx claude-flow hive-mind wizard

# System initialisieren
npx claude-flow hive-mind init

# Schwarm für Aufgabe erstellen
npx claude-flow hive-mind spawn "Build microservices architecture"

# Mit Claude Code CLI öffnen
npx claude-flow hive-mind spawn "Build REST API" --claude

# Status anzeigen
npx claude-flow hive-mind status

# Sessions auflisten
npx claude-flow hive-mind sessions
```

**Hive Mind Features:**
- Queen-geführte Koordination mit Worker-Spezialisierung
- Kollektives Gedächtnis und Wissensaustausch
- Konsensbildung für kritische Entscheidungen
- Parallele Aufgabenausführung mit Auto-Scaling
- Work-Stealing und Load-Balancing
- Echtzeit-Metriken
- Fehlertoleranz und Selbstheilung

### 2. Swarm (Multi-Agenten-Koordination)

```bash
# Basis-Schwarm starten
npx claude-flow swarm "Build a REST API with authentication"

# Mit spezifischer Strategie
npx claude-flow swarm "Research cloud architecture" --strategy research

# Parallelausführung (schneller)
npx claude-flow swarm "Optimize database queries" --max-agents 3 --parallel

# Nur-Analyse-Modus (keine Code-Änderungen)
npx claude-flow swarm "Analyze codebase for security" --analysis
```

**Strategien:**
- `research` - Forschung und Datenanalyse
- `development` - Code-Entwicklung
- `analysis` - Performance-Analyse
- `testing` - Umfassende Tests
- `optimization` - Optimierung
- `maintenance` - Wartung

**Koordinationsmodi:**
- `centralized` - Zentralisiert
- `distributed` - Verteilt
- `hierarchical` - Hierarchisch
- `mesh` - Peer-to-Peer
- `hybrid` - Kombiniert

### 3. SPARC (Entwicklungsmethodik)

SPARC = **S**pecification, **P**seudocode, **A**rchitecture, **R**efinement, **C**ompletion

```bash
# Spezifikation erstellen
npx claude-flow sparc spec "User authentication system"

# Architektur entwerfen
npx claude-flow sparc architect "Microservices architecture"

# Test-Driven Development
npx claude-flow sparc tdd "Payment processing module"

# Integration
npx claude-flow sparc integration "Connect all services"
```

### 4. Agent Management

```bash
# Agent spawnen
npx claude-flow agent spawn researcher --name "Research Bot"

# Alle Agenten auflisten
npx claude-flow agent list --json

# Agent-Info anzeigen
npx claude-flow agent info agent-456 --verbose

# Agent beenden
npx claude-flow agent terminate agent-123

# Alle 66+ verfügbaren Agenten auflisten
npx claude-flow agent agents
```

**Agent-Typen:**
- `coordinator` - Orchestrierung
- `researcher` - Forschung
- `coder` - Implementierung
- `analyst` - Analyse
- `architect` - System-Design
- `tester` - Tests
- `reviewer` - Code-Review
- `optimizer` - Optimierung

### 5. Memory (Persistentes Gedächtnis)

```bash
# Daten speichern
npx claude-flow memory store "api_design" "REST endpoints specification"

# Gedächtnis durchsuchen
npx claude-flow memory query "authentication"

# Namespaces auflisten
npx claude-flow memory list --namespace project

# Exportieren
npx claude-flow memory export backup.json

# Importieren
npx claude-flow memory import backup.json
```

### 6. Hooks (Lifecycle-Events)

```bash
# Vor Aufgabe
npx claude-flow hooks pre-task --description "Build API" --task-id task-123

# Nach Aufgabe
npx claude-flow hooks post-task --task-id task-123 --analyze-performance

# Vor Datei-Bearbeitung
npx claude-flow hooks pre-edit --file "src/api.js" --operation edit

# Nach Datei-Bearbeitung
npx claude-flow hooks post-edit --file "src/api.js" --memory-key "swarm/edits"

# Session beenden
npx claude-flow hooks session-end --export-metrics --generate-summary
```

---

## Verfügbare Agenten (66+)

### Core-Agenten
| Agent | Beschreibung |
|-------|-------------|
| `coder` | Implementierungs-Spezialist |
| `planner` | Strategische Planung |
| `researcher` | Tiefe Recherche |
| `reviewer` | Code-Review & QA |
| `tester` | Tests & Qualitätssicherung |

### Konsensus-Agenten
| Agent | Beschreibung |
|-------|-------------|
| `byzantine-coordinator` | Byzantine Fault-Tolerant Konsensus |
| `raft-manager` | Raft-Konsensus mit Leader-Election |
| `gossip-coordinator` | Gossip-basierte Protokolle |
| `quorum-manager` | Dynamische Quorum-Anpassung |

### Hive-Mind-Agenten
| Agent | Beschreibung |
|-------|-------------|
| `queen-coordinator` | Souveräner Orchestrierer |
| `worker-specialist` | Dedizierte Aufgabenausführung |
| `scout-explorer` | Informationsaufklärung |
| `swarm-memory-manager` | Verteiltes Gedächtnis |
| `collective-intelligence-coordinator` | Kognitive Prozesse |

### GitHub-Agenten
| Agent | Beschreibung |
|-------|-------------|
| `pr-manager` | Pull Request Management |
| `code-review-swarm` | AI Code Review |
| `issue-tracker` | Issue Management |
| `release-manager` | Release-Koordination |
| `workflow-automation` | GitHub Actions |

### Optimierung-Agenten
| Agent | Beschreibung |
|-------|-------------|
| `Performance Monitor` | Echtzeit-Metriken |
| `Load Balancing Coordinator` | Aufgabenverteilung |
| `Resource Allocator` | Ressourcen-Zuweisung |
| `Topology Optimizer` | Schwarm-Topologie |

---

## MCP-Tools (100+)

### Schwarm & Koordination
```javascript
mcp__claude-flow__swarm_init          // Schwarm initialisieren
mcp__claude-flow__swarm_status        // Status anzeigen
mcp__claude-flow__swarm_scale         // Skalieren
mcp__claude-flow__swarm_destroy       // Beenden

mcp__claude-flow__agent_spawn         // Agent erstellen
mcp__claude-flow__agent_list          // Agenten auflisten
mcp__claude-flow__agent_metrics       // Metriken

mcp__claude-flow__task_orchestrate    // Aufgabe orchestrieren
mcp__claude-flow__task_status         // Aufgabenstatus
```

### Gedächtnis & Neural
```javascript
mcp__claude-flow__memory_usage        // Speichernutzung
mcp__claude-flow__memory_search       // Durchsuchen
mcp__claude-flow__memory_persist      // Persistieren

mcp__claude-flow__neural_status       // Neural-Status
mcp__claude-flow__neural_train        // Training
mcp__claude-flow__neural_patterns     // Muster analysieren
```

### Parallele Ausführung (NEU!)
```javascript
// 10-20x schneller als sequentiell!
mcp__claude-flow__agents_spawn_parallel   // Mehrere Agenten parallel spawnen
mcp__claude-flow__query_control           // Laufende Abfragen steuern
mcp__claude-flow__query_list              // Aktive Abfragen auflisten
```

### GitHub-Integration
```javascript
mcp__claude-flow__github_repo_analyze     // Repo analysieren
mcp__claude-flow__github_pr_manage        // PRs verwalten
mcp__claude-flow__github_code_review      // Code Review
```

### Performance
```javascript
mcp__claude-flow__performance_report      // Performance-Bericht
mcp__claude-flow__bottleneck_analyze      // Engpässe analysieren
mcp__claude-flow__benchmark_run           // Benchmarks ausführen
```

---

## Best Practices

### 1. Parallele Ausführung nutzen
```javascript
// IMMER Operationen in EINER Nachricht bündeln
[Single Message]:
  Task("Research agent", "...")
  Task("Coder agent", "...")
  Task("Tester agent", "...")
  TodoWrite { todos: [...] }
```

### 2. Hooks für Koordination verwenden
```bash
# VOR der Arbeit
npx claude-flow hooks pre-task --description "[aufgabe]"

# WÄHREND der Arbeit
npx claude-flow hooks post-edit --file "[datei]" --memory-key "swarm/[agent]"

# NACH der Arbeit
npx claude-flow hooks post-task --task-id "[id]"
```

### 3. Gedächtnis für Kontext nutzen
```bash
# Wichtige Entscheidungen speichern
npx claude-flow memory store "architecture/decisions" "Microservices mit REST"

# Später abrufen
npx claude-flow memory query "architecture"
```

### 4. Topologie nach Komplexität wählen
| Komplexität | Topologie | Max Agents |
|-------------|-----------|------------|
| Einfach | `star` | 3 |
| Mittel | `mesh` | 5 |
| Komplex | `hierarchical` | 8+ |

---

## Flow-Nexus Cloud (Optional)

Für erweiterte Cloud-Features:

```bash
# Registrieren
npx flow-nexus@latest register

# Einloggen
npx flow-nexus@latest login

# Cloud-Sandbox erstellen
mcp__flow-nexus__sandbox_create

# Cloud-Code ausführen
mcp__flow-nexus__sandbox_execute
```

---

## Fehlerbehebung

### Problem: SPARC-Modi nicht gefunden
```bash
npx claude-flow init  # Projekt neu initialisieren
```

### Problem: Agenten spawnen nicht
```bash
# Swarm zuerst initialisieren
mcp__claude-flow__swarm_init { topology: "mesh", maxAgents: 5 }
```

### Problem: Gedächtnis nicht persistent
```bash
# ReasoningBank initialisieren
npx claude-flow agent memory init
```

---

## Nützliche Links

- **GitHub**: https://github.com/ruvnet/claude-flow
- **Discord**: https://discord.agentics.org
- **Flow-Nexus**: https://flow-nexus.ruv.io

---

## Zusammenfassung der wichtigsten Befehle

```bash
# Schnellstart
npx claude-flow hive-mind wizard          # Interaktiver Wizard

# Schwarm-Operationen
npx claude-flow swarm "aufgabe"           # Schwarm starten
npx claude-flow swarm "analyse" --analysis # Nur Analyse

# Agent-Management
npx claude-flow agent agents              # Alle Agenten auflisten
npx claude-flow agent spawn coder         # Agent spawnen

# Gedächtnis
npx claude-flow memory store "key" "value"
npx claude-flow memory query "pattern"

# SPARC-Entwicklung
npx claude-flow sparc tdd "feature"       # TDD-Modus
npx claude-flow sparc architect "system"  # Architektur

# Status & Monitoring
npx claude-flow hive-mind status
npx claude-flow status
```
