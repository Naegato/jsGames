import {createElement} from './usefulFunc';
import {randomColor} from './randomColor';
import {resolve} from "path";

export const App = () => {
    const app = createElement('section', {id: 'app'});

    const title = createElement('h1', {content: 'Memory Game'});
    const game = createElement('div', {className: 'game'});

    const settingsNumberButton = createElement('input', {id: 'settingsNumberButton'}) as HTMLInputElement;
    settingsNumberButton.setAttribute('type', 'number');
    settingsNumberButton.setAttribute('min', '2')
    settingsNumberButton.setAttribute('required', 'true')
    settingsNumberButton.value = '2';

    const labelSettingsNumberButton = createElement('label', {content: "setting number item"});
    labelSettingsNumberButton.setAttribute("for", 'settingsNumberButton');

    const settings = createElement('div', {
        className: 'settings',
        content: [labelSettingsNumberButton, settingsNumberButton]
    });
    const playButton = createElement('button', {content: "Play"});

    const container = createElement('div', {className: 'container', content: [settings, playButton]});

    app.appendChild(title);
    app.appendChild(container);

    let userSequence: number[] = [];

    const clickToSequence = (sequence) => {
        return (e) => {
            const input = parseInt(e.target.dataset.button);
            console.log('f', input, userSequence, sequence, sequence[userSequence.length], sequence[userSequence.length] === input);
            if (sequence[userSequence.length] === input) {
                console.log('continu');
                userSequence = [...userSequence, input]
            } else {
                console.log('gameover')
                gameOver([settings, playButton])
            }
        }
    }

    const gameOver = (homepage: HTMLElement | HTMLElement[]) => {
        console.log('g')
        removeEvent(game);
        console.log('g2');
        const button = createElement('button', {content: 'retourner a l\'acceuil'});
        button.addEventListener('click', () => {
            game.innerHTML = '';
            container.innerHTML = '';
            (Array.isArray(homepage) ? homepage : [homepage]).map((v) => {
                container.appendChild(v);
            })
        })

        const gameover = createElement('div', {className: 'gameOver'})
        document.body.appendChild(gameover);
    }

    const addEvent = (game, sequence) => {
        console.log('normalement ajouter');
        [...game.querySelectorAll('[data-button]')].map((x) => {
            console.log('ajouter a ', x.dataset.button);
            x.addEventListener('click', clickToSequence(sequence))
        })
    }

    const removeEvent = (game) => {
        [...game.querySelectorAll('[data-button]')].map((x) => {
            x.removeEventListener('click', clickToSequence)
        })
    }

    const playing2 = (sequence: number[], container, game, number) => {
        sequence.reduce((previous, current, index, array) => {
            return previous.then(() => {
                return promise(game, array[index])
            })
        }, Promise.resolve()).then(() => {
            console.log('ajouter');
            addEvent(game, sequence);
        })
    }

    playButton.addEventListener('click', () => {
        const number = (() => {
            if (!settingsNumberButton.value) {
                return 2;
            }

            const x = parseInt(settingsNumberButton.value)

            return x > 2 ? x : 2;
        })();

        container.innerHTML = '';

        container.appendChild(game);

        game.innerHTML = '';

        for (let i = 0; i < number; i++) {
            const item = createElement('div', {dataset: {button: `${i}`}});
            item.style.backgroundColor = randomColor();
            game.appendChild(item);
        }


        let sequence = sequenceGenerator(number);
        // playing(game,container,[settings, playButton], sequence, number);
        playing2(sequence, container, game, number);
    })

    return app;
}

const sequenceGenerator = (number: number, x: number[] = []) => {
    return [...x, Math.floor(Math.random() * (number))]
}


const promise = (game, x) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            game.querySelector(`[data-button="${x}"]`).classList.add('highlight');
            console.log('allumer')
            resolve();
        }, 500);
    }).then(() => new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            game.querySelector(`[data-button="${x}"]`).classList.remove('highlight');
            console.log('etteint')
            resolve();
        }, 500);
    }));
}


// const playing = (element: HTMLElement,container: HTMLElement,homepage: HTMLElement | HTMLElement[], sequence: number[], number: number) => {
//     console.log(sequence);
//     sequence.map(async (x) => {
//         element.querySelector(`[data-button="${x}"]`).classList.add('highlight');
//         await setTimeout(() => {
//             element.querySelector(`[data-button="${x}"]`).classList.remove('highlight');
//         }, 500)
//     });
//
//     let userSequence = [];
//
//     const buttons = [].slice.call(element.querySelectorAll('[data-button]'));
//
//     inputsUser(container,homepage,buttons, userSequence, sequence, element, number);
// }
//
// const inputsUser = (container: HTMLElement, homePage: HTMLElement | HTMLElement[],elements: HTMLElement[], userSequence: number[], sequence: number[], element: HTMLElement, number: number) => {
//     const clickfunc = (e) => {
//         if (parseInt(e.target.dataset.button) === sequence[userSequence.length]) {
//             if (sequence.length === userSequence.length + 1) {
//                 playing(element,container,homePage,sequenceGenerator(number,sequence), number)
//             } else {
//                 inputsUser(container,homePage,elements,[...userSequence, parseInt(e.target.dataset.button)], sequence,element,number);
//             }
//         } else {
//             const button = createElement('button', {content: 'return to homepage'});
//             button.addEventListener('click', () => {
//                 container.innerHTML = '';
//                 (Array.isArray(homePage) ? homePage : [homePage]).map(x => {
//                     container.appendChild(x);
//                 });
//             })
//             container.appendChild(createElement('div', {className: 'gameOver', content: ['Game Over', button]}))
//         }
//         elements.map(x => x.removeEventListener('click', clickfunc));
//     };
//
//     elements.map(x => {
//         x.addEventListener('click', clickfunc);
//     });
// };