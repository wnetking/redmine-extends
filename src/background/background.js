// @ts-check
import { reaction, observable, toJS } from 'mobx';
import { extensionApi } from '../utils/extensionApi';
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

  /**
  * 
  * @param {Request} request 
  * @param {*} sender 
  * @see https://developer.chrome.com/docs/extensions/reference/runtime/#type-MessageSender
  * @param {(res: Response) => void} sendResponse 
  */
  function onMessage(request, sender, sendResponse) {
    (async () => {
      try {
        const { method, params } = request;
        const appMethod = app.api[method];

        if (appMethod) {
          const result = await appMethod(params);

          sendResponse({
            result,
          });

        } else {
          sendResponse({
            error: {
              code: 'METHOD_NOT_FOUND',
            },
          });
        }
      } catch (err) {
        sendResponse({
          error: {
            code: 'METHOD_NOT_FOUND',
          },
        });
      }
    })();

    return true;
  }

  extensionApi
    .runtime
    .onMessageExternal
    .addListener(onMessage);

  extensionApi
    .runtime
    .onMessage
    .addListener(onMessage);
})();