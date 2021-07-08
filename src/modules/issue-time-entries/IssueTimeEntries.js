function timeFormat(n) {
  const hours = Math.trunc(n);
  const remnant = (n % 1);
  const [_, minutes] = String(remnant.toFixed(2)).split('.');
  const rminutes = Number(minutes || 0) * 60 / 100;

  return `${hours}:${Math.round(rminutes) || '00'}`;
}

/**
 * @typedef {Object} Item
 * @property {string} id 
 * @property {string} name 
 * 
 * @typedef {Object} TimeEntrie
 * @property {string} id 
 * @property {Item} project 
 * @property {Item} user 
 * @property {Item} activity 
 * @property {Item} issue 
 * @property {number} hours 
 * @property {string} comments 
 * @property {string} spent_on 
 * @property {string} created_on 
 * @property {string} updated_on 
 */

const template = document.createElement("template");
template.innerHTML = `
<style>
  :host {
    display: inline-block;
    vertical-align: bottom;
    margin-left: 10px;
  }

  .icon-btn {
    padding: 0;
    border: none;
    display: flex;
    background-color: transparent;
    text-decoration: underline;
    cursor: pointer;
  }

  .icon-btn:hover + .details-wrapper {
    display: block;
  }

  .issue-time-entries-wrapper {
    position: relative;
  }

  .details-wrapper {
    display: none;
    position: absolute;
    top: 50%;
    left: calc(100% + 10px);
    min-width: 150px;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 0 15px #ccc;
    padding: 10px;
    transform: translateY(-50%);
  }

  .open-ditails .details-wrapper {
    display: block;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
<div class="issue-time-entries-wrapper">
  <button id="open-details" class="icon-btn">
    Details
  </button>
  <div class="details-wrapper">
  </div>
</div>
`;

class IssueTimeEntries extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$ = this._shadowRoot.querySelector;
    this.$wrapp = this._shadowRoot.querySelector('.issue-time-entries-wrapper');

    /**
     * @type {object<string, number>} 
     */
    this.usersTimeEntries = null;
    /**
     * @type {number} 
     */
    this.totalTimeEntries = 0;
  }

  /**
   * @param {TimeEntrie} data
   */
  set time_entries(data) {
    /** @type {TimeEntrie} */
    this.data = data;
  }

  connectedCallback() {
    this.totalTimeEntries = this.data.time_entries.reduce((acc, item) => acc + item.hours, 0);
    this.usersTimeEntries = this.data.time_entries.reduce((acc, item) => {
      return {
        ...acc,
        [item.user.name]: (acc[item.user.name] || 0) + item.hours,
      }
    }, {});

    this.render();
  }


  getPercent(timeEntries) {
    const result = (timeEntries * 100) / this.totalTimeEntries;

    return Math.round(result);
  }

  render() {
    this.$wrapp.querySelector('.details-wrapper').innerHTML = `
      <ul>
        ${Object.keys(this.usersTimeEntries).map(userName => `
          <li>
            <b>${userName}</b> - ${timeFormat(this.usersTimeEntries[userName])} h, 
            ${this.getPercent(this.usersTimeEntries[userName])}%
          </li>
        `).join('')}
      </ul>
    `;
  }
};

window.customElements.define('issue-time-entries', IssueTimeEntries);