import { extensionApi } from '../utils/extensionApi';
const hosts = ['redmine.netpeak.net', 'redmine.serpstat.com'];
const isAnable = hosts.includes(document.location.hostname);

if (isAnable) {
  try {
    let script = document.createElement('script');
    script.src = extensionApi.runtime.getURL('inpage.js');
    script.id = 'inpage_magic_script';
    script.setAttribute('data-ext-id', chrome.runtime.id);
    const container = document.head || document.documentElement;
    container.insertBefore(script, container.children[0]);
  } catch (e) {
    console.error('Injection failed.', e);
  }
}
