const template = document.createElement("template");
template.innerHTML = `
<style>
  :host {
    display: block;
    --low: #f2faff;
    --normal: #ffffdd;
    --high: #fee;
    --critical: #fee;
    --blocker: #fee;
    --blocker-border: #d66d6d; 
  }
  .isue-card-wrapper {
    margin: -5px;
    padding: 5px;
  }
  .isue-card-wrapper.critical, .isue-card-wrapper.blocker{
    box-shadow: 0 0 0 3px var(--blocker-border);
  }
  ::slotted(.fields){
  }
  
</style>
<div class="isue-card-wrapper">
  <slot></slot>
</div>
`
window.customElements.define('issue-card', class extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$ = this._shadowRoot.querySelector;
    this.$wrapp = this._shadowRoot.querySelector('.isue-card-wrapper');
  }

  connectedCallback() {
    const priority = this.data.priority.name.toLowerCase();
    this.$wrapp.setAttribute('style', `background-color: var(--${priority})`)
    this.$wrapp.setAttribute('title', this.data.priority.name)
    this.$wrapp.classList.add(priority);
  }


  set issue(data) {
    this.data = data;
  }
})