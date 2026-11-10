import {css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseElement} from '../base-component';

@customElement('dm-modal')
export class DmModal extends BaseElement {
  @property({type: Boolean, reflect: true}) open = false;
  @property({type: String}) title = '';
  @property({type: String}) eyebrow = '';

  static styles = css`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(20, 29, 26, 0.42);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 8;
      padding: 20px;
    }
    .modal-backdrop.open {
      display: flex;
    }
    .modal {
      width: min(560px, 100%);
      background: #ffffff;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 1px 0 rgba(26, 37, 33, 0.04), 0 12px 26px rgba(17, 25, 22, 0.06);
      border: 1px solid var(--line, #dfe4dc);
    }
    .eyebrow {
      color: var(--green, #3f6559);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.13em;
      font-weight: 800;
      margin-bottom: 8px;
    }
    h2 {
      margin: 0 0 7px;
      font-size: 20px;
      color: var(--ink, #1f2b28);
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 20px;
    }
  `;

  render() {
    return html`
      <div class="modal-backdrop ${this.open ? 'open' : ''}">
        <div class="modal">
          ${this.eyebrow ? html`<div class="eyebrow">${this.eyebrow}</div>` : ''}
          ${this.title ? html`<h2>${this.title}</h2>` : ''}
          <slot></slot>
          <div class="modal-actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
    `;
  }
}
