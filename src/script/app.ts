import { menu } from './component/menu';
import { useEffect, useState } from './reactLite';

import { minesweeperHome } from './component/games/minesweeper/minesweeperHome';
import { motus } from './component/games/motus';

export const App = (() => {

  const [ elementInView, setElementInView ] = useState("menu");

  const components: { [key: string]: any } = {
    menu: menu(setElementInView),
    minesweeper: minesweeperHome(setElementInView),
    motus: motus(),
  }

  const app = document.createElement('div');
  app.setAttribute('id', 'App');

  useEffect(() => {
    app.innerHTML = '';
    app.appendChild(components[elementInView()]);
  }, [elementInView]);


  return app;
})()