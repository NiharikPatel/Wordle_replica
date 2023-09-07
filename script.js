
const buttonElements = document.querySelectorAll('button');
let row = 1;
let letter =1;
const wordElements = document.querySelectorAll('.word-row');
let wordForTheDay;
let gameover = false;
let guessedCorrectly = true;
let score = 0;
let highestScore = parseInt(localStorage.getItem('highestScore')) || 0;


function resetwordle(){
    const reset =document.querySelectorAll(".word");
    reset.forEach(function(element){
        element.innerText='';
        element.classList.remove('word-gray','word-green','word-yellow');
        row = 1;
        letter = 1;
        document.getElementById("message").innerHTML = '';
    });    
    gameover=false;
    highestScore = parseInt(localStorage.getItem('highestScore')) || 0;
    document.getElementById("highest-score").innerHTML = highestScore;
}

async function guessword(){
try{
    const response = await fetch("5LetterWord.txt");
    const data = await response.text();
    const wordArray = data.split('\n');
    wordForTheDay = wordArray[Math.floor(Math.random()*wordArray.length)];
    console.log(wordForTheDay);
}catch(error){
    console.error(error);
}
}

buttonElements.forEach((element)=>{
element.addEventListener('click',function(){ 
    const dataKey = element.attributes["data-key"];
    if(dataKey){
        keypress(dataKey.value);
    }
});
});

function populateWord(key){
    if(letter<6){
   wordElements[row-1].querySelectorAll('.word')[letter-1].innerText = key;
    letter +=1;
}
}
function checkWord(){
let numOfCorrectAlpha = 0;
   const letterElements = wordElements[row-1].querySelectorAll('.word')
    letterElements.forEach((element, index)=>{
        const indexOfLetterInWordOfTheDay = wordForTheDay.toLowerCase().indexOf(element.innerText.toLowerCase());
            
        if(indexOfLetterInWordOfTheDay === index){
            element.classList.add('word-green');
            numOfCorrectAlpha +=1;
        }
        else if(indexOfLetterInWordOfTheDay ===-1){
            element.classList.add('word-gray');
        }
        else{
            element.classList.add('word-yellow');
        }
    });
    if (numOfCorrectAlpha === 5){
        gameover = true;
        guessedCorrectly = true;
        document.getElementById("message").innerHTML = `You got it in ${row} no of try!!! `;
        // resetwordle();
       // alert("Congratulations! you have gussed the word correctly")
    } else if(numOfCorrectAlpha<5 && row ===6)
    {   
        gameover= true;
        document.getElementById("message").innerHTML = `Better luck next time!!!The word was ${wordForTheDay}.`;
        // resetwordle();
        
        //alert(`Better luck next time.The word was ${wordForTheDay}`);
    }
}

function enterWord(){
    if(letter < 6){
        alert('Not enough letters');
    }
    else{
        checkWord();
        row+=1;
        letter=1;
    }
}

function deleteLetter(){
    const letterElements = wordElements[row-1].querySelectorAll('.word');
   for (let index = letterElements.length-1; index >=0 ; index--) {
    const element = letterElements[index];
    if(element.innerText !== '')
    {
        element.innerText='';
        letter-=1;
        break;
    }
}
}

function keypress(key) {
    if(key.trim().length === 0)
    {

    }
    else if(key.toLowerCase()==='enter'){
        enterWord();
    }
    else if (key.toLowerCase()=== 'del'){
        deleteLetter();
    }
    else{
        populateWord(key);
    }
}
function scorecalculator()
    {
        if(gameover===true){
            if(guessedCorrectly===true){
                if( row === 0){
                    score += 30;
                }
                else if(row==1){
                    score +=25;
                }
                else if(row==2){
                    score += 20;
                }
                else if(row==3){
                    score += 15;
                }else if(row==4){
                    score +=10;
                }
                else if(row==5){
                    score += 5;
                }
            }
            else{
            score += 0;
            }
        }
        console.log(score);
        document.getElementsByClassName("scoreno")[0].innerHTML = score;
    }

function updateHighScore(score){
    if(score>highestScore){
        highestScore = score;
        localStorage.setItem('highestScore',highestScore);
        document.getElementById("highest-score").innerHTML = highestScore;
        console.log(highestScore)
    }
}
updateHighScore(score);




async function playwordle(){
    if(!gameover){
        await guessword();
        keypress('');
        
    }
    if(gameover===true){
    
        scorecalculator();
        
        resetwordle();
        await guessword();
        keypress('');
    }
    }
    





