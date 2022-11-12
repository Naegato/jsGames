import { appendChildren, createElement, useEffect } from '../../../reactLite';

export const minesweeperGame = (onGameOver: () => void) => {
  const game = createElement({ keyElement: 'div' })
  const rows = 5;
  const columns = 5;
  const bombs = 5;

  const board = createElement({ keyElement: 'table' });

  const boardContent = createBoard(rows, columns, bombs);
  const renderedBoard = boardContent.map(x => x.map(x => '0'))
  renderedBoard.map((row, rowIndex) => {
    appendChildren({
      element: board,
      children: createElement({
        keyElement: 'tr',
        content: row.map((column, columnIndex) => {
          return createElement({
            keyElement: 'td',
            content: '0',
            event: {
              target: 'click',
              callback: () => {
                switch (boardContent[rowIndex][columnIndex]) {
                  case 'B' :
                    console.log('gameOver');
                    return;
                  default :
                    renderedBoard[rowIndex][columnIndex] = 'X';
                    console.log('gameeee', renderedBoard, boardContent)
                    return;
                }
              }
            }
          })
        })
      })
    })
  })

  useEffect(() => {
    game.innerHTML = '';
    appendChildren({
      element: game,
      children: board
    })
  }, [() => renderedBoard])

  return game;
}

const createBoard = (rows: number, columns: number, bombs: number) => {
  const map: string[] = [];

  for (let i = 0; i < rows * columns; i++) {
    map.push((i < bombs) ? 'B' : '0');
  }

  for (let i = map.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ map[i], map[j] ] = [ map[j], map[i] ];
  }
  const board: string[][] = [];

  for (let i = 0; i < columns; i++) {
    board.push(map.slice(i * columns, (i + 1) * columns));
  }

  return board;
}