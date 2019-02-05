let tds = document.querySelectorAll("td");
let resetBtn = document.querySelector("#reset");
let table = document.querySelector("table");
let boxDimension = document.querySelector("select");
let scoreOutput = document.querySelector("#score");
let lifeLeftOutput = document.querySelector("#lifeleft");

let gameInfo = {
    randomBombBoxIndex: [],
    randomGoldBoxIndex: [],
    randomDiamondBoxIndex: [],
    bombPicked: 0,
    score: 0,
    numOfBoxes: 8,
};

const generateBoxes = () => {
    table.innerHTML = "";
    for(let i = 0 ; i < gameInfo.numOfBoxes; i++){
        let row = table.insertRow(0);
        for(let k = 0 ; k < gameInfo.numOfBoxes; k++){
            row.insertCell(k);
        }
    }
}

const generateRandomBombBoxIndex = () => {
    for(let i = 0; i < gameInfo.numOfBoxes ; i++){
        let randomNum = -1;
        do{
            randomNum = Math.round(Math.random()*(gameInfo.numOfBoxes*gameInfo.numOfBoxes)-1,2);
        }
        while(gameInfo.randomBombBoxIndex.includes(randomNum) || randomNum < 0);
        gameInfo.randomBombBoxIndex.push(randomNum);
    }
}

const generateRandomGoldBoxIndex = () => {
    for(let i = 0; i < gameInfo.numOfBoxes * 0.80; i++){
        let randomNum 
        do{
            randomNum = Math.round(Math.random()*(gameInfo.numOfBoxes*gameInfo.numOfBoxes)-1,2);
        }
        while(gameInfo.randomBombBoxIndex.includes(randomNum) || gameInfo.randomGoldBoxIndex.includes(randomNum) || randomNum < 0);
        gameInfo.randomGoldBoxIndex.push(randomNum);
    }
}

const generateRandomDiamondBoxIndex = () => {
    for(let i = 0; i < gameInfo.numOfBoxes * 0.20 ; i++){
        let randomNum 
        do{
            randomNum = Math.round(Math.random()*(gameInfo.numOfBoxes*gameInfo.numOfBoxes)-1,2);
        }
        while(gameInfo.randomBombBoxIndex.includes(randomNum) || gameInfo.randomGoldBoxIndex.includes(randomNum) || gameInfo.randomDiamondBoxIndex.includes(randomNum) || randomNum < 0);
        gameInfo.randomDiamondBoxIndex.push(randomNum);
    }
}

const addEventToTds = () => {
    tds.forEach((element, index) => {
    element.addEventListener("click", ()=>{
        if(gameInfo.randomBombBoxIndex.includes(index)){
            element.classList.add("bomb");
            gameInfo.bombPicked++; 
            lifeLeftOutput.value = 3-gameInfo.bombPicked;
        }else if(gameInfo.randomGoldBoxIndex.includes(index)){
            element.classList.add("gold");
            gameInfo.score++;
            scoreOutput.value = gameInfo.score;
        }else if(gameInfo.randomDiamondBoxIndex.includes(index)){
            element.classList.add("diamond");
            gameInfo.score+=3;
            scoreOutput.value = gameInfo.score;
        }else{
            element.classList.add("soil");
        }
        if(gameInfo.bombPicked === 3){
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

const resetTds = () => {
    tds = document.querySelectorAll("td");
    tds.forEach((element, index) => {
        element.className = "";
    });
}

const resetGameInfo = ()=> {
    gameInfo = {
        randomBombBoxIndex: [],
        randomGoldBoxIndex: [],
        randomDiamondBoxIndex: [],
        bombPicked: 0,
        score: 0,
        numOfBoxes: document.querySelector("select").value,
    };
    scoreOutput.value = 0;
    lifeLeftOutput.value = 3;
}

const resetAll = () => {
    resetGameInfo();
    generateBoxes();
    resetTds();
    generateRandomBombBoxIndex();
    generateRandomGoldBoxIndex();
    generateRandomDiamondBoxIndex();
    addEventToTds();
    addEventResetBtn();
}

resetAll();
