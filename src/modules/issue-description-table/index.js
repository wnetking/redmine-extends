import ModuleRegister from '../ModuleRegister';

export class Register extends ModuleRegister {
  constructor(settings) {
    super(settings);
  }

  async run() {
    const selector = '.controller-issues .issue .description table';
    $(selector).wrap('<div class="magic-table">')
  }
}