/**
 *
 *
 * @class LayoutMove
 */

class LayoutMove {
  constructor() {

  }

  historyInRightSide() {
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

  selectWithSearch() {
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

  dynamicEditSelect2() {
    const className = '.dynamicEdit select';

    if (!$(className).hasClass('.select2-hidden-accessible')) {
      $(className).select2();
    }
  }

  _descriptionTableOverflow() {
    const selector = '.controller-issues .issue .description table';
    $(selector).wrap('<div class="magic-table">')
  }

  scrollToAncor() {
    const { hash } = window.location;

    if (hash) {
      const element = document.querySelector(hash);
      
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  }

  init() {
    this.historyInRightSide();
    this.dynamicEditSelect2();
    this._descriptionTableOverflow();
    setTimeout(() => {
      this.scrollToAncor();
    }, 300)

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

const layoutMove = new LayoutMove();
export default layoutMove;
