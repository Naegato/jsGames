import { appendChildren, createElement, FunctionComponent } from '../reactLite';
import { statistics } from './statistics';

type Props = {
  onPlay: () => void,
  game: string,
}

export const guiHome: FunctionComponent<Props> = ({ onPlay, game }) => {
  const guiHome = createElement({
    keyElement: 'div',
    classList: [ 'home' ],
    content: [
      createElement({
        keyElement: 'button',
        content: 'play',
        event: {
          target: 'click',
          callback: () => {
            onPlay();
          }
        }
      }),
      statistics(game),
    ]
  });

  return guiHome;
}