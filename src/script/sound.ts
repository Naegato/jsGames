import Pizzicato from 'Pizzicato';

const createSound = (frequency) => {
    return new Pizzicato.Sound({
        source: 'wave',
        options: {
            frequency: frequency,
        }
    })
}


const frequency = {
    do1: createSound(261.626),
    dod1: createSound(277.18),
    re1: createSound(293.66),
    red1: createSound(311.13),
    mi1: createSound(329.63),
    fa1: createSound(349.23),
    fad1: createSound(369.99),
    sol1: createSound(392.00),
    sold1: createSound(415.30),
    la1: createSound(440.00),
    lad1: createSound(466.16),
    si1: createSound(493.88),
    do2: createSound(523.25),
    dod2: createSound(554.37),
    re2: createSound(587.33),
    red2: createSound(622.25),
    mi2: createSound(659.26),
    fa2: createSound(698.46),
    fad2: createSound(739.99),
    sol2: createSound(783.99),
    sold2: createSound(830.61),
    la2: createSound(880.00),
    lad2: createSound(932.33),
    si2: createSound(987.77),
    do3: createSound(1046.50),
    dod3: createSound(1108.73),
    re3: createSound(1174.66),
    red3: createSound(1244.51),
    mi3: createSound(1318.51),
    fa3: createSound(1396.91),
    fad3: createSound(1479.98),
    sol3: createSound(1567.98),
    sold3: createSound(1661.22),
    la3: createSound(1760.00),
    lad3: createSound(1864.66),
    si3: createSound(1975.53),
}

export const sound = {
    randomSound: () => {
        const sound = Object.values(frequency)[Math.floor(Math.random() * (Object.values(frequency).length -1))];
        (new Promise<void>((resolve) => {
            sound.play();
            setTimeout(() => {
                resolve();
            },100)
        })).then((resolve: any) => {
            sound.stop();
            resolve();
        })
    },

    gameOver: () => {
        (new Promise<void>((resolve) => {
            frequency.do2.play();
            setTimeout(() => {
                frequency.do2.stop();
                resolve();
            }, 120)
        }))
        .then(() => new Promise<void>((resolve) => {
            frequency.sol1.play();
            setTimeout(() => {
                frequency.sol1.stop();
                resolve();
            }, 120)
        })).then(() => new Promise<void>((resolve) => {
            frequency.mi1.play();
            setTimeout(() => {
                frequency.mi1.stop();
                resolve();
            }, 120)
        })).then(() => new Promise<void>((resolve) => {
            frequency.la1.play();
            setTimeout(() => {
                frequency.la1.stop();
                resolve();
            }, 120)
        })).then(() => new Promise<void>((resolve) => {
            frequency.si1.play();
            setTimeout(() => {
                frequency.si1.stop();
                resolve();
            }, 120)
        })).then(() => new Promise<void>((resolve) => {
            frequency.la1.play();
            setTimeout(() => {
                frequency.la1.stop();
                resolve();
            }, 120)
        })).then(() => new Promise<void>((resolve) => {
            frequency.sold1.play();
            setTimeout(() => {
                frequency.sol1.stop();
                resolve();
            }, 120)
        })).then(() => new Promise<void>((resolve) => {
            frequency.lad1.play();
            setTimeout(() => {
                frequency.lad1.stop();
                resolve();
            }, 120)
        })).then(() => new Promise<void>((resolve) => {
            frequency.sold1.play();
            setTimeout(() => {
                frequency.sold1.stop();
                resolve();
            }, 120)
        })).then(() => new Promise<void>((resolve) => {
            frequency.mi1.play();
            frequency.sol1.play();
            setTimeout(() => {
                frequency.mi1.stop();
                resolve();
            }, 120)
        })).then(() => new Promise<void>((resolve) => {
            frequency.do1.play();
            setTimeout(() => {
                frequency.do1.stop();
                resolve();
            }, 120)
        })).then(() => new Promise<void>((resolve) => {
            frequency.mi1.play();
            setTimeout(() => {
                frequency.mi1.stop();
                frequency.sol1.stop();
                resolve();
            }, 120)
        }));
    }
}