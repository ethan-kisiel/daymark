import {css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseElement} from '../base-component';

@customElement('dm-task-card')
export class DmTaskCard extends BaseElement {
  @property({type: String}) title = '';
  @property({type: String}) meta = '';
  @property({type: Boolean}) checked = false;
  @property({type: Number}) progress = -1;

  static styles = css`
    .task-card {
      padding: 17px 19px;
      border: 1px solid var(--line, #e4e8e1);
      border-radius: 10px;
      background: white;
      margin-bottom: 10px;
    }
    .task-card-top {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    h3 {
      font-size: 14px;
      margin: 0 0 6px;
      color: var(--ink, #202722);
    }
    p {
      font-size: 12px;
      color: var(--muted, #778078);
      margin: 0;
    }
    .task-actions {
      margin-left: auto;
      display: flex;
      gap: 6px;
    }
  `;

  private _onCheckChange(e: CustomEvent<{checked: boolean}>) {
    this.checked = e.detail.checked;
    this.dispatchEvent(
      new CustomEvent('task-toggle', {
        detail: {checked: this.checked, title: this.title},
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="task-card">
        <div class="task-card-top">
          <dm-task-check
            .checked="${this.checked}"
            @change="${this._onCheckChange}"
          ></dm-task-check>
          <div style="flex:1">
            <h3>${this.title}</h3>
            ${this.meta ? html`<p>${this.meta}</p>` : ''}
            ${this.progress >= 0 ? html`<dm-progress .value="${this.progress}"></dm-progress>` : ''}
            <slot name="meta"></slot>
          </div>
          <div class="task-actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
    `;
  }
}
