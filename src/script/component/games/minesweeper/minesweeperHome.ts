import { createElement, useEffect, useState } from '../../../reactLite';
import { guiHome } from '../../guiHome';
import { minesweeperGame } from './minesweeperGame';

export const minesweeperHome = (changeTab: (str: string) => void) => {
  const minesweeper = createElement({ keyElement: 'div'})

  const backButton = createElement({keyElement: 'button', id: 'back'})
  backButton.innerText = 'back';
  backButton.addEventListener('click', () => {
    changeTab("menu");
  })

  const [play,setPlay] = useState(false);

  useEffect(() => {
    minesweeper.innerHTML = '';
    play() ?
      minesweeper.appendChild(minesweeperGame(()  => {setPlay(false)})) :
      (() => {
        minesweeper.appendChild(backButton);
        minesweeper.appendChild(guiHome({onPlay: () => {setPlay(true)}, game: 'minesweeper'}));
      })()
  }, [play])

  return minesweeper;
}