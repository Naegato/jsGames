type createElementType = (
    element: keyof HTMLElementTagNameMap,
    options?: {
        content?: (string|number|HTMLElement)[] | string|number|HTMLElement,
        className?: string | string[],
        id?: string,
        dataset?: {
            [key: string]: string,
        },
        eventListener?: {
            target: string,
            callback: () => void,
        }
        otherOptions?: {
            [key:string]: string
        }
    }
) => HTMLElement;

export const createElement: createElementType = (element, options = {}) => {
    const el = document.createElement(element);

    options && (() => {
        const {id,content,className,dataset,eventListener,otherOptions} = options;
        id && el.setAttribute('id', id);
        content && (Array.isArray(content) ? content : [content]).map(content => {
            typeof content === 'string' || typeof content === 'number' ? el.innerHTML += content : el.appendChild(content);
        });
        className && (Array.isArray(className) ? className : [className]).map(c => el.classList.add(c));
        dataset && Object.entries(dataset).map(([key,val]) => el.dataset[key] = val);
        eventListener && (() => {
            const {target,callback} = eventListener;
            el.addEventListener(target, callback);
        })();
        otherOptions && Object.entries(otherOptions).map(([key,value]) => el.setAttribute(key,value));
    })();

    return el;
}