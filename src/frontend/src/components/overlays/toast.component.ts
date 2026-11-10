import {css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseElement} from '../base-component';

@customElement('dm-toast')
export class DmToast extends BaseElement {
  @property({type: String}) message = '';
  @property({type: Boolean}) show = false;
  private _timer?: number;

  static styles = css`
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #253d2e;
      color: white;
      padding: 12px 16px;
      border-radius: 9px;
      box-shadow: 0 8px 24px rgba(29, 43, 33, 0.055);
      opacity: 0;
      transform: translateY(8px);
      transition: 0.2s;
      pointer-events: none;
      z-index: 10;
    }
    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  trigger(msg: string, duration = 2400) {
    this.message = msg;
    this.show = true;
    clearTimeout(this._timer);
    this._timer = window.setTimeout(() => {
      this.show = false;
    }, duration);
  }

  render() {
    return html`
      <div class="toast ${this.show ? 'show' : ''}">${this.message}</div>
    `;
  }
}
