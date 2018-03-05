const nameInput = document.getElementById('name');
const emailInput = document.getElementById('mail');

const title = document.getElementById('title');
const otherOption = document.getElementById('other-title');

const shirtDesign = document.getElementById('design');
const shirtColor = document.getElementById('color');

const activities = document.getElementsByClassName('activities')[0];
const activitieCheckBox = activities.children;

const payment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const payPal = creditCard.nextSibling.nextSibling;
const bitCoin = payPal.nextSibling.nextSibling;
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');

const form = document.getElementsByTagName('form')[0];


function shirtInfo(firstDesign, condition, i, display){
  // console.log(i);
    shirtColor.value = firstDesign;
    shirtColor.parentNode.style.display = display;
    if(condition){
      shirtColor.options[i].style.display = '';
    } else {
      shirtColor.options[i].style.display = 'none';
    }
}

function checkedAndUnchecked(selectionName, checkboxNumber, disabled, textColor){
  // console.log(disabled);
  if(selectionName === 'js-frameworks'){
    activitieCheckBox[checkboxNumber[0]].firstElementChild.disabled = disabled;
    activitieCheckBox[checkboxNumber[0]].style.color = textColor;
  } else if (selectionName === 'js-libs'){
    activitieCheckBox[checkboxNumber[1]].firstElementChild.disabled = disabled;
    activitieCheckBox[checkboxNumber[1]].style.color = textColor;
  } else if (selectionName === 'express'){
    activitieCheckBox[checkboxNumber[2]].firstElementChild.disabled = disabled;
    activitieCheckBox[checkboxNumber[2]].style.color = textColor;
  } else if (selectionName === 'node'){
    activitieCheckBox[checkboxNumber[3]].firstElementChild.disabled = disabled;
    activitieCheckBox[checkboxNumber[3]].style.color = textColor;
  }
}

function paymentInfo(display){
  creditCard.style.display = display[0];
  payPal.style.display = display[1];
  bitCoin.style.display = display[2];
}

function errorColor(input, textColor, borderColor, error){
  let errorMsg = input.previousSibling.previousSibling.innerHTML;
  input.previousSibling.previousSibling.style.color = textColor;
  input.style.border = borderColor;
  // console.log(errorMsg.indexOf(error) === -1);
  if(textColor === 'red'){
    if(errorMsg.indexOf(error) === -1){
      let i = '<span>' + error + '</span>';
      input.previousSibling.previousSibling.insertAdjacentHTML('beforeend', i);
      if(input.previousSibling.previousSibling.children.length > 1){
        input.previousSibling.previousSibling.firstElementChild.remove();
      }
    }
  }else{
    if(errorMsg.indexOf('(') > -1){
      input.previousSibling.previousSibling.lastElementChild.remove();
    }
  }
}

// function errorMessage(input){
//   let cardNumberErr = '<span> Please enter a credit card number</span>'
//   let cardNumbDigits = '<span> Please enter a number that is between 13 and 16 digits</span>';
//   if(input.value.length === 0){
//     // input.previousSibling.previousSibling.lastElementChild.remove();
//     input.previousSibling.previousSibling.insertAdjacentHTML('beforeend', cardNumberErr);
//   }
//   // else if(cardNumber.value.length < 13 || cardNumber.value.length > 16 || cardNumber.value.length === 14 || cardNumber.value.length === 15){
//   //   input.previousSibling.previousSibling.lastElementChild.remove();
//   //   input.previousSibling.previousSibling.insertAdjacentHTML('beforeend', cardNumbDigits);
//   // }
// }

