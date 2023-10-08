class AgileBoard {
  constructor(redmine) {
    this.redmine = redmine;
    this.board = document.querySelector('.agile-board');
  }

  getIssuesIds() {
    const issues = [...document.querySelectorAll('.issue-card')]
      .map(node => node.dataset.id)
      .filter(Boolean)
      .map(Number);

    return issues;
  }

  initIssueItems() {
    this.issues.forEach(issue => {
      const issueNode = document.querySelector(`[data-id="${issue.id}"]`);

      this._setCustomIssueCard(issueNode, issue);
    })
  }

  observer() {
    const config = { childList: true, subtree: true };

    const callback = (mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const item = document.querySelector('.issue-card:not(.issue-card-init)');

          if (item) {
            const id = item.dataset.id;
            const issueData = this.issues.find(item => item.id === Number(id));

            this._setCustomIssueCard(item, issueData);
          }
        }
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(this.board, config);
  }

  initToolsBar() {
    const toolbar = document.createElement('board-toolbar');
    toolbar.users = this.usersOnBoard;
    this.board.prepend(toolbar)
  }

  async init() {
    const ids = this.getIssuesIds();
    const data = await this.redmine.issues({
      issue_id: ids.join(','),
      limit: 100,
    });

    this.issues = data.issues;
    this.usersOnBoard = this.issues.map(item => item.assigned_to);
    this.initIssueItems();
    // this.initToolsBar();
    this.observer();
  }


  _setCustomIssueCard(item, data) {
    const customIssueCard = document.createElement('issue-card');
    customIssueCard.issue = data;

    const fields = item.querySelector('.fields');
    item.classList.add('issue-card-init');
    wrap(fields, customIssueCard);
  }
}

function wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

export default AgileBoard;