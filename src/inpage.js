import PostMessageStream from 'post-message-stream';
import { cbToPromise, setupDnode, transformMethods } from './utils/setupDnode';
import modulesRegister from './modules/modulesRegister';

setupInpageApi().catch(console.error);

async function setupInpageApi() {
  const connectionStream = new PostMessageStream({
    name: 'page',
    target: 'content'
  });

  const dnode = setupDnode(connectionStream, {});

  const pageApi = await new Promise(resolve => {
    dnode.once('remote', remoteApi => {
      resolve(transformMethods(cbToPromise, remoteApi));
    });
  });

  global.App = pageApi;

  const settings = await pageApi.getSettings();

  modulesRegister.forEach(Module => {
    try {
      const module = new Module(settings);
      
      module.run();
    } catch (error) {
      console.error(error);
    }
  });
}
