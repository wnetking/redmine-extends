
// /**
//  *
//  *
//  * @class Translate
//  */
// class Translate {
//     /**
//      *
//      *
//      * @static
//      * @param {*} key
//      * @returns
//      * @memberof Translate
//      */
//     static t(key) {
//       return Translate.translates[key] ? Translate.translates[key] : key;
//     }
  
//     /**
//      *
//      *
//      * @readonly
//      * @static
//      * @memberof Translate
//      */
//     static get translates() {
//       return {
//         tracker: "Трекер",
//         fixed_version: "Версия",
//         filter: "Фильтр"
//       };
//     }
//   }
  
//   /**
//    *
//    *
//    * @class Utils
//    */
//   class Utils {
//     /**
//      *
//      *
//      * @static
//      * @param {*} data
//      * @param {number} [activeIndex=0]
//      * @param {string} [name=""]
//      * @param {string} [className=""]
//      * @param {string} [id=""]
//      * @returns
//      * @memberof Utils
//      */
//     static createSelect(
//       data,
//       activeIndex = 0,
//       name = "",
//       className = "",
//       id = ""
//     ) {
//       const dataToRender = ["Все", ...data];
  
//       return `
//                 <select 
//                     ${id ? `id="${id}"` : ""}
//                     ${className ? `class="${className}"` : ""}
//                     ${name ? `name="${name}"` : ""}
//                     multiple
//                 >
//                     ${dataToRender
//                       .map(
//                         (item, index) =>
//                           `<option ${index === activeIndex &&
//                             "selected"} value="${item}">${item}</option>`
//                       )
//                       .join("\n")}
//                 </select>
//             `;
//     }
  
//     /**
//      *
//      *
//      * @static
//      * @param {*} array
//      * @returns
//      * @memberof Utils
//      */
//     static uniq(array) {
//       return [...new Set(array)];
//     }
//   }
//   /**
//    * Issues list
//    *
//    * @class IssuesListFilter
//    */
//   class IssuesListFilter {
//     /**
//      *Creates an instance of IssuesListFilter.
//      * @param {nodes} issues
//      * @memberof IssuesListFilter
//      */
//     constructor(issuesWrapper, settings = undefined) {
//       this.issuesWrapper = issuesWrapper;
//       this.filter = [];
//       this.settings = settings;
//       this.storageFillName = "redmine-extends-storage-name";
//       this.filterParams = ["tracker", "fixed_version"];
//     }
  
//     /**
//      *
//      *
//      * @param {*} filterItem
//      * @returns
//      * @memberof IssuesListFilter
//      */
//     getFilterValues(filterItem) {
//       const itemsNode = this.issuesWrapper.find("[id*=issue-] ." + filterItem);
//       const items = itemsNode
//         .toArray()
//         .map(item => item.innerHTML)
//         .filter(item => item !== "");
//       const uniqItems = Utils.uniq(items);
  
//       return uniqItems.length ? uniqItems : [];
//     }
  
//     /**
//      *
//      *
//      * @readonly
//      * @static
//      * @memberof IssuesListFilter
//      */
//     static get selectClassName() {
//       return "issues-list-filter-select";
//     }
  
//     /**
//      *
//      *
//      * @readonly
//      * @static
//      * @memberof IssuesListFilter
//      */
//     static get filterClassName() {
//       return "issues-list-filter";
//     }
  
//     /**
//      *
//      *
//      * @readonly
//      * @static
//      * @memberof IssuesListFilter
//      */
//     static get hiddenIssueClassName() {
//       return "issues-list-filter-issue-hidden";
//     }
  
//     /**
//      *
//      *
//      * @readonly
//      * @static
//      * @memberof IssuesListFilter
//      */
//     static get filterCollapseContentClassName() {
//       return "issues-list-filter-collapse-content";
//     }
  
//     /**
//      *
//      *
//      * @readonly
//      * @static
//      * @memberof IssuesListFilter
//      */
//     static get activeFilterCollapseActiveClassName() {
//       return "issues-list-filter-collapse-active";
//     }
  
//     /**
//      *
//      *
//      * @readonly
//      * @static
//      * @memberof IssuesListFilter
//      */
//     static get filterCollapseHeaderClassName() {
//       return "issues-list-filter-collapse-header";
//     }
  
//     /**
//      *
//      *
//      * @static
//      * @memberof IssuesListFilter
//      */
//     static addModuleStyles() {
//       const styles = `
//             .${IssuesListFilter.filterClassName}{
//                 margin-bottom: 10px;
//             }
            
//             .${IssuesListFilter.selectClassName}{
//                 height: auto;
//             }
            
//             .${IssuesListFilter.hiddenIssueClassName}{
//                 display: none;
//             }
            
//             .${IssuesListFilter.filterCollapseHeaderClassName}{
//               cursor: pointer;
//             }
            
