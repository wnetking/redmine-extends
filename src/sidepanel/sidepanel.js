import { initApp } from '../options/ui';
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
              
initApp(api).catch(console.error);
