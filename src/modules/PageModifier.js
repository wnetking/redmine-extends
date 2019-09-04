import Menu from './Menu';
import LayoutMove from './LayoutMove';
import UserPhoto from './UserPhoto';
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

  initUserPhoto() {
    const { showUserPhoto } = this.settings;

    if (showUserPhoto) {
      UserPhoto.init('.user');
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
    this.initUserPhoto();
    this.initPhotoHandler();
  }
}

export default PageModifier;
