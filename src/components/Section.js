export class Section {
  constructor({ containerSelector, renderer}) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  setItem(element) {
    this._container.prepend(element);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems(items) {
    this._clear();
    items.forEach(item => {
      this._renderer(item);
    });
  }
}
