const buttons = document.querySelector('.buttons');
const display = document.querySelector('.display');

let buttonsarray = [
    7,
    8,
    9,
    "/",
    4,
    5,
    6,
    "*",
    1,
    2,
    3,
    "+",
    0,
    ".",
    "-",
    "=",
    "C"
];
let values = [];
let cleanvalues

for (let a = 0; a < buttonsarray.length; a++) {
    let button = document.createElement("button");
    button.textContent = buttonsarray[a];
    buttons.appendChild(button);
}

let calcalcbuttons = document.querySelectorAll('.buttons button');
calcalcbuttons.forEach(item => {
    item.addEventListener('click', function (e) {
        calculateArray(e.target.textContent);        
    });
});

let calculateArray = (val) => {
    if (val==="C") {
        values = [];
        display.textContent = "0";
        return;
    }
    if (val != "=") {
        values.push(val);
        cleanvalues = values.join("");// virgülle ayırıyor ayırmadan getirmesi için join'i kullandım
        display.textContent =cleanvalues;
    }else{
        let result = eval(cleanvalues);
        display.textContent = result;
        values = [];
    }
}














// let calcbuttons = document.querySelectorAll('.buttons button');
// calcbuttons.forEach(item => {
//     item.addEventListener('click', function (e) {
//         console.log(e.target.textContent);
        
//     });
// });
