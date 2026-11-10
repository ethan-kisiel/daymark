import {css, html} from 'lit';
import {BaseElement} from '../base-component';
import {customElement, property} from 'lit/decorators.js';

@customElement('dm-task-check')
export class DmTaskCheck extends BaseElement {
  @property({type: Boolean, reflect: true}) checked = false;

  static styles = css`
    button {
      width: 17px;
      height: 17px;
      border: 1.5px solid #c0c9c1;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      display: inline-grid;
      place-items: center;
      padding: 0;
      font: inherit;
      font-size: 11px;
      color: white;
      transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
    }
    button:hover {
      transform: translateY(-1px);
    }
    button.checked {
      background: var(--green, #3f6559);
      border-color: var(--green, #3f6559);
      color: white;
    }
  `;

  private _toggle() {
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {checked: this.checked},
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <button
        class="${this.checked ? 'checked' : ''}"
        @click="${this._toggle}"
        aria-label="Toggle task item"
      >
        ${this.checked ? '✓' : ' '}
      </button>
    `;
  }
}
