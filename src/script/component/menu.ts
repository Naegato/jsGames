export const menu = (changeTab: (str: string) => void) => {

  const menu = document.createElement('div');

  const games = [ 'minesweeper', 'motus' ];

  const onclick = (str: string) => {
    changeTab(str)
  }

  games.map((str) => {
    const button = document.createElement('button')
    button.classList.add('button')
    button.innerText = str
    button.addEventListener('click', () => {
      console.log(str);
      changeTab(str);
    })
    menu.appendChild(button);
    return { button, str };
  })
  // .map(({button,str}) => button.removeEventListener('click', () => onclick(str)))

  return menu;
}