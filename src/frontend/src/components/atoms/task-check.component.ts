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
      border: 1.5px solid #b7c2b8;
      border-radius: 5px;
      background: white;
      cursor: pointer;
      display: inline-grid;
      place-items: center;
      padding: 0;
      font: inherit;
      font-size: 11px;
      color: inherit;
    }
    button.checked {
      background: var(--green, #315b45);
      border-color: var(--green, #315b45);
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
