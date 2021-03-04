// @ts-check

class VisStore {
  constructor() {
    this.state = {
      list: [],
      appId: ""
    };
  }

  async init() {
    const list = await fetch("./static/data/VisManager/list.json").then(res => res.json());
    list.forEach(ele => {
      if (ele.items !== undefined) {
        ele.items.forEach(item => {
          item.enable = false;
          // this.itemState[item.id] = false;
        });
      }
    });
    this.state.list = list;
  }

  toggleApp = item => {
    this.lastItem && (this.lastItem.enable = false);
    if (this.state.appId === item.id) {
      this.state.appId = undefined;
    } else {
      this.state.appId = item.id;
      item.enable = true;

      this.lastItem = item;
    }
  };
}

export const visStore = new VisStore();
