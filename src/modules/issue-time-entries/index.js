import ModuleRegister from '../ModuleRegister';
import Redmine from '../../services/Redmine';

import './IssueTimeEntries';

export class Register extends ModuleRegister {
  constructor(settings) {
    super(settings);
  }

  async run() {
    const redmineApiKey = this.settings.apiKey;

    if (redmineApiKey) {
      const redmine = new Redmine(redmineApiKey);

      const wrapper = document.querySelector('.attributes .spent-time .value');

      if (
        document.body.classList.contains('controller-issues') &&
        wrapper
      ) {
        const data = await redmine.request('GET', '/time_entries.json', {
          issue_id: `~${window._ISSUE_ID}`,
          limit: '100'
        });

        const TimeEntriesComponent = document.createElement('issue-time-entries');
        TimeEntriesComponent.time_entries = data;

        wrapper.appendChild(TimeEntriesComponent);
      }
    }
  }
}