
//selecting element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El=document.getElementById('current--0');
const current1El=document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting coditions
score0El.textContent="0";
score1El.textContent='0';
diceEl.classList.add('hidden');

let scores =[0,0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = ()=>
{
    document.getElementById(`current--${activePlayer}`).textContent= 0;
    activePlayer = activePlayer ===0 ? 1:0;
    currentScore = 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");

}
//Rolling dice functionality
btnRoll.addEventListener('click',function(){
    if(playing)
    {
        //1. Generation a random dice roll
        const dice = Math.trunc(Math.random()*6)+1;  
        //2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src=`dice-${dice}.png`;
        //3. Check for rolled 1 ? 'next player' : 'continue'
        if(dice!==1){
            //add dice to the current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent= currentScore;
        } else {
            //switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click',function(){
    if(playing)
    {
        //1. Add current score to active player score
        scores[activePlayer] +=currentScore;
        document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer]; 
        
        //2.check score  score>=100 ?
        if(scores[activePlayer]>=10)
        {
            //finish
            playing=false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }

});

btnNew.addEventListener('click',function(){
    console.log("çalıştı");
    scores=[0,0];
    playing=true;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    activePlayer=0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    currentScore=0;
    current0El.textContent= "0";
    current1El.textContent= "0";
    score0El.textContent= "0";
    score1El.textContent= "0";
    diceEl.classList.add('hidden');
});

