
const template = document.createElement("template");
template.innerHTML = `
<style>
</style>
<div class="wrap"></div>
`
window.customElements.define('board-toolbar', class extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$wrap = this._shadowRoot.querySelector('.wrap');
    this._users = []
    this.changeCallback = () => { }
    this.activeUsers = [];
  }

  connectedCallback() {
  }

  set users(data) {
    const uniqData = [...new Set(data.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
    this._users = uniqData;
    this.activeUsers = uniqData;
    this.render()
    this.eventsListeners();
  }

  eventsListeners() {

  }

  onChange(e) {
    changeCallback();
  }

  render() {
    const fragment = document.createDocumentFragment();
    (this._users || []).forEach((user, index) => {
      let userNode = document.createElement('span');
      userNode.innerHTML = user.id;

      fragment.appendChild(userNode);
    });

    this.$wrap.appendChild(fragment);
    // return fragment;
  }
})