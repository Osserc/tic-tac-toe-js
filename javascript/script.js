const displayGrid = document.querySelector(`#game-grid`)

const playerFactory = (name, symbol) => {
    return { 
        name,
        symbol
    }
}

const gameController = (() => {

    const winningLines = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [3, 4, 5], [6, 7, 8]]

    // function to set up the game
    const setUpGame = () => {
        gameGrid.resetGrid()
        gameGrid.generateGrid()
        gameGrid.activateCells()
        activateReplay()
    }

    // function to coordinate the gameplay loop
    const gameplayLoop = () => {
        gameGrid.etchCell(event)
        gameGrid.updateGrid(event)
        if (checkWinner(currentPlayer.symbol)) {
            endgameVictory()
        } else if (checkDraw()) {
            endgameDraw()
        } else {
            swapPlayers()
        }
    }

    // function to swap players after they played
    const swapPlayers = () => {
        if (currentPlayer == playerOne) {
            currentPlayer = playerTwo
        } else {
            currentPlayer = playerOne
        }
    }

    // function to check for win
    const checkWinner = (playerSymbol) => {
        return winningLines.some((item) => {
            return item.every((cell) => {
                return gameGrid.gridSpots[cell] == playerSymbol
            })
        })
    }

    // function to handle a won game
    const endgameVictory = () => {
        callModal()
        writeWinner()
    }

    // function to check for draw
    const checkDraw = () => {
        return !gameGrid.gridSpots.some((item) => {
            return item == null
        })
    }

    // function to handle a drawn game
    const endgameDraw = () => {
        callModal()
        writeDraw()
    }

    // function to call modal
    const callModal = () => {
        endgameModal.classList.add(`show`)
        endgameModal.style.display = `block`
    }

    // function to dismiss modal
    const dismissModal = () => {
        endgameModal.classList.remove(`show`)
        endgameModal.style.display = `none`
    }

    // function to write winner on modal
    const writeWinner = () => {
        endgameModalTitle.innerHTML = `${currentPlayer.name} won the game!`
    }

    // function to write draw on modal
    const writeDraw = () => {
        endgameModalTitle.innerHTML = `It was a draw...`
    }

    // function to activate the play again button
    const activateReplay = () => {
        replayButton.addEventListener(`click`, function() {
            dismissModal()
            setUpGame()
        })
    }

    return {
        setUpGame,
        gameplayLoop,
    }
})()

const gameGrid = (() => {
    const gridSpots = [...Array(9).fill(null)]

    // function to make grid cells responsive
    const activateCells = () => {
        document.querySelectorAll(`.single-cell`).forEach((item) => {
            item.addEventListener(`click`, gameController.gameplayLoop, { once: true })
        })
    }

    // function to etch cells
    const etchCell = (event) => {
        event.target.innerHTML = currentPlayer.symbol
    }

    const updateGrid = (event) => {
        gridSpots[event.target.dataset.index] = currentPlayer.symbol
    }

    // function to generate the initial empty grid
    const generateGrid = () => {
        for (let i = 0; i < gridSpots.length; i++) {
            const singleCell = document.createElement(`div`)
            singleCell.dataset.index = i
            singleCell.classList.add(`bg-info`, `border`, `border-primary`, `border-3`, `m-0`, `d-flex`, `align-items-center`, `justify-content-center`, `single-cell`)
            displayGrid.appendChild(singleCell)
        }
    }

    // function to clear the grid
    const resetGrid = () => {
        displayGrid.replaceChildren()
        gridSpots.fill(null)
    }

    return {
        gridSpots,
        generateGrid,
        activateCells,
        etchCell,
        updateGrid,
        resetGrid
    }
})()

const playerOne = playerFactory(`Pippo`, `X`)
const playerTwo = playerFactory(`Mak`, `O`)
let currentPlayer = playerOne
const endgameModal = document.querySelector('#endgame-modal')
const endgameModalTitle = document.querySelector('#endgame-modal-title')
const replayButton = document.querySelector(`#replay-button`)

gameController.setUpGame()