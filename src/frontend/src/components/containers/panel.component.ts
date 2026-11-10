import {css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseElement} from '../base-component';

@customElement('dm-panel')
export class DmPanel extends BaseElement {
  @property({type: String}) title = '';
  @property({type: String}) subtitle = '';

  static styles = css`
    .panel {
      background: var(--surface, #fff);
      border: 1px solid var(--line, #e4e8e1);
      border-radius: var(--radius, 12px);
      box-shadow: var(--shadow, 0 8px 24px rgba(29, 43, 33, 0.055));
    }
    .panel-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 20px;
      border-bottom: 1px solid var(--line, #e4e8e1);
    }
    .panel-title {
      font-size: 14px;
      font-weight: 700;
    }
    .panel-sub {
      font-size: 12px;
      color: var(--muted, #778078);
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
