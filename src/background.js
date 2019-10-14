import { reaction, observable, toJS } from 'mobx';
import { extensionApi } from './utils/extensionApi';
import { PortStream } from './utils/PortStream';
import { App } from './App';
import { loadState, saveState } from './utils/localStorage';
import Store from './Store';
import controllers from './controllers';

const DEV_MODE = process.env.NODE_ENV !== 'production';
const IDLE_INTERVAL = 30;

setupApp();

function setupApp() {
  const initState = loadState();
  const app = new App();
  const store = observable.object(new Store(initState));

  controllers.forEach(Controller => {
    const controller = new Controller(store);

    app.addApi('popup', controller.popupApi());
    app.addApi('page', controller.pageApi());
  });

  if (DEV_MODE) {
    global.app = app;
  }

  reaction(() => toJS(store), saveState);

  // update badge
  // reaction(
  //   () =>
  //     app.store.newMessages.length > 0
  //       ? app.store.newMessages.length.toString()
  //       : '',
  //   text => extensionApi.browserAction.setBadgeText({ text }),
  //   { fireImmediately: true }
  // );

  // Lock on idle
  extensionApi.idle.setDetectionInterval(IDLE_INTERVAL);
  // extensionApi.idle.onStateChanged.addListener(state => {
  //   if (['locked', 'idle'].indexOf(state) > -1) {
  //     // app.lock();
  //   }
  // });

  // Connect to other contexts
  extensionApi.runtime.onConnect.addListener(connectRemote);

  function connectRemote(remotePort) {
    const processName = remotePort.name;
    const portStream = new PortStream(remotePort);

    if (processName === 'contentscript') {
      const origin = remotePort.sender.url;
      app.connectPage(portStream, origin);
    } else {
      app.connectPopup(portStream);
    }
  }
}
