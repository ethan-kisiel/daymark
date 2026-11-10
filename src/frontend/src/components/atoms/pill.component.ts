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
      border-radius: 5px;
      background: #f1f4f0;
      color: #667368;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.02em;
    }
    span.green {
      background: var(--green-2, #eaf1eb);
      color: var(--green, #315b45);
    }
    span.amber {
      background: var(--amber-bg, #fff5e7);
      color: var(--amber, #a86c22);
    }
    span.red {
      background: var(--red-bg, #fbefed);
      color: var(--red, #a54d42);
    }
  `;

  render() {
    return html`<span class="${this.variant}"><slot></slot></span>`;
  }
}
