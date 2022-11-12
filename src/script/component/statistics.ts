import { appendChildren, createElement } from '../reactLite';

export const statistics = (game: string, statsTitle?: string) => {
  const statistics = createElement({ keyElement: 'div', classList: 'statistics' });

  const title = createElement({
    keyElement: 'p',
    classList: 'title',
    content: statsTitle || 'statistics'
  });

  const stats = createElement({
    keyElement: 'table',
    content: [ createElement({
      keyElement: 'tr',
      content: [ createElement({ keyElement: 'th', content: 'name' }), createElement({
        keyElement: 'th',
        content: 'score'
      }) ]
    }) ]
  })

  try {
    const jsGamesStats: {
      name: string,
      score: number
    }[] = JSON.parse(localStorage.getItem('JSgames'))[game];

    jsGamesStats.map(({ name, score }) => {
      stats.appendChild(createElement({
        keyElement: 'tr',
        content: [
          createElement({ keyElement: 'td', content: name }),
          createElement({ keyElement: 'td', content: score }),
        ]
      }))
    })

  } catch {
    console.log(`there's no stats for ${game}`)
  }

  appendChildren({ element: statistics, children: [ title, stats ] })

  return statistics;
}