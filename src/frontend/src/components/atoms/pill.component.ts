import {css, html} from 'lit';
import {BaseElement} from '../base-component';
import {customElement, property} from 'lit/decorators.js';

@customElement('dm-pill')
export class DmPill extends BaseElement {
  @property({type: String}) variant = ''; // 'green' | 'amber' | 'red' | ''

  static styles = css`
    span {
      display: inline-flex;
      align-items: center;
      padding: 4px 7px;
      border-radius: 6px;
      background: #f1f3ef;
      color: #67746c;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.02em;
    }
    span.green {
      background: var(--green-soft, #ebf3ee);
      color: var(--green, #3f6559);
    }
    span.amber {
      background: var(--amber-soft, #faf0e3);
      color: var(--amber, #a86c3d);
    }
    span.red {
      background: var(--red-soft, #fbeae6);
      color: var(--red, #a45d4d);
    }
  `;

  render() {
    return html`<span class="${this.variant}"><slot></slot></span>`;
  }
}
