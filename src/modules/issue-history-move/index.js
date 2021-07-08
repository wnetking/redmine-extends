import ModuleRegister from '../ModuleRegister';

export class Register extends ModuleRegister {
  constructor(settings) {
    super(settings);
  }

  async run() {
    const { anableLayoutMove } = this.settings;

    if (anableLayoutMove) {
      const $body = $('.controller-issues.action-show');
      const $content = $body.find('#content');
      const $history = $body.find('#history').detach();
      const wrapContentNodesElement = '<div class="left-side-content" />';
      const elementRightSide = '<div class="right-side-content"></div>';

      $content.find('> *').wrapAll(wrapContentNodesElement);
      $content.append(elementRightSide);
      $history.appendTo('.right-side-content');
      $content.addClass('content-with-both-side');
    }
  }
}