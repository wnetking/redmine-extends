// @ts-check
import PageModifier from './modules/PageModifier';
import AgileBoard from './modules/AgileBoard';
import Redmine from './modules/Redmine';
import './modules/IssueCard';
import './modules/BoardToolbar';
import './modules/setStyles';
import { Request, Response } from '../types';
import { API } from '../services/api'

const script = document
  .getElementById('inpage_magic_script');
const extId = script ?
  script.getAttribute('data-ext-id') : null;

/**
 * @type {(request: Request) => Promise<Response>}
 */
const sendMessage = (request) => new Promise((resolve, reject) => {
  // @ts-ignore
  chrome.runtime.sendMessage(extId, request, (response) => {
    resolve(response);
  });
});

const api = new API(sendMessage);

async function setupInpageApi() {
  const {
    result: settings
  } = await api.fetch({ method: 'getSettings' });

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

setupInpageApi().catch(console.error);