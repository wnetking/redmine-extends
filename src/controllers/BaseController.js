import { action } from 'mobx';

export default class BaseController {
  constructor(store) {
    this.store = store;
  }

  @action toggleStoreValue(key) {
    const store = this.store;

    if (typeof store[key] !== 'undefined') {
      store[key] = !store[key];
    }
  }

  @action getStore() {
    const store = JSON.stringify(this.store);

    return JSON.parse(store);
  }

  popupApi() {
    return {
      getSettings: async () => this.getStore(),
      toggleStoreValue: async (key, value) => this.toggleStoreValue(key, value)
    };
  }

  pageApi() {
    return {
      getSettings: async () => this.getStore()
    };
  }
}
