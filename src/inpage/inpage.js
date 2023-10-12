// @ts-check
import PageModifier from './modules/PageModifier';
import AgileBoard from './modules/AgileBoard';
import Redmine from './modules/Redmine';
import './modules/IssueCard';
import './modules/BoardToolbar';
import './modules/setStyles';

const script = document
  .getElementById('inpage_magic_script');
const settingsJSON = script ?
  script.getAttribute('data-settings') : null;

async function setupInpageApi() {
  const settings = JSON.parse(settingsJSON || '{}');
  const modifier = new PageModifier(settings);

  const redmineApiKey = settings.apiKey;

  if (redmineApiKey) {
    const redmine = new Redmine(redmineApiKey);

    if (document.body.classList.contains('controller-agile_boards')) {
      const board = new AgileBoard(redmine)

      board.init()
    }
  }

  modifier.run();
}

document.addEventListener("DOMContentLoaded", () => {
  setupInpageApi().catch(console.error);
});