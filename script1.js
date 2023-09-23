const sliderInput = document.querySelector("[input-slider]");
const lengthCount = document.querySelector("[length-Display]");
const copyMsg = document.querySelector("[data-copyMsg]");
const displayMsg = document.querySelector("[input-text]")
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const copyBtn = document.querySelector("[data-copy]");
const symbolsCheck = document.querySelector("#symbols");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const strengthLight = document.querySelector(".indicator");
const generateBtn = document.querySelector(".btn");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
const resetButton = document.querySelector(".reset");


let password = "";
let lengthDisplay = 10;
let countCheckBox = 0;

function handleSlider() {
    sliderInput.value = lengthDisplay;
    lengthCount.innerText = lengthDisplay;
}

handleSlider();

function strengthColor(color) {
    strengthLight.style.backgroundColor = color;
    strengthLight.style.boxShadow = `0px 0px 12px 1px ${color}`
}

function getRandomThings(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomlowercase() {
    return String.fromCharCode(getRandomThings(97, 123));
}

function getRandomUppercase() {
    return String.fromCharCode(getRandomThings(65, 91));
}

function getRandomInteger() {
    return getRandomThings(0, 9);
}
function getRandomSymbols() {
    return symbols.charAt(getRandomThings(0, symbols.length));
}


allCheckBox.forEach((checkbox)=> 
    checkbox.addEventListener('change' , (checkbox)=>{
      let countCheckBox = 0;
        if(checkbox.checked){
            countCheckBox++;
        }

        if(checkbox <= countCheckBox){
            lengthDisplay = countCheckBox;
            handleSlider();
        }
    })
)

function strengthCalc() {
    let hasLower = false;
    let hasUpper = false;
    let hasNum = false;
    let hasSym = false;
    if (lowercaseCheck.checked) {
        hasLower = true;
    }
    if (uppercaseCheck.checked) {
        hasUpper = true;
    }
    if (numbersCheck.checked) {
        hasNum = true;
    }
    if (symbolsCheck.checked) {
        hasSym = true;
    }

    if ((hasLower && hasUpper) && (hasSym || hasNum) && lengthDisplay >= 8) {
         strengthColor("#0f0");
    }

    else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        lengthDisplay >= 6) {
        strengthColor("#ff0");
    }

    else {
        strengthColor("#f00");
    }
}

 async function copyClipboardMsg(){
    try{
        await navigator.clipboard.writeText(displayMsg.innerText);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "failed";
        throw(e);
    }

    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 3000);
}


function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

sliderInput.addEventListener('input' , (e) =>{
    lengthDisplay = e.target.value;
    handleSlider();
} );

copyBtn.addEventListener('click' , ()=>{
    if(displayMsg.value){
        copyClipboardMsg();
    }
});

resetButton.addEventListener('click' , ()=>{
    displayMsg.value = "";
    strengthColor("#ffffff");
});


generateBtn.addEventListener('click' , ()=>{
    // if(countCheckBox == 0)
    // return;

    if(lengthDisplay < countCheckBox){
        lengthDisplay = countCheckBox;
        handleSlider();
    }

    password = "";
    let arrFunc = [];

    if(uppercaseCheck.checked){
        arrFunc.push(getRandomUppercase);
    }

    if(lowercaseCheck.checked){
        arrFunc.push(getRandomlowercase);
    }

    if(numbersCheck.checked){
        arrFunc.push(getRandomInteger);
    }

    if(symbolsCheck.checked){
        arrFunc.push(getRandomSymbols);
    }

    for(let i = 0; i< arrFunc.length; i++){
        password += arrFunc[i]();
    }

    // REMAINING PASSWORD
    for(let i = 0; i< lengthDisplay - arrFunc.length; i++){
        let randomIndex =  getRandomThings(0, arrFunc.length);
        password += arrFunc[randomIndex](); 
    }

    password = shufflePassword(Array.from(password));

    displayMsg.value = password;
    strengthCalc();
    
});