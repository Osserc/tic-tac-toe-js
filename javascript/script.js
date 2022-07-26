const displayGrid = document.querySelector(`#game-grid`)

const playerFactory = (name, symbol) => {
    return { 
        name,
        symbol
    }
}

const gameController = (() => {

    // function to set up the game
    const setUpGame = () => {
        gameGrid.generateGrid()
        gameGrid.activateCells()
    }

    // function to coordinate the gameplay loop
    const gameplayLoop = () => {
        console.log("Hi!")
        gameGrid.etchCell(event)
        gameGrid.updateGrid(event)
        swapPlayers()
    }

    // function to swap players after they played
    const swapPlayers = () => {
        if (currentPlayer == playerOne) {
            currentPlayer = playerTwo
        } else {
            currentPlayer = playerOne
        }
    }

    return {
        setUpGame,
        gameplayLoop,
        swapPlayers
    }
})()

const gameGrid = (() => {
    const gridSpots = [...Array(9).keys()]


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
    }

    return {
        generateGrid,
        activateCells,
        etchCell,
        updateGrid,
        resetGrid
    }
})()

const playerOne = playerFactory("Pippo", "X")
const playerTwo = playerFactory("Mak", "O")
let currentPlayer = playerOne

gameController.setUpGame()