import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import sdk from '@stackblitz/sdk';

class StackblitzTest extends PolymerElement {
  static get properties() {
    return {
      sampleId: {
        type: String,
        value: '5WXg21'
      },
      project: {
        type: Object,
        value: function() { return {
          files: {
            'index.js': 'console.log("hello");',
            'index.html': '<h1>hello</h1>'
          },
          title: 'test',
          description: 'A test',
          template: 'javascript'
        };}
      },
      options: {
        type: Object,
        value: function() {return {
          clickToLoad: true,
          height: '640px'
        };}
      }
    };
  }
  static get template() {
    return html`      
      <h1>stackblitz test</h1>
      <div id="stackblitz"></div>
    `;
  }
  ready(){
    super.ready();
    
    var xhr = new XMLHttpRequest;
    xhr.responseType='json';
    xhr.onload = function(event) {
      var project = event.target.response;
      project.template='javascript';
      var filesToLoad = project.files.length;
      for (var i=0; i< project.files.length; i++){
        console.log(project.files[i]);
      }
      
      project.files=this.project.files;
      sdk.embedProject(this.$.stackblitz, project, this.options);

    }.bind(this);
    xhr.open('GET', './samples/5WXg21/manifest.json');
    xhr.send();
  }
  
}

customElements.define('stackblitz-test', StackblitzTest);
