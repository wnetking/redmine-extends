import ModuleRegister from '../ModuleRegister';
import Menu from './Menu';

export class Register extends ModuleRegister {
  constructor(settings) {
    super(settings);
  }

  async run() {
    const menuSettings = this.settings.menu;

    if (menuSettings) {
      const menu = new Menu({ parent: $('#top-menu > ul') });
      menu.addItems(menuSettings);
    }

  }
}