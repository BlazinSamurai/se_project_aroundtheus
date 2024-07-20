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
  renderItems() {
    this._items.forEach((item) => {
      const name = item.name;
      const altName = item.name;
      const link = item.link;
      const newCard = this._renderer({ name, altName, link });
      this.addItem(newCard);
    });
  }

  // takes a DOM element and adds it to the container. This method
  // should be called when adding an individual card to the DOM
  addItem(element) {
    // console.log("section's this: ", this);
    // console.log("section's card BEFOR prepend: ", element);
    this.container.prepend(element);
  }
}
