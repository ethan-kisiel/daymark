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
      border: 1px solid var(--line, #dfe4dc);
      background: var(--surface, #fffdfb);
      border-radius: 12px;
      padding: 9px 14px;
      color: var(--ink, #1f2b28);
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: transform 0.15s ease, border-color 0.2s ease;
    }
    button:hover:not(:disabled) {
      transform: translateY(-1px);
      border-color: rgba(63, 101, 89, 0.25);
    }
    button.primary {
      background: var(--green, #3f6559);
      color: white;
      border-color: var(--green, #3f6559);
    }
    button.ghost {
      border-color: transparent;
      background: transparent;
      box-shadow: none;
    }
    button.small {
      padding: 6px 10px;
      font-size: 12px;
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
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
