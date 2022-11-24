type createElementType = (
    element: keyof HTMLElementTagNameMap,
    options?: {
        content?: string|number|HTMLElement | (string|number|HTMLElement)[],
        className?: string | string[],
        id?: string,
        dataset?: {
            [key: string]: string,
        },
    }
) => HTMLElement;

export const createElement: createElementType = (element, options = {}) => {
    const el = document.createElement(element);

    options && (() => {
        options.id && el.setAttribute('id', options.id);
        options.content && (Array.isArray(options.content) ? options.content : [options.content]).map(content => {
            typeof content === 'string' || typeof content === 'number' ? el.innerHTML += content : el.appendChild(content);
        });
        options.className && (Array.isArray(options.className) ? options.className : [options.className]).map(c => el.classList.add(c));
        options.dataset && Object.entries(options.dataset).map(d => el.dataset[d[0]] = d[1]);
    })();

    return el;
}