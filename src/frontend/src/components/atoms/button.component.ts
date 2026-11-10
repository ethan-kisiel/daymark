import {css, html} from 'lit';
import {BaseElement} from '../base-component';
import {customElement, property} from 'lit/decorators.js';

type ButtonType = 'button' | 'submit' | 'reset' | 'menu';

@customElement('dm-button')
export class DmButton extends BaseElement {
  @property({type: String}) variant = ''; // 'primary' | 'ghost' | ''
  @property({type: String}) size = ''; // 'small' | ''
  @property({type: String}) type = 'button';
  @property({type: Boolean}) disabled = false;

  static styles = css`
    button {
      font: inherit;
      cursor: pointer;
      border: 1px solid var(--line, #e4e8e1);
      background: var(--surface, #fff);
      border-radius: 8px;
      padding: 9px 13px;
      color: var(--ink, #344239);
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background 0.15s ease;
    }
    button:hover:not(:disabled) {
      background: var(--surface-2, #f8f9f6);
    }
    button.primary {
      background: var(--green, #315b45);
      color: white;
      border-color: var(--green, #315b45);
    }
    button.ghost {
      border-color: transparent;
      background: transparent;
    }
    button.small {
      padding: 6px 9px;
      font-size: 12px;
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;

  render() {
    const classes = [this.variant, this.size].filter(Boolean).join(' ');
    return html`
      <button
        class="${classes}"
        type="${this.type as ButtonType}"
        ?disabled="${this.disabled}"
      >
        <slot></slot>
      </button>
    `;
  }
}
