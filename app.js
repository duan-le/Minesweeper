document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector(".grid");
	let width = 10;
	let bombsCount = 20;
	let squares = [];
	let isGameOver = false;

	function click(square) {
		if (isGameOver) {
			return;
		}
		if (
			square.classList.contains("checked") ||
			square.classList.contains("flag")
		) {
			return;
		}
		if (square.classList.contains("bomb")) {
			alert("Game over");
		} else {
			let bombsNearbyCount = square.getAttribute("bombsNearbyCount");
			console.log(bombsNearbyCount);
			if (bombsNearbyCount != 0) {
				square.innerHTML = bombsNearbyCount;
				square.classList.add("checked");
				return;
			}
			checkSquare(square);
		}
		square.classList.add("checked");
	}

	function checkSquare(square) {
		const currentID = square.id;
		const isLeftEdge = currentID % width === 0;
		const isRightEdge = currentID % width === width - 1;

		setTimeout(() => {
			if (currentID > 0 && !isLeftEdge) {
				const newId = parseInt(currentID) - 1;
				const newSquare = document.getElementById(newId);
				click(newSquare);
			}
			if (currentID > 9 && !isRightEdge) {
				const newId = parseInt(currentID) + 1 - width;
				const newSquare = document.getElementById(newId);
				click(newSquare);
			}
			if (currentID > 10) {
				const newId = parseInt(currentID) - width;
				const newSquare = document.getElementById(newId);
				click(newSquare);
			}
			if (currentID > 11 && !isLeftEdge) {
				const newId = parseInt(currentID) - 1 - width;
				const newSquare = document.getElementById(newId);
				click(newSquare);
			}
			if (currentID < 98 && !isRightEdge) {
				const newId = parseInt(currentID) + 1;
				const newSquare = document.getElementById(newId);
				click(newSquare);
			}
			if (currentID < 90 && !isLeftEdge) {
				const newId = parseInt(currentID) - 1 + width;
				const newSquare = document.getElementById(newId);
				click(newSquare);
			}
			if (currentID < 88 && !isRightEdge) {
				const newId = parseInt(currentID) + 1 + width;
				const newSquare = document.getElementById(newId);
				click(newSquare);
			}
			if (currentID < 89) {
				const newId = parseInt(currentID) + width;
				const newSquare = document.getElementById(newId);
				click(newSquare);
			}
		}, 10);
	}

	function createBoard() {
		const bombsArray = Array(bombsCount).fill("bomb");
		const safeArray = Array(width * width - bombsCount).fill("safe");
		const gameArray = bombsArray.concat(safeArray);
		const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

		for (let i = 0; i < width * width; i++) {
			const square = document.createElement("div");
			square.setAttribute("id", i);
			square.classList.add(shuffledArray[i]);
			grid.appendChild(square);
			squares.push(square);
			square.addEventListener("click", (e) => {
				click(square);
			});
		}

		for (let i = 0; i < squares.length; i++) {
			const isLeftEdge = i % width === 0;
			const isRightEdge = i % width === width - 1;
			let bombsNearbyCount = 0;

			if (squares[i].classList.contains("safe")) {
				// West bomb check
				if (
					i > 0 &&
					!isLeftEdge &&
					squares[i - 1].classList.contains("bomb")
				) {
					bombsNearbyCount++;
				}
				// Northeast bomb check
				if (
					i > 9 &&
					!isRightEdge &&
					squares[i + 1 - width].classList.contains("bomb")
				) {
					bombsNearbyCount++;
				}
				// North bomb check
				if (i > 10 && squares[i - width].classList.contains("bomb")) {
					bombsNearbyCount++;
				}
				// Northwest bomb check
				if (
					i > 11 &&
					!isLeftEdge &&
					squares[i - 1 - width].classList.contains("bomb")
				) {
					bombsNearbyCount++;
				}
				// East bomb check
				if (
					i < 98 &&
					!isRightEdge &&
					squares[i + 1].classList.contains("bomb")
				) {
					bombsNearbyCount++;
				}
				// Southwest bomb check
				if (
					i < 90 &&
					!isLeftEdge &&
					squares[i - 1 + width].classList.contains("bomb")
				) {
					bombsNearbyCount++;
				}
				// Southeast bomb check
				if (
					i < 88 &&
					!isRightEdge &&
					squares[i + 1 + width].classList.contains("bomb")
				) {
					bombsNearbyCount++;
				}
				// South bomb check
				if (i < 89 && squares[i + width].classList.contains("bomb")) {
					bombsNearbyCount++;
				}
				squares[i].setAttribute("bombsNearbyCount", bombsNearbyCount);
			}
		}
	}

	createBoard();
});
