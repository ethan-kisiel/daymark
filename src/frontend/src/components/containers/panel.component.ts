import {css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseElement} from '../base-component';

@customElement('dm-panel')
export class DmPanel extends BaseElement {
  @property({type: String}) title = '';
  @property({type: String}) subtitle = '';

  static styles = css`
    .panel {
      background: var(--surface, #fffdfb);
      border: 1px solid var(--line, #dfe4dc);
      border-radius: var(--radius, 16px);
      box-shadow: var(--shadow, 0 1px 0 rgba(26, 37, 33, 0.04), 0 6px 18px rgba(18, 28, 25, 0.04));
      overflow: hidden;
    }
    .panel-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 18px 20px;
      border-bottom: 1px solid var(--line, #dfe4dc);
      background: rgba(255, 255, 255, 0.3);
    }
    .panel-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--ink, #1f2b28);
    }
    .panel-sub {
      font-size: 12px;
      color: var(--muted, #64746d);
      margin-top: 4px;
    }
    .panel-body {
      padding: 18px 20px;
    }
  `;

  render() {
    return html`
      <div class="panel">
        ${
          this.title
            ? html`
                <div class="panel-head">
                  <div>
                    <div class="panel-title">${this.title}</div>
                    ${this.subtitle ? html`<div class="panel-sub">${this.subtitle}</div>` : ''}
                  </div>
                  <slot name="header-action"></slot>
                </div>
              `
            : ''
        }
        <div class="panel-body">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
