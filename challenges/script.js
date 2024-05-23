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

// _toggleButtonState() {
//   if (this._hasInvalidInput()) {
//     this._disableButton();
//     return;
//   }
//   this._enableButton();
// }

/*---------------------------------------------------*/
/*             other handleClickImage                */
/*---------------------------------------------------*/

// function handleImageClick(cardData) {
//   cardTitleEl.textContent = cardData.name;
//   cardAltTitleEl.alt = cardData.name;
//   cardImageEl.src = cardData.link;
//   cardImageEl.addEventListener("click", () => {
//     previewTitleEl.textContent = cardData.name;
//     previewAltTitleEl.alt = cardData.name;
//     previewImageEl.src = cardData.link;
//     openModal(previewModal);
//   });
// }

// cardsData.forEach((cardData) => {
//   cardTitleEl.textContent = cardData.name;
//   cardAltTitleEl.alt = cardData.name;
//   cardImageEl.src = cardData.link;
//   cardImageEl.addEventListener("click", () => {
//     previewTitleEl.textContent = cardData.name;
//     previewAltTitleEl.alt = cardData.name;
//     previewImageEl.src = cardData.link;
//     openModal(previewModal);
//   });
// });
