import { initApp } from '../options/ui';
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
              
initApp(api).catch(console.error);
