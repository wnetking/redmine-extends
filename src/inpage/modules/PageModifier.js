import Menu from './Menu';
import LayoutMove from './LayoutMove';
import PhotoHandler from './PhotoHandler';

class PageModifier {
  constructor(settings) {
    this.settings = settings;
  }

  initMenu() {
    const menuSettings = this.settings.menu;

    if (menuSettings) {
      const menu = new Menu({ parent: $('#top-menu > ul') });
      menu.addItems(menuSettings);
    }
  }

  initLayoutMove() {
    const { anableLayoutMove } = this.settings;

    if (anableLayoutMove) {
      LayoutMove.init();
    }
  }

  initPhotoHandler() {
    const { enablePhotoHandler } = this.settings;

    if (enablePhotoHandler) {
      const photoHandler = new PhotoHandler();

      photoHandler.init();
    }
  }

  run() {
    this.initMenu();
    this.initLayoutMove();
    this.initPhotoHandler();
  }
}

export default PageModifier;
