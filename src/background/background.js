// @ts-check
import { reaction, observable, toJS } from 'mobx';
import { App } from './App';
import { loadState, saveState } from '../utils/localStorage';
import Store from './Store';
import controllers from './controllers';
import { Request, Response } from '../types';

const DEV_MODE = process.env.NODE_ENV !== 'production';

(async () => {
  const initState = await loadState();
  const app = new App();
  const store = observable.object(new Store(initState));

  controllers.forEach(Controller => {
    const controller = new Controller(store);

    app.addApi(controller.api);
  });

  if (DEV_MODE) {
    global.app = app;
  }

  reaction(() => toJS(store), saveState);

  chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener(
      /**
      * @param {Request} request 
      */
      (request) => {
        (async () => {
          const { method, params, id } = request;

          try {
            const appMethod = app.api[method];

            if (appMethod) {
              /**
               * @type {Response} 
               */
              const result = await appMethod(params);

              port.postMessage({
                id,
                result,
              });
            } else {
              port.postMessage({
                id,
                error: {
                  code: 'METHOD_NOT_FOUND',
                },
              });
            }
          } catch (err) {
            port.postMessage(
              /**
               * @type {Response} 
               */
              {
                id,
                error: {
                  code: 'METHOD_NOT_FOUND',
                },
              }
            );
          }
        })();
      });
  });
})();

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openSidebarMagic',
    title: 'Open Sidebar Magic',
    contexts: ['all']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openSidebarMagic') {
    // This will open the panel in all the pages on the current window.
    // @ts-ignore
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});