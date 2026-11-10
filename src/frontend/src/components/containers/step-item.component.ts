import {css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseElement} from '../base-component';

@customElement('dm-step-item')
export class DmStepItem extends BaseElement {
  @property({type: String}) text = '';
  @property({type: String}) subtext = '';
  @property({type: Boolean}) checked = false;
  @property({type: Boolean}) critical = false;

  static styles = css`
    .step {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 0;
      border-bottom: 1px solid #eff1ed;
    }
    .step:last-child {
      border-bottom: 0;
    }
    .step-text {
      flex: 1;
      line-height: 1.45;
      color: var(--ink, #202722);
    }
    .step-text.done {
      text-decoration: line-through;
      color: #9aa39b;
    }
    small {
      display: block;
      color: #879188;
      font-size: 11px;
      margin-top: 4px;
    }
    .critical {
      background: #fffaf2;
      border: 1px solid #f1dfc3;
      border-radius: 8px;
      padding: 12px;
      margin: 10px 0;
    }
    .critical-head {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #97601d;
      font-weight: 700;
      font-size: 12px;
      margin-bottom: 6px;
    }
  `;

  private _handleCheck(e: CustomEvent<{checked: boolean}>) {
    if (this.critical && !this.checked) {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent('critical-check-request', {
          bubbles: true,
          composed: true,
        }),
      );
      return;
    }
    this.checked = e.detail.checked;
    this.dispatchEvent(
      new CustomEvent('step-change', {
        detail: {checked: this.checked},
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const content = html`
      <div class="step">
        <dm-task-check
          .checked="${this.checked}"
          @change="${this._handleCheck}"
        ></dm-task-check>
        <div class="step-text ${this.checked ? 'done' : ''}">
          ${this.text}
          ${this.subtext ? html`<small>${this.critical ? 'Critical · ' : ''}${this.subtext}</small>` : ''}
        </div>
        <slot name="status"></slot>
      </div>
    `;

    return this.critical && !this.checked
      ? html`
          <div class="critical">
            <div class="critical-head">⚠ Critical pause point</div>
            ${content}
          </div>
        `
      : content;
  }
}
