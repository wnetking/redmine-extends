/**
 *
 *
 * @class LayoutMove
 */

class LayoutMove {
  static historyInRightSide() {
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

  static selectWithSearch() {
    const $toggleMultiSelect = $('.toggle-multiselect');
    const $selectAssigned = $toggleMultiSelect.parent().find('select');

    $selectAssigned.select2();

    $toggleMultiSelect.on('click', () => {
      $selectAssigned.select2('destroy');

      setTimeout(function() {
        $selectAssigned.select2();
      }, 0.1);
    });
  }

  static dynamicEditSelect2() {
    const className = '.dynamicEdit select';

    $(className).select2();
  }

  static init() {
    LayoutMove.historyInRightSide();
    LayoutMove.dynamicEditSelect2();

    $(() => {
      LayoutMove.selectWithSearch();
    });

    $('#add_filter_select').on('change', () => {
      console.log('#add_filter_select');
      setTimeout(function() {
        LayoutMove.selectWithSearch();
      }, 0.1);
    });
  }
}

export default LayoutMove;
