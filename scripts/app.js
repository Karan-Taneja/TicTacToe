//-------STATES

const state = {

    //Game State
    board: [0,1,2,3,4,5,6,7,8],
    winner: null,
    turn: 1,
    moves: 0,

    //Players
    player1: "X",
    player2: "O",

    //Game Modes

    //[AI]
    vsAi: false,
    difficulty: "Normal",
    
    //Human
    localMultiplayer: true,
    onlineMultiplauer: false,

};

state.symbols = {
        huPlayer: state.player1,
        aiPlayer: state.player2,
};

//------DATABASE

const winCons = [[0, 1, 2], [0, 3, 6], [0,4,8],[1, 4, 7],[2, 5, 8], [2, 4, 6],[3, 4, 5],[6, 7, 8]];

//------FUNCTIONS

const checkWin = (board) => {

    let win = false;
    let winnerSymbol = "";

    for(let i = 0; i < winCons.length; i++){

        if(win) break;

        const one = winCons[i][0];
        const two = winCons[i][1];
        const three = winCons[i][2];

        if(board[one] === board[two] && board[two] === board[three]){
            win = true;
            winnerSymbol = board[one];
            state.winner = winnerSymbol;
        };

    };

    if(win){
        winner.innerText = `${winnerSymbol} wins!`;
    };
};

//------QUERY SELECTORS

const board = document.querySelector('.js-board');
const winner = document.querySelector('.js-winner');
const choose = document.querySelector('.js-choose');

//------EVENT LISTENERS

choose.addEventListener('click', (e) => {
    if(e.target.classList.contains('button-X')){
        choose.classList.add('hidden')
        state.player1 = "X";
        state.player2 = "O";
        winner.classList.remove('hidden')
        winner.innerText = `${state.player1}'s Turn`
        board.classList.remove('hidden')
    }
    else if(e.target.classList.contains('button-O')){
        choose.classList.add('hidden')
        state.player1 = "O";
        state.player2 = "X";
        winner.classList.remove('hidden')
        winner.innerText = `${state.player1}'s Turn`
        board.classList.remove('hidden')
    };
});

board.addEventListener('click', (e) => {

    const space = e.target.attributes['data-index'].value * 1;

    if(!state.winner){
        if(typeof state.board[space] === 'number'){

            if(state.turn === 1){
                e.target.innerText = state.player1;
                e.target.classList.add(state.player1);
                state.board[space] = state.player1;
                state.turn = 2;
                state.moves+=1;
                winner.innerText = `${state.player2}'s Turn`;
            }
            else if(state.turn === 2){
                e.target.innerText = state.player2;
                e.target.classList.add(state.player2);
                state.board[space] = state.player2;
                state.turn = 1;
                state.moves+=1;
                winner.innerText = `${state.player1}'s Turn`;
            }

            if(state.moves >= 5 && state.moves <= 9){
                
                checkWin(state.board);

                if(state.moves === 9 && typeof state.winner !=="string"){
                    state.winner = "Draw!";
                    winner.innerText = state.winner;
                };
                
            };

        };
    };
});

board.addEventListener('mouseover', (e) => {
    if (e.target.attributes['data-index'] && e.target.innerText === ""){

        const currentPlayer = `player${state.turn}`;
        const classString = `${state[currentPlayer]}-H`;

        e.target.classList.add(classString);
        e.target.innerText = state[currentPlayer];
    };
});

board.addEventListener('mouseout', (e) => {

    const currentPlayer = `player${state.turn}`;
    const classString = `${state[currentPlayer]}-H`;
    const trigger = e.target.classList.contains(classString);
    const antiTrigger = e.target.classList.contains(state[currentPlayer]);

    if (e.target.attributes['data-index'] && trigger && !antiTrigger){
        e.target.classList.remove(classString);
        e.target.innerText = "";
    };
});