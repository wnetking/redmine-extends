/**
 * Issues list
 *
 * @class IssuesListFilter
 */
class IssuesListFilter {
  /**
   *Creates an instance of IssuesListFilter.
   * @param {nodes} issues
   * @memberof IssuesListFilter
   */
  constructor(issuesWrapper, settings = undefined) {
    this.issuesWrapper = issuesWrapper;
    this.filter = [];
    this.settings = settings;
    this.storageFillName = "redmine-extends-storage-name";
    this.filterParams = ["tracker", "fixed_version"];
  }

  /**
   *
   *
   * @param {*} filterItem
   * @returns
   * @memberof IssuesListFilter
   */
  getFilterValues(filterItem) {
    const itemsNode = this.issuesWrapper.find("[id*=issue-] ." + filterItem);
    const items = itemsNode
      .toArray()
      .map(item => item.innerHTML)
      .filter(item => item !== "");
    const uniqItems = Utils.uniq(items);

    return uniqItems.length ? uniqItems : [];
  }

  /**
   *
   *
   * @readonly
   * @static
   * @memberof IssuesListFilter
   */
  static get selectClassName() {
    return "issues-list-filter-select";
  }

  /**
   *
   *
   * @readonly
   * @static
   * @memberof IssuesListFilter
   */
  static get filterClassName() {
    return "issues-list-filter";
  }

  /**
   *
   *
   * @readonly
   * @static
   * @memberof IssuesListFilter
   */
  static get hiddenIssueClassName() {
    return "issues-list-filter-issue-hidden";
  }

  /**
   *
   *
   * @static
   * @memberof IssuesListFilter
   */
  static addModuleStyles() {
    const styles = `
        .${IssuesListFilter.filterClassName}{
            margin-bottom: 10px;
        }
        
        .${IssuesListFilter.hiddenIssueClassName}{
            display: none;
        }
      `;

    $("head").append("<style>" + styles + "</style>");
  }

  /**
   *
   *
   * @static
   * @param {node} $issuesWrap
   * @param {array} params
   * @memberof IssuesListFilter
   */
  static filterIssues($issuesWrap, params) {
    const paramsWithoutShowAll = params.filter(item => item.value !== "Все");
    const $issues = $issuesWrap.find(".issue");

    $issues.removeClass(IssuesListFilter.hiddenIssueClassName);

    const $filterIsuues = $issues.toArray().filter(item => {
      const $issue = $(item);

      const matchParamsArray = paramsWithoutShowAll.map(item => {
        const param = $issue.find("." + item.name).html();
        console.log("param", param, $issue.find("." + item.name));

        return param !== item.value;
      });

      return matchParamsArray.includes(true);
    });

    $filterIsuues.forEach(item =>
      $(item).addClass(IssuesListFilter.hiddenIssueClassName)
    );
  }

  /**
   *
   *
   * @static
   * @memberof IssuesListFilter
   */
  static onChange() {
    $(document).on("change", "." + IssuesListFilter.selectClassName, function(
      e
    ) {
      const $issuesList = $(this)
        .closest("form")
        .find(".list.issues");
      const selects = $(this)
        .closest("." + IssuesListFilter.filterClassName)
        .find("." + IssuesListFilter.selectClassName)
        .toArray()
        .map(item => {
          const name = $(item).attr("name");
          const value = $(item)
            .children("option:selected")
            .val();

          return {
            name,
            value
          };
        });

      IssuesListFilter.filterIssues($issuesList, selects);
    });
  }

  /**
   *
   *
   * @memberof IssuesListFilter
   */
  getfilterStructure() {
    this.filter = this.filterParams.map(item => ({
      items: this.getFilterValues(item),
      name: item
    }));
  }

  /**
   *
   *
   * @readonly
   * @memberof IssuesListFilter
   */
  getSettings() {}

  /**
   *
   *
   * @memberof IssuesListFilter
   */
  saveSettings() {}

  /**
   *
   *
   * @param {*} settings
   * @memberof IssuesListFilter
   */
  setSettings(settings) {}

  getFilterHtml() {
    const html = this.filter
      .map(
        item => `
        <span>
            ${Translate.t(item.name)} : ${Utils.createSelect(
          item.items,
          0,
          item.name,
          IssuesListFilter.selectClassName
        )}
        </span>
      `
      )
      .join("\n");

    return `<div class="issues-list-filter">${html}</div>`;
  }

  /**
   *
   *
   * @memberof IssuesListFilter
   */
  build() {
    this.getfilterStructure();
    this.issuesWrapper.parent().prepend(this.getFilterHtml());
  }
}

$("#list-left .list.issues").each(function() {
  const filter = new IssuesListFilter($(this));
  filter.build();
});

IssuesListFilter.onChange();
IssuesListFilter.addModuleStyles();
