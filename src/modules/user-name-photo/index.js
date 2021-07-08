import ModuleRegister from '../ModuleRegister';
import UserPhoto from './UserPhoto';

export class Register extends ModuleRegister {
  constructor(settings) {
    super(settings);
  }

  async run() {
    const { showUserPhoto } = this.settings;

    if (showUserPhoto) {
      UserPhoto.init('.user');
    }
  }
}