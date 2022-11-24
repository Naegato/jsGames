import chroma from "chroma-js"

export const randomColor = () => {
    const [r,g,b] = chroma.random()._rgb._unclipped;
    return `rgb(${[r,g,b].join(',')})`;
}