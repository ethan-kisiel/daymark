import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import * as components from './components/index';

declare global {
  interface Window {
    getVisitorCount: () => Promise<string>;
  }
}

/**
 * Desktop Application Shell Element
 *
 * @slot - Main content slot for dynamic views
 * @csspart sidebar - The application sidebar
 * @csspart main - The main content workspace
 */
@customElement('daymark-app')
export class DaymarkApp extends LitElement {
  @property({type: Number})
  count = 0;

  @property({type: String}) visits = 'Loading...';
  @property({type: String}) activeTab = 'dashboard';

  async connectedCallback() {
    super.connectedCallback();
    // Call the C++ function exposed by webview!
    if (window.getVisitorCount) {
      try {
        const count = await window.getVisitorCount();
        this.visits = count;
      } catch (e) {
        this.visits = 'Error loading';
      }
    }

    window.addEventListener('myCustomEvent', (event: Event) => {
      console.log(event);
      // Increment visitor count example or handle custom event
    });
  }

  render() {
    components.DmButton;
    return html`
      <!-- App Sidebar -->
      <aside part="sidebar">
        <div class="brand">
          <div class="app-icon">⚡</div>
          <span class="app-title">Desktop App</span>
        </div>

        <nav class="nav-menu">
          <a
            class="nav-item ${this.activeTab === 'dashboard' ? 'active' : ''}"
            @click=${() => (this.activeTab = 'dashboard')}
          >
            <svg
              class="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="3" width="7" height="9"></rect>
              <rect x="14" y="3" width="7" height="5"></rect>
              <rect x="14" y="12" width="7" height="9"></rect>
              <rect x="3" y="16" width="7" height="5"></rect>
            </svg>
            Dashboard
          </a>
          <a
            class="nav-item ${this.activeTab === 'analytics' ? 'active' : ''}"
            @click=${() => (this.activeTab = 'analytics')}
          >
            <svg
              class="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            Analytics
          </a>
          <a
            class="nav-item ${this.activeTab === 'settings' ? 'active' : ''}"
            @click=${() => (this.activeTab = 'settings')}
          >
            <svg
              class="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              ></path>
            </svg>
            Settings
          </a>
        </nav>

        <div class="sidebar-footer">
          <div class="status-indicator">
            <span class="dot"></span> C++ Webview Connected
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main part="main">
        <header class="topbar">
          <h1>
            ${this.activeTab.charAt(0).toUpperCase() + this.activeTab.slice(1)}
          </h1>
          <div class="topbar-actions">
            <dm-button
              variant="primary"
              type="button"
              size="small"
              @click=${() => alert('Action triggered!')}
            >
              New Action
            </dm-button>
          </div>
        </header>

        <div class="content-area">
          <slot></slot>

          <div class="grid-cards">
            <div class="card">
              <h3>Database Visits</h3>
              <p class="metric-value">${this.visits}</p>
              <span class="metric-note">Fetched via native webview bridge</span>
            </div>

            <div class="card">
              <h3>Interactive Counter</h3>
              <p class="metric-value">${this.count}</p>
              <button
                type="button"
                class="counter-btn"
                @click=${this._onClick}
                part="button"
              >
                Increment Count
              </button>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  private _onClick() {
    this.count++;
  }

  static styles = css`
    :host {
      --text: #4b5563;
      --text-h: #111827;
      --bg: #f9fafb;
      --sidebar-bg: #ffffff;
      --card-bg: #ffffff;
      --border: #e5e7eb;
      --accent: #6366f1;
      --accent-hover: #4f46e5;
      --accent-bg: rgba(99, 102, 241, 0.1);
      --success: #10b981;
      --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

      --sans:
        system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        sans-serif;
      --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

      font: 14px/150% var(--sans);
      color: var(--text);
      background-color: var(--bg);

      display: flex;
      width: 100vw;
      height: 100vh;
      max-width: 100vw;
      max-height: 100vh;
      box-sizing: border-box;
      overflow: hidden;
      margin: 0;
      padding: 0;
      text-align: left;
    }

    @media (prefers-color-scheme: dark) {
      :host {
        --text: #9ca3af;
        --text-h: #f3f4f6;
        --bg: #111827;
        --sidebar-bg: #1f2937;
        --card-bg: #1f2937;
        --border: #374151;
        --accent: #818cf8;
        --accent-hover: #6366f1;
        --accent-bg: rgba(129, 140, 248, 0.15);
        --success: #34d399;
        --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
      }
    }

    /* Sidebar */
    aside {
      width: 260px;
      background-color: var(--sidebar-bg);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      box-sizing: border-box;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 24px;
      font-size: 16px;
      font-weight: 600;
      color: var(--text-h);
      border-bottom: 1px solid var(--border);
    }

    .app-icon {
      font-size: 20px;
      background: var(--accent-bg);
      padding: 6px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nav-menu {
      padding: 16px 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex-grow: 1;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 6px;
      color: var(--text);
      cursor: pointer;
      text-decoration: none;
      font-weight: 500;
      transition:
        background 0.2s,
        color 0.2s;
    }

    .nav-item:hover {
      background-color: var(--border);
      color: var(--text-h);
    }

    .nav-item.active {
      background-color: var(--accent-bg);
      color: var(--accent);
    }

    .nav-item .icon {
      width: 18px;
      height: 18px;
    }

    .sidebar-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--border);
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: var(--text);
    }

    .dot {
      width: 8px;
      height: 8px;
      background-color: var(--success);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--success);
    }

    /* Main Area */
    main {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      background-color: var(--bg);
      overflow-y: auto;
    }

    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 32px;
      background-color: var(--sidebar-bg);
      border-bottom: 1px solid var(--border);
    }

    .topbar h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      color: var(--text-h);
      letter-spacing: -0.025em;
    }

    .content-area {
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      max-width: 1200px;
      width: 100%;
      box-sizing: border-box;
    }

    .grid-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .card {
      background-color: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 24px;
      box-shadow: var(--shadow);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .card h3 {
      margin: 0;
      font-size: 14px;
      font-weight: 500;
      color: var(--text);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .metric-value {
      font-size: 28px;
      font-weight: 600;
      color: var(--text-h);
      margin: 0;
    }

    .metric-note {
      font-size: 12px;
      color: var(--text);
    }

    .counter-btn {
      font-family: var(--sans);
      font-size: 14px;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 6px;
      color: #ffffff;
      background: var(--accent);
      border: none;
      cursor: pointer;
      transition: background 0.2s;
      align-self: flex-start;
      margin-top: 4px;
    }

    .counter-btn:hover {
      background: var(--accent-hover);
    }

    .counter-btn:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'daymark-app': DaymarkApp;
  }
}
