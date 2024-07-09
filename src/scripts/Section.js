// Should add elements to the DOM
export default class Section {
  // The items property should be an array of data, which you must
  // add to the page when it loads.

  // The renderer property should be a function that creates and
  // adds a single item to the page.

  // The third item is a CSS class selector where you'll add the card elements
  //      - Word selector means a string that is used for searching elements in the DOM
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    // I'm searching the DOM using the selector, 'string', in querySelector am I not?
    this._classSelector = document.querySelector(classSelector);
  }

  // renders all elements on the page
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // takes a DOM element and adds it to the container. This method
  // should be called when adding an individual card to the DOM
  addItem(element) {
    this._classSelector.prepend(element);
  }
}
