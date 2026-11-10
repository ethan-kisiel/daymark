import {css, html} from 'lit';
import {BaseElement} from '../base-component';
import {customElement, property} from 'lit/decorators.js';

@customElement('dm-progress')
export class DmProgress extends BaseElement {
  @property({type: Number}) value = 0;

  static styles = css`
    .progress {
      height: 6px;
      background: #edf1ed;
      border-radius: 999px;
      overflow: hidden;
      margin-top: 10px;
      width: 100%;
    }
    .progress span {
      display: block;
      height: 100%;
      background: var(--green, #3f6559);
      border-radius: inherit;
      transition: width 0.3s ease;
    }
  `;

  render() {
    const clamped = Math.min(100, Math.max(0, this.value));
    return html`
      <div class="progress">
        <span style="width: ${clamped}%"></span>
      </div>
    `;
  }
}
