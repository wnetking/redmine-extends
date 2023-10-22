export const extensionApi = typeof global.chrome !== 'undefined'
    ? global.chrome
    : global.browser