/* This page is here to work out errors or problems in your javascript
 *  code.
 */

console.log("Hello World!");

//already know: which input, input is invalid, and the selectors are nodes
// console.log(`inputEl: ${inputEl}`); [object HTMLInputElement]
// console.log(`inputEl.id: ${inputEl.id}`); edit-modal-something
// console.log(this._inputSelector); NodeList
// console.log(this._inputErrorClass); NodeList
// console.log(this._formSelector); NodeList of each Modal
// console.log(this._errorClassEl); span class of error class
// this._inputSelector.forEach((inputClass) => {
//   if (inputClass.id === inputEl.id) {
//     this._inputClassEl = inputClass;
//     console.log(inputEl);
//     console.log(this._inputClassEl);
//   }
// });
// this._inputErrorClass.forEach((errorClass) => {
//   if (errorClass.id === `${inputEl.id}-error`) {
//     this._errorClassEl = document.querySelector(`#${errorClass.id}`);
//   }
// });
//
// _hasInvalidInput() {
//   this._inputEl = [...document.querySelectorAll(".modal__input")];
//   return !this._inputEl.every((input) => input.validity.valid);
//   this._validity = this._inputEl.every((input) => {
//     if (input.validity.valid) {
//       this._enableButton();
//     } else {
//       this._disableButton();
//     }
//   });
// }
//
// _toggleButtonState() {
//   if (this._hasInvalidInput()) {
//     this._disableButton();
//     return;
//   }
//   this._enableButton();
// }
//
// _hasValidInput(inputEl) {
//   console.log(inputEl.id);
//   if (inputEl.id === "add-modal-title") {
//     console.log("disable button");
//   }
//   if (inputEl.validity.valid) {
//     return true;
//   } else {
//     return false;
//   }
// }
//
// _toggleButtonState(inputEl) {
//   if (this._hasValidInput(inputEl)) {
//     this._enableButton();
//     return;
//   }
//   this._disableButton();
// }
/*---------------------------------------------------*/
/*        somewhat working handleClickImage          */
/*---------------------------------------------------*/
// this particular function needs a double click to start working
// then when it does work it doesn't allow a preview of the
// last picture
//
// const cardImgEl = cardListEl.querySelectorAll(".card__image");
// cardImgEl.forEach((imgEl) => {
//   imgEl.addEventListener("click", (evt) => {
//     cardsData.forEach((data) => {
//       if (evt.target.src === data.link) {
//         previewTitleEl.textContent = data.name;
//         previewAltTitleEl.altName = data.name;
//         previewImageEl.src = data.link;
//         openModal(previewModal);
//       }
//     });
//   });
// });
//
// Works but will preview and image if you click anywhere on the tile
// plus is access the card's "private" data in constructor
//
// previewTitleEl.textContent = evt._data.name;
// previewAltTitleEl.textContent = evt._data.altName;
// previewImageEl.src = evt._data.link;
// openModal(previewModal);