//             .${IssuesListFilter.filterCollapseHeaderClassName}::after{
//               content: '+';
//               display: inline-block;
//               margin-left: 10px;
//             }
//             .${IssuesListFilter.filterCollapseHeaderClassName}.${
//         IssuesListFilter.activeFilterCollapseActiveClassName
//       }::after{
//               content: '-';
//             }
            
//             .${IssuesListFilter.filterCollapseHeaderClassName}:not(.${
//         IssuesListFilter.activeFilterCollapseActiveClassName
//       }) + .${IssuesListFilter.filterCollapseContentClassName}{
//               display: none;
//             }
//           `;
  
//       $("head").append("<style>" + styles + "</style>");
//     }
  
//     /**
//      *
//      *
//      * @static
//      * @param {node} $issuesWrap
//      * @param {array} params
//      * @memberof IssuesListFilter
//      */
//     static filterIssues($issuesWrap, params) {
//       const paramsWithoutShowAll = params.filter(item => item.value[0] !== "Все");
//       const $issues = $issuesWrap.find(".issue");
  
//       $issues.removeClass(IssuesListFilter.hiddenIssueClassName);
  
//       const $filterIsuues = $issues.toArray().filter(item => {
//         const $issue = $(item);
  
//         const matchParamsArray = paramsWithoutShowAll.map(item => {
//           const param = $issue.find("." + item.name).html();
  
//           return !item.value.includes(param);
//         });
  
//         return matchParamsArray.includes(true);
//       });
  
//       $filterIsuues.forEach(item =>
//         $(item).addClass(IssuesListFilter.hiddenIssueClassName)
//       );
//     }
  
//     static fiterCollapseHandler() {
//       $(document).on(
//         "click",
//         "." + IssuesListFilter.filterCollapseHeaderClassName,
//         function(e) {
//           $(this).toggleClass(
//             IssuesListFilter.activeFilterCollapseActiveClassName
//           );
//         }
//       );
//     }
  
//     static createSelect2() {
//       $("." + IssuesListFilter.selectClassName).select2();
//     }
  
//     /**
//      *
//      *
//      * @static
//      * @memberof IssuesListFilter
//      */
//     static onChange() {
//       $(document).on("change", "." + IssuesListFilter.selectClassName, function(
//         e
//       ) {
//         const $issuesList = $(this)
//           .closest("form")
//           .find(".list.issues");
  
//         const selects = $(this)
//           .closest("." + IssuesListFilter.filterClassName)
//           .find("." + IssuesListFilter.selectClassName)
//           .toArray()
//           .map(item => {
//             const name = $(item).attr("name");
//             const values = [...item.options]
//               .filter(option => option.selected)
//               .map(option => option.value);
  
//             return {
//               name,
//               value: values
//             };
//           });
  
//         IssuesListFilter.filterIssues($issuesList, selects);
//       });
//     }
  
//     /**
//      *
//      *
//      * @memberof IssuesListFilter
//      */
//     getfilterStructure() {
//       this.filter = this.filterParams.map(item => ({
//         items: this.getFilterValues(item),
//         name: item
//       }));
//     }
  
//     /**
//      *
//      *
//      * @readonly
//      * @memberof IssuesListFilter
//      */
//     getSettings() {}
  
//     /**
//      *
//      *
//      * @memberof IssuesListFilter
//      */
//     saveSettings() {}
  
//     /**
//      *
//      *
//      * @param {*} settings
//      * @memberof IssuesListFilter
//      */
//     setSettings(settings) {}
  
//     renderFilterCollapse(collapseContent) {
//       return `
//           <div class="${
//             IssuesListFilter.filterCollapseHeaderClassName
//           }">${Translate.t("filter")}</div>
//           <div class="${
//             IssuesListFilter.filterCollapseContentClassName
//           }">${collapseContent}</div>
//         `;
//     }
  
//     getFilterHtml() {
//       const html = this.filter
//         .map(
//           item => `
//             <span>
//                 ${Translate.t(item.name)} : ${Utils.createSelect(
//             item.items,
//             0,
//             item.name,
//             IssuesListFilter.selectClassName
//           )}
//             </span>
//           `
//         )
//         .join("\n");
  
//       return `<div class="issues-list-filter">${this.renderFilterCollapse(
//         html
//       )}</div>`;
//     }
  
//     /**
//      *
//      *
//      * @memberof IssuesListFilter
//      */
//     build() {
//       this.getfilterStructure();
//       this.issuesWrapper.parent().prepend(this.getFilterHtml());
//     }
//   }
  
//   $("#list-left .list.issues").each(function() {
//     const filter = new IssuesListFilter($(this));
//     filter.build();
//   });
  
//   IssuesListFilter.createSelect2();
//   IssuesListFilter.onChange();
//   IssuesListFilter.fiterCollapseHandler();
//   IssuesListFilter.addModuleStyles();
  
  