const displayGrid = document.querySelector(`#game-grid`)

const playerFactory = (name, symbol) => {
    return { 
        name,
        symbol
    }
}

const gameController = (() => {
    const playerOne = playerFactory("Pippo", "X")
    const playerTwo = playerFactory("Mak", "O")
    let currentPlayer = playerOne

    // function to swap players after they played
    const swapPlayers = () => {
        if (currentPlayer == playerOne) {
            currentPlayer = playerTwo
        } else {
            currentPlayer = playerOne
        }
    }

    return {
        playerOne,
        playerTwo,
        swapPlayers
    }
})()

const gameGrid = (() => {
    const gridSpots = [...Array(9).keys()]

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
        resetGrid
    }
})()

gameGrid.generateGrid()