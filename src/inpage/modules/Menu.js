/**
 *
 *
 * @class Menu
 */
class Menu {
  constructor({ parent }) {
    this.parent = parent;
  }

  getLinkTmp(href, content, className, target) {
    return `<li><a ${
      target ? 'target="${target}"' : ''
    } class="${className}" href="${href}">${content}</a></li>`;
  }

  addItem({ url = '/', content = 'Home', className = '', target = '' }) {
    const $menu = this.parent;
    $menu.append(this.getLinkTmp(url, content, className));
  }

  addItems(items) {
    items.forEach(item => {
      this.addItem(item);
    });
  }
}

export default Menu;
