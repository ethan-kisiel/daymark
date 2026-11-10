import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import './components/index';

/**
 * Daymark Checklist Workspace Application Shell Element
 * 
 * @csspart sidebar - The application sidebar
 * @csspart main - The main content workspace
 */
@customElement('daymark-app')
export class DaymarkApp extends LitElement {
  @property({type: String}) activeView = 'brief';
  @property({type: String}) searchQuery = '';
  @property({type: Boolean}) isQuickModalOpen = false;
  @property({type: Boolean}) isCriticalModalOpen = false;
  @property({type: Boolean}) completedExpanded = false;

  private _switchView(viewName: string) {
    this.activeView = viewName;
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  private _handleModeSelect(e: Event) {
    const select = e.target as HTMLSelectElement;
    if (select.value) {
      this._switchView(select.value);
    }
  }

  private _openQuickModal() {
    this.isQuickModalOpen = true;
  }

  private _closeQuickModal() {
    this.isQuickModalOpen = false;
  }

  render() {
    return html`
      <div class="app">
        <header class="topbar">
          <div class="brand">
            <div class="mark">✓</div>
            <span>DAYMARK</span>
          </div>

          <div class="search">
            <input
              id="search"
              placeholder="Search tasks, checklists, categories…"
              aria-label="Search"
              .value=${this.searchQuery}
              @input=${(e: Event) => this.searchQuery = (e.target as HTMLInputElement).value}
            >
            <kbd>⌘ K</kbd>
          </div>

          <div class="top-actions">
            <select class="mode-select" id="modeSelect" @change=${this._handleModeSelect} aria-label="Active cognitive mode">
              <option value="deep" ?selected=${this.activeView === 'deep'}>Deep Work</option>
              <option value="admin" ?selected=${this.activeView === 'admin'}>Admin &amp; Comms</option>
              <option value="maintenance" ?selected=${this.activeView === 'maintenance'}>Maintenance</option>
              <option value="shutdown" ?selected=${this.activeView === 'shutdown'}>Shutdown / Transition</option>
            </select>
            <dm-button variant="primary" type="button" @click=${this._openQuickModal}>Quick add</dm-button>
          </div>
        </header>

        <main class="workspace">
          <dm-panel title="Daymark" subtitle="A clear runway for today.">
            <div slot="header-action">
              <dm-button type="button" @click=${() => this._switchView('deep')}>Focus view</dm-button>
            </div>

            <div class="stack">
              <dm-task-card title="Review weekly priorities" meta="Admin • Weekly review" .checked=${true} .progress=${100}>
                <span slot="actions"><dm-pill variant="green">Complete</dm-pill></span>
              </dm-task-card>

              <dm-task-card title="Deploy production hotfix" meta="Engineering • Weekly SOP • Due today, 14:00" .checked=${false} .progress=${35}>
                <span slot="actions"><dm-pill variant="amber">Priority</dm-pill></span>
              </dm-task-card>

              <dm-step-item text="Finalize onboarding copy" subtext="Need product signoff" .checked=${true}></dm-step-item>
              <dm-step-item text="Review customer feedback highlights" subtext="Priority follow-ups" .checked=${false}></dm-step-item>
            </div>
          </dm-panel>
        </main>
      </div>

      <dm-modal .open=${this.isQuickModalOpen} title="Add a task" eyebrow="Quick capture">
        <p>Capture the next action without interrupting your flow.</p>
        <div class="field" style="margin-top:12px; display:grid; gap:8px;">
          <label for="quickTitle">Task title</label>
          <input id="quickTitle" placeholder="What needs to be done?" style="width:100%; border:1px solid var(--line); border-radius:7px; padding:10px; margin-top:6px;">
        </div>

        <div slot="actions">
          <dm-button type="button" @click=${this._closeQuickModal}>Cancel</dm-button>
          <dm-button variant="primary" type="button" @click=${this._closeQuickModal}>Add task</dm-button>
        </div>
      </dm-modal>
    `;
  }

  static styles = css`
    :host {
      --bg: #f3f0ea;
      --bg-strong: #ebe3d8;
      --surface: #fffdfb;
      --surface-soft: #f7f3ef;
      --line: #dde3dc;
      --ink: #1f2b28;
      --muted: #66756d;
      --green: #3f6559;
      --green-deep: #2d4d44;
      --green-soft: #edf3ef;
      --amber: #a97045;
      --amber-soft: #f8efe2;
      --red: #a45e4d;
      --red-soft: #fbeae6;
      --shadow: 0 1px 0 rgba(26, 37, 33, 0.04), 0 6px 18px rgba(18, 28, 25, 0.04);
      --radius: 16px;
      display: block;
      width: 100%;
      min-height: 100vh;
      background: var(--bg);
      color: var(--ink);
      font-family: Inter, 'Segoe UI', sans-serif;
      font-size: 14px;
    }

    * { box-sizing: border-box; }

    button, input, select, textarea {
      font: inherit;
      cursor: pointer;
    }

    .app {
      min-height: 100vh;
      display: grid;
      grid-template-rows: 72px 1fr;
    }

    .topbar {
      position: sticky;
      top: 0;
      z-index: 5;
      height: 72px;
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 0 26px;
      background: #f7f3ef;
      border-bottom: 1px solid var(--line);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 11px;
      min-width: 210px;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.14em;
      color: var(--green-deep);
    }

    .mark {
      width: 30px;
      height: 30px;
      display: grid;
      place-items: center;
      border-radius: 10px;
      background: var(--green-soft);
      border: 1px solid rgba(63, 101, 89, 0.18);
      color: var(--green);
      font-size: 16px;
      font-weight: 700;
    }

    .search {
      position: relative;
      flex: 1;
      max-width: 440px;
      height: 40px;
    }

    .search::before {
      content: '⌕';
      position: absolute;
      left: 14px;
      top: 9px;
      color: var(--muted);
      font-size: 18px;
      pointer-events: none;
    }

    .search input {
      width: 100%;
      height: 100%;
      padding: 0 48px 0 40px;
      border: 1px solid var(--line);
      border-radius: 12px;
      background: var(--surface-soft);
      color: var(--ink);
      outline: none;
      transition: border-color 0.2s ease;
    }

    .search input:focus {
      border-color: rgba(63, 101, 89, 0.35);
    }

    .search kbd {
      position: absolute;
      right: 12px;
      top: 10px;
      padding: 3px 7px;
      border-radius: 6px;
      border: 1px solid var(--line);
      background: rgba(255, 255, 255, 0.65);
      font-size: 10px;
      color: var(--muted);
    }

    .top-actions {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .mode-select,
    .btn {
      border: 1px solid var(--line);
      border-radius: 12px;
      background: var(--surface);
      color: var(--ink);
      transition: border-color 0.2s ease, transform 0.15s ease;
    }

    .mode-select {
      padding: 9px 12px;
      color: var(--ink);
      background: rgba(255, 255, 255, 0.85);
    }

    .btn {
      padding: 9px 14px;
      font-weight: 600;
    }

    .btn:hover,
    .mode-select:hover {
      border-color: rgba(63, 101, 89, 0.25);
      transform: translateY(-1px);
    }

    .btn.primary {
      background: var(--green);
      color: white;
      border-color: var(--green);
    }

    .btn.small {
      padding: 6px 10px;
      font-size: 12px;
    }

    .workspace {
      max-width: 920px;
      width: 100%;
      margin: 0 auto;
      padding: 36px 20px 60px;
    }

    .stack {
      display: grid;
      gap: 12px;
    }

    .field {
      display: grid;
      gap: 8px;
    }

    .field label {
      color: var(--muted);
      font-size: 12px;
      font-weight: 600;
    }

    .field input {
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 10px 12px;
      background: var(--surface-soft);
      color: var(--ink);
      outline: none;
    }

    .field input:focus {
      border-color: rgba(63, 101, 89, 0.35);
    }

    .nav-label {
      padding: 0 10px;
      margin-bottom: 8px;
      color: var(--muted);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .nav {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .nav button {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border: 0;
      border-radius: 10px;
      background: transparent;
      color: #4e5f59;
      text-align: left;
      font-weight: 600;
      transition: background 0.2s ease, color 0.2s ease;
    }

    .nav button:hover {
      background: rgba(63, 101, 89, 0.05);
    }

    .nav button.active {
      background: var(--green-soft);
      color: var(--green-deep);
      box-shadow: inset 0 0 0 1px rgba(63, 101, 89, 0.08);
    }

    .nav .count {
      margin-left: auto;
      font-size: 12px;
      color: var(--muted);
    }

    .nav-icon {
      width: 18px;
      text-align: center;
      font-size: 14px;
      opacity: 0.85;
    }

    .side-bottom {
      margin-top: auto;
      padding-top: 16px;
      border-top: 1px solid var(--line);
      color: var(--muted);
      font-size: 12px;
      line-height: 1.6;
    }

    .workspace {
      width: 100%;
      max-width: 1600px;
      padding: 32px clamp(22px, 4vw, 60px) 60px;
      margin: 0 auto;
      overflow-y: auto;
      height: calc(100vh - 72px);
    }

    .page-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      margin-bottom: 22px;
    }

    .eyebrow {
      margin-bottom: 10px;
      color: var(--green);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0 0 8px;
      font-size: clamp(28px, 3vw, 36px);
      letter-spacing: -0.05em;
      line-height: 1.1;
      font-weight: 760;
    }

    .subtitle {
      margin: 0;
      color: var(--muted);
      line-height: 1.6;
    }

    .date-line {
      margin-top: 8px;
      color: var(--muted);
      font-size: 12px;
    }

    .panel {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
    }

    .panel-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 18px 20px;
      border-bottom: 1px solid var(--line);
    }

    .panel-title {
      font-size: 14px;
      font-weight: 700;
    }

    .panel-sub {
      margin-top: 4px;
      font-size: 12px;
      color: var(--muted);
    }

    .panel-body {
      padding: 18px 20px;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.82fr);
      gap: 18px;
    }

    .grid-3 {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .stat {
      padding: 18px 20px;
    }

    .stat-label {
      font-size: 12px;
      color: var(--muted);
    }

    .stat-value {
      margin: 10px 0 5px;
      font-size: 30px;
      font-weight: 760;
      letter-spacing: -0.04em;
    }

    .stat-foot {
      font-size: 11px;
      color: var(--green);
    }

    .timeline {
      display: flex;
      flex-direction: column;
    }

    .time-row {
      display: grid;
      grid-template-columns: 64px 18px 1fr;
      gap: 12px;
      min-height: 88px;
    }

    .time {
      padding-top: 4px;
      color: var(--muted);
      font-size: 12px;
      font-variant-numeric: tabular-nums;
    }

    .rail {
      position: relative;
      display: flex;
      justify-content: center;
    }

    .rail::after {
      content: '';
      position: absolute;
      top: 12px;
      bottom: -2px;
      width: 1px;
      background: #e3e8e3;
    }

    .dot {
      z-index: 1;
      width: 9px;
      height: 9px;
      margin-top: 4px;
      border-radius: 50%;
      border: 2px solid var(--green);
      background: white;
    }

    .task-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 0 0 18px;
      border-bottom: 1px solid #eef1ee;
    }

    .task-check {
      flex: none;
      width: 17px;
      height: 17px;
      margin-top: 2px;
      border: 1.5px solid #c0c9c1;
      border-radius: 6px;
      background: white;
      display: grid;
      place-items: center;
      color: white;
      font-size: 10px;
    }

    .task-check.checked {
      background: var(--green);
      border-color: var(--green);
    }

    .task-name {
      margin-bottom: 5px;
      font-weight: 650;
    }

    .task-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 6px;
      color: var(--muted);
      font-size: 11px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      padding: 4px 7px;
      border-radius: 6px;
      background: #f1f3ef;
      color: #67746c;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.02em;
    }

    .pill.green {
      background: var(--green-soft);
      color: var(--green);
    }

    .pill.amber {
      background: var(--amber-soft);
      color: var(--amber);
    }

    .pill.red {
      background: var(--red-soft);
      color: var(--red);
    }

    .due {
      margin-left: auto;
      white-space: nowrap;
      color: var(--muted);
      font-size: 11px;
    }

    .progress {
      height: 6px;
      margin-top: 10px;
      border-radius: 999px;
      background: #edf1ed;
      overflow: hidden;
    }

    .progress span {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--green) 0%, var(--green-deep) 100%);
    }

    .progress-line {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      color: var(--muted);
      font-size: 11px;
    }

    .task-card {
      padding: 17px 19px;
      margin-bottom: 10px;
      border: 1px solid var(--line);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.8);
    }

    .task-card-top {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .task-card h3 {
      margin: 0 0 6px;
      font-size: 14px;
    }

    .task-card p {
      margin: 0;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.5;
    }

    .task-actions {
      margin-left: auto;
      display: flex;
      gap: 6px;
    }

    .section-title {
      margin: 24px 0 12px;
      color: var(--muted);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .hidden { display: none !important; }

    .modal-backdrop {
      position: fixed;
      inset: 0;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: rgba(20, 29, 26, 0.42);
      z-index: 8;
    }

    .modal-backdrop.open {
      display: flex;
    }

    .modal {
      width: min(560px, 100%);
      padding: 24px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 0 26px 70px rgba(17, 25, 22, 0.12);
      border: 1px solid var(--line);
    }

    .modal h2 {
      margin: 0 0 8px;
      font-size: 20px;
    }

    .modal p {
      margin: 0;
      color: var(--muted);
      font-size: 13px;
      line-height: 1.5;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 20px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'daymark-app': DaymarkApp;
  }
}