export class App {
  constructor() {
    this.api = {};
  }

  addApi(api) {
    this.api = {
      ...this.api,
      ...api,
    }
  }
}
