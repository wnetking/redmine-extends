import ModuleRegister from '../ModuleRegister';
import PhotoHandler from './PhotoHandler';

export class Register extends ModuleRegister {
  constructor(settings) {
    super(settings);
  }

  async run() {
    const { enablePhotoHandler } = this.settings;

    if (enablePhotoHandler) {
      const photoHandler = new PhotoHandler();

      photoHandler.init();
    }

  }
}