import ModuleRegister from '../ModuleRegister';

export class Register extends ModuleRegister {
  constructor(settings) {
    super(settings);
  }

  async run() {
    const className = '.dynamicEdit select';

    if (!$(className).hasClass('.select2-hidden-accessible')) {
      $(className).select2();
    }
  }
}