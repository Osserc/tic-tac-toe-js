let gridSpots = [...Array(9).keys()]
const gameGrid = document.querySelector(`#game-grid`)

for (let i = 0; i < gridSpots.length; i++) {
    const singleCell = document.createElement(`div`)
    singleCell.dataset.index = i
    singleCell.classList.add(`bg-info`, `border`, `border-primary`, `border-3`, `m-0`, `d-flex`, `align-items-center`, `justify-content-center`, `single-cell`)
    gameGrid.appendChild(singleCell)
}