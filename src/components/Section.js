// Should add elements to the DOM
export default class Section {
  // The items property should be an array of data, which you must
  // add to the page when it loads.

  // The renderer property should be a function that creates and
  // adds a single item to the page.

  // The third item is a CSS class selector where you'll add the card elements
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._classSelector = classSelector;

    this.container = document.querySelector(this._classSelector);
  }

  // renders all elements on the page
  renderItems(cards) {
    cards.forEach((card) => {
      const newCard = this._renderer(card);
      this.addItem(newCard);
    });
  }

  // takes a DOM element and adds it to the container. This method
  // should be called when adding an individual card to the DOM
  addItem(element) {
    this.container.prepend(element);
  }
}
