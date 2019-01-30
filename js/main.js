let tds = document.querySelectorAll("td");
let resetBtn = document.querySelector("#reset");
let table = document.querySelector("table");
let boxDimension = document.querySelector("select");
let scoreOutput = document.querySelector("#score");
let lifeLeftOutput = document.querySelector("#lifeleft");

let randomBombBoxIndex = [];
let randomGoldBoxIndex = [];
let bombPicked = 0;
let goldPicked = 0;
let numOfBoxes = 8;
let numOfBombAndGold = 0;

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
        while(randomBombBoxIndex.includes(randomNum) || randomNum < 0);
        randomBombBoxIndex.push(randomNum);
    }
    randomBombBoxIndex.forEach((item,index) => {
     console.log("bomb",index,item);
    });
    
}

const generateRandomGoldBoxIndex = () => {
    for(let i = 0; i < numOfBoxes ; i++){
        let randomNum 
        do{
            randomNum = Math.round(Math.random()*(numOfBoxes*numOfBoxes)-1,2);
        }
        while(randomBombBoxIndex.includes(randomNum) || randomGoldBoxIndex.includes(randomNum) || randomNum < 0);
        randomGoldBoxIndex.push(randomNum);
    }
    randomGoldBoxIndex.forEach((item,index) => {
        console.log("gold",index,item);
    });
}

const addEventToTds = () => {
    tds.forEach((element, index) => {
    element.addEventListener("click", ()=>{
        if(randomBombBoxIndex.includes(index)){
            element.classList.add("bomb");
            bombPicked++; 
            lifeLeftOutput.value = 3-bombPicked;
        }else if(randomGoldBoxIndex.includes(index)){
            element.classList.add("gold");
            goldPicked++;
            scoreOutput.value = goldPicked;
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
    scoreOutput.value = goldPicked;
    lifeLeftOutput.value = 3-bombPicked;
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