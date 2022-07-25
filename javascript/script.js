const displayGrid = document.querySelector(`#game-grid`)

const playerFactory = (name, symbol) => {
    return { 
        name,
        symbol
    }
}

const gameController = (() => {

    // function to coordinate the gameplay loop
    const gameplayLoop = () => {
        
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
        swapPlayers
    }
})()

const gameGrid = (() => {
    const gridSpots = [...Array(9).keys()]


    // function to make grid cells responsive
    const activateCells = () => {
        document.querySelectorAll(`.single-cell`).forEach((item) => {
            item.addEventListener(`click`, function () {
                this.innerHTML = currentPlayer.symbol
            })
        })
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
        resetGrid
    }
})()

const playerOne = playerFactory("Pippo", "X")
const playerTwo = playerFactory("Mak", "O")
let currentPlayer = playerOne

gameGrid.generateGrid()
gameGrid.activateCells()