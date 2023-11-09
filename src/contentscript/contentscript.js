import { Request, Response } from '../types';
import { API } from '../services/api';

const port = chrome.runtime.connect({ name: "main-port" });

/**
 * @type {(request: Request) => Promise<Response>}
 */
const sendMessage = (request) => new Promise((resolve, reject) => {

  port.onMessage.addListener(
    /**
     * @param {Response} response
     */
    (response) => {
      if (request.id === response.id) {
        if (response.error) {
          reject(response)
        } else {
          resolve(response);
        }
      }
    }
  );

  port.onDisconnect.addListener(function (event) {
    console.log('onDisconnect', event);
  });

  port.postMessage(request);
});

const api = new API(sendMessage);
const isAnable = document.location.hostname.includes('redmine');

if (isAnable) {
  (async () => {
    try {
      console.log('Injection Begin');
      const {
        result: settings
      } = await api.fetch({ method: 'getSettings' });

      let script = document.createElement('script');
      script.src = chrome.runtime.getURL('inpage.js');
      script.id = 'inpage_magic_script';
      script.setAttribute('data-settings', JSON.stringify(settings));
      const container = document.head || document.documentElement;
      container.insertBefore(script, container.children[0]);

      console.log('Injection okey');
    } catch (e) {
      console.error('Injection failed.', e);
    }
  })();
}