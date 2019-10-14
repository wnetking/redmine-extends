import { setupDnode } from './utils/setupDnode';

export class App {
  constructor() {
    this.popupApi = {};
    this.pageApi = {};
  }

  addApi(apiType, api) {
    if (apiType === 'popup') {
      this.popupApi = {
        ...this.popupApi,
        ...api
      };
    } else if (apiType === 'page') {
      this.pageApi = {
        ...this.pageApi,
        ...api
      };
    }
  }

  connectPopup(connectionStream) {
    const api = this.popupApi;
    const dnode = setupDnode(connectionStream, api);

    dnode.once('remote', remote => {
      console.log(remote);
      // Создаем reaction на изменения стейта, который сделает RPC вызов к UI и обновит стейт
      // const updateStateReaction = reaction(
      //   () => this.getState(),
      //   state => remote.updateState(state),
      //   // Третьим аргументом можно передавать параметры. fireImmediatly значит что reaction выполниться первый раз сразу.
      //   // Это необходимо, чтобы получить начальное состояние. Delay позволяет установить debounce
      //   { fireImmediately: true, delay: 500 }
      // );
      // dnode.once('end', () => updateStateReaction.dispose());
    });
  }

  connectPage(connectionStream, origin) {
    const api = {};

    for (const key in this.pageApi) {
      if (this.pageApi.hasOwnProperty(key)) {
        const element = this.pageApi[key];

        api[key] = element.bind(null, origin);
      }
    }

    const dnode = setupDnode(connectionStream, api);

    dnode.on('remote', remote => {
      console.log(remote);
    });
  }
}
