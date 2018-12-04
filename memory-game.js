"use strict"

let initialIcons = ['fa-diamond',"fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb",]

let cardsIcons = [...initialIcons,...initialIcons];

let openCards = [];
let matchCards = [];
let leaderBoardNamesList = [];
const deck = document.querySelector('.deck');
const starsContainer = document.querySelector('.score-panel .stars').children;
const starsContainerModal = document.querySelector('.modal-score .stars').children;
const reset = document.getElementsByClassName('restart');
let movesCount = 0;
let wrongMoves = 0;
let time = 0;
let displayTime = document.querySelector('.timer');
let contador;


gameBegin();
resetBtn(reset);



// -------Inicia o jogo, cria as cartas e embaralha-----
function gameBegin() {
    moves();
    timerCounter();
    shuffle(cardsIcons);

    //Cria as cartas
    for(let i = 0; i < cardsIcons.length; i++) {
        const cards = document.createElement('li');
        const icons = document.createElement('i');
        icons.classList.add('fa', cardsIcons[i]);
        cards.classList.add('card');
        cards.appendChild(icons);
        deck.appendChild(cards);
        clickEvent(cards);
    }
}

//-----Compara as duas cartas viradas-----
function clickEvent(cards) {
    cards.addEventListener('click', function () { //quando eu coloco deck como elemento, o evento ainda acontece nos childs, que são as cartas!
        let isDisable = cards.classList.contains('disable');
        const currentCard = this;// o This se refere ao cards no ouvinte
        const previousCard = openCards[0];
        
        //Verifica se há cartas no array
        switch (openCards.length) {
            case 0:
                if (!isDisable) {
                    event.target.classList.add('show','open','disable');
                    openCards.push(this);
                }   
            break;
            case 1:
                if (!isDisable) {
                    cards.classList.add('show','open','disable');
                    openCards.push(this);
                    compareCards(currentCard, previousCard);
                }
            break;
        }
    })
}


function compareCards(currentCard, previousCard) {
    if (currentCard.innerHTML === previousCard.innerHTML) {
                    
        currentCard.classList.add('match');
        previousCard.classList.add('match');
        matchCards.push(currentCard);
        matchCards.push(previousCard);
        openCards = []; //limpa o array de cartas viradas
        movesCount++; //Adiciona mais 1 nos movimentos
        moves();
        gameWon();
    } else {
        currentCard.classList.add("not-match-animation");
        previousCard.classList.add("not-match-animation");
        movesCount++; //Adiciona mais 1 nos movimentos
        wrongMoves++; // Adiciona mais 1 nos movimentos errados
        moves();
        rating();
        setTimeout( function () {
            currentCard.classList.remove('show', 'open','disable', 'not-match-animation');
            previousCard.classList.remove('show', 'open', 'disable', 'not-match-animation');
            openCards = [];
        },800);
    }

}


// ----- Botão de Reset ------
function resetBtn() {
    //Faz um loop nas tags que tem a class .restart para aplicar o mesmo evento em todos
    for(let r = 0; r < reset.length;r++) {
        reset[r].addEventListener('click', function() {

            //Loop em todas as estrelas para remover a classe de cada uma
            //Loop nas estrelas em cima do deck de cartas
            for( let i = 0; i < starsContainer.length;i++) { 
                starsContainer[i].firstElementChild.classList.remove('fa-star-o');
            }

            //Loop nas estrelas do Modal quando finaliza o jogo
            for( let s = 0; s < starsContainerModal.length;s++) { 
                starsContainerModal[s].firstElementChild.classList.remove('fa-star-o');
            }
            openCards = [];
            matchCards = [];
            deck.innerHTML = " ";
            movesCount = 0;
            clearInterval(contador);
            time = 0;
            displayTime.textContent = "0";
            gameBegin();
           
        })
    }

 }


// ----- Moves ------
function moves() {
    const movesDisplay = document.querySelector('.moves');
    movesDisplay.textContent = movesCount;
}

// ----- Classificação ------
function rating() {
    switch(wrongMoves) {
        case 5:
            starsContainer[0].firstElementChild.classList.add('fa-star-o')
            starsContainerModal[0].firstElementChild.classList.add('fa-star-o')
        break;
        case 10:
            starsContainer[1].firstElementChild.classList.add('fa-star-o')
            starsContainerModal[1].firstElementChild.classList.add('fa-star-o')
        break;
    }
}

//-----Verifica se acertou todas as cartas-----
function gameWon () {
    if (matchCards.length === cardsIcons.length) {
        //Para o tempo
        clearInterval(contador);

        //Faz aparecer o modal e o tempo que finalizou
        const modalDisplay = document.querySelector('.modal-box');
        const finalTime = document.querySelector('.final-time');
        finalTime.innerHTML = "Finalizou em: " + time;
        modalDisplay.style.display = 'block';
        

        //botão para fechar e resetar o jogo
        const buttonReset = document.querySelector('.btn-reset')
        buttonReset.addEventListener('click', function () {
            modalDisplay.style.display = 'none';
            resetBtn(reset);
        })
    }
}

//------ Contador de tempo--------
function timerCounter() {
    contador = setInterval(function() {
        time++;
        displayTime.textContent = "tempo de jogo: " + time;
    },1000)
    
    
}

//-------shuffle o Array---------------
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

