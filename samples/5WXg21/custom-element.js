import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class CustomElement extends PolymerElement {
  static get properties() {
    return {
      myBoolean: {
        type: Boolean,
        value: false,
        // Specify an observer method by a string matching its name
        observer: 'myBooleanChanged'
      },
      myBooleanMessage: {
        type: String,
        value: ''
      }
    };
  }
  
  // This observer function performs an expensive computation
  // that blocks the thread for 2 seconds 
  // because observers are synchronous
  myBooleanChanged(newValue, oldValue) {
    var start = new Date().getTime();
    // Consider deferring expensive stuff like this
    while (new Date().getTime() < start + 2000) {
      console.log('Doing expensive stuff...');
    }
    this.myBooleanMessage = 'myBoolean changed from ' + oldValue + ' to ' + newValue;
  }
  
  changeMyBoolean() {
    this.myBoolean = !this.myBoolean;
  }
  
  static get template() {
    return html`
      <style>
        .outputmessage {
          color: red;
        }
      </style>
      <p>myBoolean is: [[myBoolean]] <button on-click="changeMyBoolean">Change myBoolean</button></p>
      <div class="outputmessage">[[myBooleanMessage]]<p></div>
    `;
  }
}
customElements.define('custom-element', CustomElement);
