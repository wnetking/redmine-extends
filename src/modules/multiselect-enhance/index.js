import ModuleRegister from '../ModuleRegister';

export class Register extends ModuleRegister {
  constructor(settings) {
    super(settings);
  }

  selectWithSearch = () => {
    const $toggleMultiSelect = $('.toggle-multiselect');
    const $selectAssigned = $toggleMultiSelect.parent().find('select');

    if (!$selectAssigned.hasClass('.select2-hidden-accessible')) {
      setTimeout(() => {
        $selectAssigned.select2();

        $toggleMultiSelect.on('click', () => {
          $selectAssigned.select2('destroy');

          setTimeout(() => {
            $selectAssigned.select2();
          }, 0.1);
        });
      }, 50)
    }
  }

  async run() {
    const { anableLayoutMove } = this.settings;

    if (anableLayoutMove) {
      $(() => {
        this.selectWithSearch();
      });

      $('#add_filter_select').on('change', () => {
        setTimeout(() => {
          this.selectWithSearch();
        }, 0.1);

      });
    }
  }
}