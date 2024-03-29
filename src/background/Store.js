import { observable } from 'mobx';

class Store {
  constructor({
    menu = [],
    anableLayoutMove,
    showUserPhoto,
    enablePhotoHandler,
    apiKey
  } = {}) {
    this.anableLayoutMove = observable.box(anableLayoutMove || true);
    this.showUserPhoto = observable.box(showUserPhoto || true);
    this.enablePhotoHandler = observable.box(enablePhotoHandler || true);
    this.menu = observable([...menu]);
    this.apiKey = observable.box(apiKey || '')
  }
}

export default Store;
