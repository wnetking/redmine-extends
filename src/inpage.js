import PostMessageStream from 'post-message-stream';
import { cbToPromise, setupDnode, transformMethods } from './utils/setupDnode';
import PageModifier from './modules/PageModifier';
import AgileBoard from './modules/AgileBoard';
import Redmine from './modules/Redmine';
import './modules/IssueCard';
import './modules/BoardToolbar';
import './modules/setStyles';

setupInpageApi().catch(console.error);



async function setupInpageApi() {
  const connectionStream = new PostMessageStream({
    name: 'page',
    target: 'content'
  });

  const api = {};
  const dnode = setupDnode(connectionStream, api);

  const pageApi = await new Promise(resolve => {
    dnode.once('remote', remoteApi => {
      resolve(transformMethods(cbToPromise, remoteApi));
    });
  });

  global.App = pageApi;

  const settings = await pageApi.getSettings();

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
