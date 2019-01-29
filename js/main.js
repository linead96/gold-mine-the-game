let tds = document.querySelectorAll("td");
let resetBtn = document.querySelector("#reset");
let table = document.querySelector("table");
let boxDimension = document.querySelector("select")

let randomBombBoxIndex = [];
let randomGoldBoxIndex = [];
let bombPicked = 0;
let goldPicked = 0;
let numOfBoxes = 3;

const generateBoxes = () => {
    table.innerHTML = "";
    for(let i = 0 ; i < numOfBoxes; i++){
        let row = table.insertRow(0);
        for(let k = 0 ; k < numOfBoxes; k++){
            row.insertCell(k);
        }
    }
}

const generateRandomBombBoxIndex = () => {
    for(let i = 0; i < numOfBoxes ; i++){
        let randomNum = -1;
        do{
            randomNum = Math.round(Math.random()*(numOfBoxes*numOfBoxes)-1,2);
        }
        while(randomBombBoxIndex.includes(randomNum));
        randomBombBoxIndex.push(randomNum);
    }
    randomBombBoxIndex.forEach((item,index) => {
        // console.log(index,item);
    });
}

const generateRandomGoldBoxIndex = () => {
    for(let i = 0; i < numOfBoxes ; i++){
        let randomNum 
        do{
            randomNum = Math.round(Math.random()*(numOfBoxes*numOfBoxes)-1,2);
        }
        while(randomBombBoxIndex.includes(randomNum) || randomGoldBoxIndex.includes(randomNum));
        randomGoldBoxIndex.push(randomNum);
    }
}

const addEventToTds = () => {
    tds.forEach((element, index) => {
    element.addEventListener("click", ()=>{
        if(randomBombBoxIndex.includes(index)){
            element.classList.add("bomb");
            bombPicked++; 
        }else if(randomGoldBoxIndex.includes(index)){
            element.classList.add("gold");
            goldPicked++;
        }else{
            element.classList.add("soil");
        }

        if(bombPicked === 3){
            tds.forEach((element, index) => {
                element.className = "";
                element.classList.add("bomb");
            });
            setTimeout(() => {
                alert("Boom! Game Over!");
            },1);
        }
        if(goldPicked === 3){
            tds.forEach((element, index) => {
                element.className = "";
                element.classList.add("gold");
            });
            setTimeout(() => {
                alert("Wow! You won!");
            },1);
        } 
    })
    });
}

const addEventResetBtn = () => {
    resetBtn.addEventListener("click", () => {     
        resetAll();
    });
}

const changeBoxDimension = () => {
    numOfBoxes = document.querySelector("select").value;
    resetAll();
}

const resetValues = () => {
    tds = document.querySelectorAll("td");
    tds.forEach((element, index) => {
        element.className = "";
    });
    randomBombBoxIndex = [];
    randomGoldBoxIndex = [];
    bombPicked = 0;
    goldPicked = 0;
}

const resetAll = () => {
    generateBoxes();
    resetValues();
    generateRandomBombBoxIndex();
    generateRandomGoldBoxIndex();
    addEventToTds();
}

resetAll();
addEventResetBtn();

// randomBombBoxIndex.forEach(item => {
//     console.log(item);
// })
// randomGoldBoxIndex.forEach(item => {
//     console.log(item);
// })