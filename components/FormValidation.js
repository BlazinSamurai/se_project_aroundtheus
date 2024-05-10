export default class Form {
  /*
  The first parameter is a settings object that stores selectors and form classes,
  and the second one takes a form element to be validated
  */
  constructor(form, validateForm) {
    this._form = form;
    this._validateForm = validateForm;
  }

  /*
  It has private methods for processing the form, which include: checking the
  field's validity, changing the state of the Submit button, and adding all the needed handlers.
  */
  _handleForm() {}

  //It has a public method enableValidation(), which enables form validation.
  enableValidation() {}

  /*
  It has a public method to either disable the state of the button or reset form
  validation (including the state of the submit button).
  */
}
