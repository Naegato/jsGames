import {createElement} from './usefulFunc';
import {randomColor} from './randomColor';
import {sound} from "./sound";

export const App2 = () => {
    const htmlElements: {[key: string]: HTMLElement} = {};

    htmlElements.playButton = createElement('button', { otherOptions: {type: 'submit'}})
    htmlElements.gameContainer = createElement('div', {})
    htmlElements.gameOver = createElement('form', {})
    htmlElements.homePage = createElement('form', {content: [htmlElements.playbutton]})
    htmlElements.app = createElement('div', {})

    const highlight = () => {

    }

    const play = () => {

    }

    const gameOver = () => {

    }
}



export const App = () => {

    const app = createElement('section', {id: 'app'});

    const title = createElement('h1', {content: 'Memory Game'});
    const game = createElement('div', {className: 'game'});

    const localScore = JSON.parse(localStorage.getItem('JsGames'))?.simon;

    console.log(localScore[2]);
    const scoreBpard = createElement('div', {className: 'scoreBoard', content: [
        createElement('p', {content: 'scoreboard'}),
        createElement('div', {
            content: localScore ?
                Object.keys(localScore).map(x => createElement('div', {
                    content: [
                        `x${x} : `,
                        createElement('div', {
                            content: localScore[x].map(y => {const [key, val] = Object.entries(y)[0]; return `${key} : ${val}`})
                        }),
                    ]
                }))
                : 'no score found'
            })
        ]
    });

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
    playButton.setAttribute('type', 'submit');

    const container = createElement('form', {className: 'container', content: [settings, playButton, scoreBpard]});

    app.appendChild(title);
    app.appendChild(container);

    let userSequence: number[] = [];

    const clickToSequence = (sequence, number) => {
        return (e) => {
            sound.randomSound();
            const input = parseInt(e.target.dataset.button);
            if (sequence[userSequence.length] === input) {
                userSequence = [...userSequence, input]

                if (userSequence.length === sequence.length) {
                    userSequence = [];
                    removeEvent([...game.querySelectorAll('[data-button]')] as HTMLElement[]);
                    playing2(sequenceGenerator(number,sequence),number);
                }
            } else {
                gameOver([settings, playButton, scoreBpard], sequence, number)
            }
        }
    }

    const eventHandler = [];

    const gameOver = (homepage: HTMLElement | HTMLElement[], sequence, number) => {
        sound.gameOver();
        const score = (sequence.length-1) * 100 + (userSequence.length-1)*20;
        const lastScore = JSON.parse(localStorage.getItem('JsGames'))


        removeEvent([...game.querySelectorAll('[data-button]')] as HTMLElement[]);
        const button = createElement('button', {content: 'retourner a l\'acceuil'});
        button.setAttribute('type', 'submit');

        const input = createElement('input') as HTMLInputElement;
        input.setAttribute('type', 'text');
        input.setAttribute('value', 'Underscore');

        const gameover = createElement('form', {
            className: 'gameOver',
            content: [
                'Game Over',
                input,
                button,
            ]
        })

        gameover.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = input.value || 'Underscore';
            const simon = lastScore?.simon;
            const hasLastScore = simon && simon[number];
            console.log(simon,hasLastScore)
            const gameScore =
                JSON.stringify({
                    ...(lastScore || {}),
                    simon: {
                        ...(simon || {}),
                        [number]: hasLastScore ? [...hasLastScore, {[name]: score}] : [{ [name]: score }]
                    }
                });

            localStorage.setItem('JsGames', gameScore);

            game.innerHTML = '';
            container.innerHTML = '';
            (Array.isArray(homepage) ? homepage : [homepage]).map((v) => {
                container.appendChild(v);
            })
        })

        container.appendChild(gameover);
    }

    const addEvent = (buttons: HTMLElement[], sequence, number) => {
        const handler =  clickToSequence(sequence,number);
        eventHandler.push(handler)
        buttons.map((x) => {
            x.addEventListener('click', handler)
        })
    }

    const removeEvent = (buttons: HTMLElement[]) => {
        buttons.map((x) => {
            eventHandler.map((h) => {
                x.removeEventListener('click', h)
            })
        })
    }

    const playing2 = (sequence: number[],number) => {
        console.log('play');
        sequence.reduce((previous, current, index, array) => {
            return previous.then(() => {
                return promise(game, array[index])
            })
        }, Promise.resolve()).then(() => {
            addEvent([...game.querySelectorAll('[data-button]')] as HTMLElement[],sequence,number);
        })
    }

    container.addEventListener('submit', (e) => {
        e.preventDefault();
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
        playing2(sequence,number);
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
            resolve();
        }, 500);
    }).then(() => new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            game.querySelector(`[data-button="${x}"]`).classList.remove('highlight');
            resolve();
        }, 500);
    }));
}