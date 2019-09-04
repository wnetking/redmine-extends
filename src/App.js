import { action, observable, reaction } from 'mobx';
import { setupDnode } from './utils/setupDnode';

export class App {
  constructor(initState = {}) {
    this.store = observable.object({
      settings: {
        anableLayoutMove: true,
        showUserPhoto: true,
        enablePhotoHandler: true,
        menu: [
          {
            url: '/projects/serpstat/agile/board',
            content: 'Agile Доска'
          },
          {
            url: 'https://git.netpeak.net/serpstat-front/documentation',
            content: 'Документация',
            target: '_blank'
          },
          {
            url:
              'http://dev01.layouts.serpstat.com/react-styleguide/index.html',
            content: 'Демо компонентов',
            target: '_blank'
          },
          {
            url:
              'https://docs.google.com/spreadsheets/d/1Vu81IlC7bgq_RJ1-_HLHcATCKm1uFdmtCXVtRG1RRLc/edit#gid=1102764381',
            content: 'Переговорки',
            target: '_blank'
          },
          {
            url:
              'https://app.goabstract.com/organizations/51671e5a-693f-479c-a000-19c1c5d8f8fc/projects',
            content: 'Дизайн',
            target: '_blank'
          }
        ]
      }
    });
  }

  /**
   * @public
   */

  getState() {
    return this.store;
  }

  popupApi() {
    return {
      addKey: async key => this.addKey(key),
      removeKey: async index => this.removeKey(index),

      lock: async () => this.lock(),
      unlock: async password => this.unlock(password),

      initVault: async password => this.initVault(password),
      deleteVault: async () => this.deleteVault(),

      approve: async (id, keyIndex) => this.approve(id, keyIndex),
      reject: async id => this.reject(id)
    };
  }

  pageApi(origin) {
    return {
      getSettings: async () => {
        const store = this.getState();
        return store.settings;
      }
    };
  }

  connectPopup(connectionStream) {
    const api = this.popupApi();
    const dnode = setupDnode(connectionStream, api);

    dnode.once('remote', remote => {
      // Создаем reaction на изменения стейта, который сделает RPC вызов к UI и обновит стейт
      const updateStateReaction = reaction(
        () => this.getState(),
        state => remote.updateState(state),
        // Третьим аргументом можно передавать параметры. fireImmediatly значит что reaction выполниться первый раз сразу.
        // Это необходимо, чтобы получить начальное состояние. Delay позволяет установить debounce
        { fireImmediately: true, delay: 500 }
      );
      dnode.once('end', () => updateStateReaction.dispose());
    });
  }

  connectPage(connectionStream, origin) {
    const api = this.pageApi(origin);
    const dnode = setupDnode(connectionStream, api);

    dnode.on('remote', remote => {
      console.log(origin);
      console.log(remote);
    });
  }
}
