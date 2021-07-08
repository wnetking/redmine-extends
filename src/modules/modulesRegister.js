
/**
 * @type {import('./ModuleRegister')[]}
 */
export default [
  require('./issue-time-entries').Register,
  require('./agile-board').Register,
  require('./eddit-select').Register,
  require('./header-menu').Register,
  require('./issue-description-table').Register,
  require('./issue-history-move').Register,
  require('./multiselect-enhance').Register,
  require('./photo-in-modal').Register,
  // require('./user-name-photo').Register,
  require('./video-in-modal').Register,
]