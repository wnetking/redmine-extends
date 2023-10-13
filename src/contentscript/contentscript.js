import { Request, Response } from '../types';
import { API } from '../services/api';

/**
 * @type {(request: Request) => Promise<Response>}
 */
const sendMessage = (request) => new Promise((resolve, reject) => {
  var port = chrome.runtime.connect({ name: "main-port" });
  port.postMessage(request);

  port.onMessage.addListener(
    /**
     * @param {Response} response
     */
    (response) => {
      if (request.id === response.id) {
        if(response.error) {
          reject(response)
        } else {
          resolve(response);
        }
      }
    }
  );
});

const api = new API(sendMessage);

const hosts = ['redmine.netpeak.net', 'redmine.serpstat.com'];
const isAnable = hosts.includes(document.location.hostname);

if (isAnable) {
  (async () => {
    try {
      const {
        result: settings
      } = await api.fetch({ method: 'getSettings' });

      let script = document.createElement('script');
      script.src = chrome.runtime.getURL('inpage.js');
      script.id = 'inpage_magic_script';
      script.setAttribute('data-settings', JSON.stringify(settings));
      const container = document.head || document.documentElement;
      container.insertBefore(script, container.children[0]);
    } catch (e) {
      console.error('Injection failed.', e);
    }
  })();
}