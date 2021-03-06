import { extensionApi } from './utils/extensionApi';
import { PortStream } from './utils/PortStream';
import PostMessageStream from 'post-message-stream';
const hosts = ['redmine.netpeak.net', 'redmine.serpstat.com'];
const isAnable = hosts.includes(document.location.hostname);

if (isAnable) {
  setupConnection();
  injectScript();
}


function sideBarHideInit(){
  let isSideBarHidden = localStorage.getItem('redmine_side_bar_hide') === 'true';
  const hideButton = document.createElement('button');
  hideButton.classList.add('redmine-hide-button', 'icon', 'icon-close');
  const sidebar = document.body.querySelector('#sidebar');
  sidebar.prepend(hideButton);

  if(isSideBarHidden){
    sidebar.classList.add('redmine-side-bar-hide');
  }

  document.body.addEventListener('click', (e) => {
    if(e.target.classList.contains('redmine-hide-button')){
      sidebar.classList.toggle('redmine-side-bar-hide');
      localStorage.setItem('redmine_side_bar_hide', !isSideBarHidden);
      isSideBarHidden = !isSideBarHidden;
    }
  });
}


function setupConnection() {
  const backgroundPort = extensionApi.runtime.connect({
    name: 'contentscript'
  });
  const backgroundStream = new PortStream(backgroundPort);

  const pageStream = new PostMessageStream({
    name: 'content',
    target: 'page'
  });

  pageStream.pipe(backgroundStream).pipe(pageStream);
}

function injectScript() {
  try {
    // inject in-page script
    let script = document.createElement('script');
    script.src = extensionApi.extension.getURL('inpage.js');
    const container = document.head || document.documentElement;
    container.insertBefore(script, container.children[0]);
    script.onload = () => script.remove();
  } catch (e) {
    console.error('Injection failed.', e);
  }
}

sideBarHideInit();