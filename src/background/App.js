import { waiting } from '../utils/waiting';
export class App {
  constructor() {
    /**
     * @type {Record<string, (params: Record<string, any> | undefined) => Promise>}
     */
    this.api = {};
    this.controllersAdded = false;
  }

  addApi(api) {
    this.api = {
      ...this.api,
      ...api,
    }
  }

  /**
   *
   * @return {App} 
   */
  async getApi() {
    if (this.controllersAdded === true) {
      return this;
    }

    await waiting(20);

    return this.getApi();
  }

}