window.addEventListener("load", function(){
  nameInput.focus(); // After the page loads the name input is focused

/*-------------------Other Choise------------------*/
  otherOption.style.display = 'none';
title.addEventListener("change", function(){
  if(title.value === 'other'){
    otherOption.style.display = '';
  } else {
    otherOption.style.display = 'none';
  }
});

/*-------------------Shirt Choise------------------*/
for(let i = 0; i < shirtColor.children.length; i++){
  shirtInfo('choosedesign', i < 1, i, 'none');
  // shirtColor.parentNode.style.display = 'none';
}

shirtDesign.addEventListener('change', function(e){
  for(let i = 0; i < shirtColor.children.length; i++){
    if(this.value === 'js puns'){
      shirtInfo('cornflowerblue', i >= 1 && i <= 3, i, '');
    }
     else if(this.value === 'heart js'){
       shirtInfo('tomato', i > 3, i, '');
    }
    else {
      shirtInfo('choosedesign', i < 1, i, 'none');
      // shirtColor.parentNode.style.display = 'none';
    }
  }
  });

/*-------------------Registration For Activities------------------*/
activities.addEventListener('change', function(e){
  let total = 0;

for(var i = 1; i < activitieCheckBox.length - 1; i++){
    if(e.target.checked){
      if(activitieCheckBox[i].firstElementChild.checked){
        total += parseInt(activitieCheckBox[i].firstElementChild.value);
      }
      checkedAndUnchecked(e.target.name, [4,5,2,3], true, '#596D75');
    } else {
      if(activitieCheckBox[i].firstElementChild.checked){
        total += parseInt(activitieCheckBox[i].firstElementChild.value);
      }
      checkedAndUnchecked(e.target.name, [4,5,2,3], false, '#000');
  }
}

  activitieCheckBox[8].innerHTML = 'Total: ' + total;
});

/*-------------------Payment Info Selection------------------*/
payment.value = 'credit card';
paymentInfo(['', 'none', 'none']);

payment.addEventListener('change', function(e){
  // console.log(this.value);
  if(this.value === 'credit card'){
    paymentInfo(['', 'none', 'none']);
  } else if(this.value === 'paypal') {
    paymentInfo(['none', '', 'none']);
  } else if(this.value === 'bitcoin') {
    paymentInfo(['none', 'none', '']);
  } else {
    paymentInfo(['none', 'none', 'none']);
  }
});


/*-------------------Form Validation------------------*/
form.addEventListener('submit', function(e){
  const emailValid = /[\w.]+@\w+\.(net|com|edu|ca)/;
  const numbsOnly = /[^0-9]+/;
  let isChecked = false;

  e.preventDefault();
    if(nameInput.value === ''){
      errorColor(nameInput, '#d60505', '2px solid #d60505', ' (Provide Your Name)');
    } else {
      errorColor(nameInput, '#000', '2px solid #c1deeb', '');
    }

    if(!emailValid.test(emailInput.value.toLowerCase())){
      errorColor(emailInput, '#d60505', '2px solid #d60505', ' (Provide Your Email)');
    } else {
      errorColor(emailInput, '#000', '2px solid #c1deeb', '');
    }

    if(shirtDesign.value === 'Select Theme'){
      errorColor(shirtDesign.parentNode.previousSibling.previousSibling, '#d60505', '', ' (Pick a Shirt)');
      // shirtDesign.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.style.color = 'red';
    } else {
      errorColor(shirtDesign.parentNode.previousSibling.previousSibling, '#000', '', '');
    }

    for (var i = 1; i < activitieCheckBox.length - 1; i++) {
      if(activitieCheckBox[i].firstElementChild.checked){
        isChecked = true;
      }
      if(!isChecked){
        errorColor(activitieCheckBox[0].nextSibling.nextSibling, '#d60505', '', ' (Select an Activity)');
        break;
      } else {
        errorColor(activitieCheckBox[0].nextSibling.nextSibling, '#000', '', '');
      }
    }

    if(payment.value === 'credit card'){
      // if(){
        if(cardNumber.value.length === 0 || numbsOnly.test(cardNumber.value.toLowerCase())){
          errorColor(cardNumber, '#d60505', '2px solid #d60505', ' (Please enter a credit card number)');
        } else if(cardNumber.value.length < 13 || cardNumber.value.length > 16 || cardNumber.value.length === 14 || cardNumber.value.length === 15 || numbsOnly.test(cardNumber.value.toLowerCase())){
          errorColor(cardNumber, '#d60505', '2px solid #d60505', ' (Please enter a number that is between 13 and 16 digits long)');
        } else {
        errorColor(cardNumber, '#000', '2px solid #c1deeb', '');
      }
      if(zipCode.value.length > 5 || zipCode.value.length < 5 || zipCode.value.length === 0 || numbsOnly.test(zipCode.value.toLowerCase())){
        errorColor(zipCode, '#d60505', '2px solid #d60505', ' (Zip Code has to be 5 digits)');
      } else {
        errorColor(zipCode, '#000', '2px solid #c1deeb', '');
      }
      if(cvv.value.length > 3 || cvv.value.length < 3 || cvv.value.length === 0 || numbsOnly.test(zipCode.value.toLowerCase())){
        errorColor(cvv, '#d60505', '2px solid #d60505', ' (CVV has to be 3 digits)');
      } else {
        errorColor(cvv, '#000', '2px solid #c1deeb', '');
      }
    }
});

});
