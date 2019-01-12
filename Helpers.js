/**
 *
 *
 * @class Translate
 */
class Translate {
  /**
   *
   *
   * @static
   * @param {*} key
   * @returns
   * @memberof Translate
   */
  static t(key) {
    return Translate.translates[key] ? Translate.translates[key] : key;
  }

  /**
   *
   *
   * @readonly
   * @static
   * @memberof Translate
   */
  static get translates() {
    return {
      tracker: "Трекер",
      fixed_version: "Версия"
    };
  }
}

/**
 *
 *
 * @class Utils
 */
class Utils {
  /**
   *
   *
   * @static
   * @param {*} data
   * @param {number} [activeIndex=0]
   * @param {string} [name=""]
   * @param {string} [className=""]
   * @param {string} [id=""]
   * @returns
   * @memberof Utils
   */
  static createSelect(
    data,
    activeIndex = 0,
    name = "",
    className = "",
    id = ""
  ) {
    const dataToRender = ["Все", ...data];

    return `
            <select 
                ${id ? `id="${id}"` : ""}
                ${className ? `class="${className}"` : ""}
                ${name ? `name="${name}"` : ""}
            >
                ${dataToRender
                  .map(
                    (item, index) =>
                      `<option ${index === activeIndex &&
                        "selected"} value="${item}">${item}</option>`
                  )
                  .join("\n")}
            </select>
        `;
  }

  /**
   *
   *
   * @static
   * @param {*} array
   * @returns
   * @memberof Utils
   */
  static uniq(array) {
    return [...new Set(array)];
  }
}
