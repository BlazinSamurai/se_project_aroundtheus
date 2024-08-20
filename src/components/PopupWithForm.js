import Popup from "./Popup";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;

    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");

    // fix the initial button text only once in the constructor
    // this._submitBtnText = this._submitBtn.textContent;
  }

  // collects data from all the input fields and returns it as an object.
  // This data should then be passed to the submission handler as an argument
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  // which can insert data into inputs
  // So, this way you’ll not have to search the inputs of the profile in index.js
  setInputValues(data) {
    this._inputList.forEach((input) => {
      // Here you insert the `value` by the `name` of the input
      input.value = data[input.name];
    });
  }

  // add 2 params: isLoading and loadingText with a default text
  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      // here we return back the initial text. So, you don’t need to bother yourself about it
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  // setEventListeners() method of the PopupWithForm class should add a submit
  // event listener to the form and call the setEventListeners() method of the
  // parent class.
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", () => {
      const formValues = this._getInputValues();
      this._handleFormSubmit(formValues);
      // this._popupForm.reset();
    });
  }
}
