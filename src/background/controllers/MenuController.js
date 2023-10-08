import BaseController from './BaseController';
import { action, observable } from 'mobx';

class MenuController extends BaseController {
  constructor(store) {
    super(store);
    this.store = store;
  }

  // @ts-check
  @action updateItemMenu(newItem) {
    const newMenu = this.store.menu.map(item => {
      if (newItem.id === item.id) {
        return newItem;
      }

      return item;
    });

    this.store.menu = newMenu;
  }

  @action removeItemMenu(removedItem) {
    const newMenu = this.store.menu.filter(item => {
      if (removedItem.id === item.id) {
        return false;
      }

      return true;
    });

    this.store.menu = newMenu;
  }

  @action addItemMenu(item) {
    const menuItem = observable.object({
      ...item
    });

    this.store.menu.push(menuItem);
  }

  get api() {
    return {
      toggleStoreValue: async (key, value) => this.toggleStoreValue(key, value),
      updateItemMenu: async newItem => this.updateItemMenu(newItem),
      addItemMenu: async item => this.addItemMenu(item),
      removeItemMenu: async newItem => this.removeItemMenu(newItem),
      store: this.store
    };
  }
}

export default MenuController;
