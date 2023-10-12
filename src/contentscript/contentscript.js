import { extensionApi } from '../utils/extensionApi';
import { Request, Response } from '../types';
import { API } from '../services/api';

/**
 * @type {(request: Request) => Promise<Response>}
 */
const sendMessage = async (request) => {
  // @ts-ignore
  const response = await chrome.runtime.sendMessage(request);

  return response;
};

const api = new API(sendMessage);

const hosts = ['redmine.netpeak.net', 'redmine.serpstat.com'];
const isAnable = hosts.includes(document.location.hostname);

if (isAnable) {
  (async () => {
    const {
      result: settings
    } = await api.fetch({ method: 'getSettings' });

    try {
      let script = document.createElement('script');
      script.src = extensionApi.runtime.getURL('inpage.js');
      script.id = 'inpage_magic_script';
      script.setAttribute('data-settings', JSON.stringify(settings));
      const container = document.head || document.documentElement;
      container.insertBefore(script, container.children[0]);
    } catch (e) {
      console.error('Injection failed.', e);
    }
  })();
}