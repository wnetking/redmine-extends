import { observable } from 'mobx';

const defaultLinks = [
  {
    url: '/projects/serpstat/agile/board',
    content: 'Agile Доска',
    id: 1
  },
  {
    url: 'https://git.netpeak.net/serpstat-front/documentation',
    content: 'Документация',
    target: '_blank',
    id: 2
  },
  {
    url: 'http://dev01.layouts.serpstat.com/react-styleguide/index.html',
    content: 'Демо компонентов',
    target: '_blank',
    id: 3
  },
  {
    url:
      'https://docs.google.com/spreadsheets/d/1Vu81IlC7bgq_RJ1-_HLHcATCKm1uFdmtCXVtRG1RRLc/edit#gid=1102764381',
    content: 'Переговорки',
    target: '_blank',
    id: 4
  },
  {
    url:
      'https://app.goabstract.com/organizations/51671e5a-693f-479c-a000-19c1c5d8f8fc/projects',
    content: 'Дизайн',
    target: '_blank',
    id: 5
  }
];

class Store {
  constructor({
    menu = [],
    anableLayoutMove,
    showUserPhoto,
    enablePhotoHandler
  } = {}) {
    this.anableLayoutMove = observable.box(anableLayoutMove || true);
    this.showUserPhoto = observable.box(showUserPhoto || true);
    this.enablePhotoHandler = observable.box(enablePhotoHandler || true);
    this.menu = observable([...defaultLinks, ...menu]);
  }
}

export default Store;
