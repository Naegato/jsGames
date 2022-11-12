const ReactLite = () => {
  return { useEffect, useState, appendChildren, createElement };
}

export default ReactLite;


export const useState = (initialState: any = null): [ () => any, (newState: any) => void ] => {

  let state = { value: initialState };

  const setState: (newState: any) => void = (newState: any) => {
    state.value = newState
  };
  const getState: () => any = () => state.value;

  return [ getState, setState ];
}

export const useEffect = async (callback: () => void, dependency: (() => any)[]) => {
  let useEffectOldDependency: any[] = [];

  const intervalId = setInterval(() => {
    let hasChange = false;

    console.log('dep', dependency[0]());

    dependency.map(x => {
      if (!useEffectOldDependency.includes(x())) {
        hasChange = true;
      }
    })

    if (hasChange) {
      useEffectOldDependency = dependency.map(x => x());
      callback();
    }
  }, 100);

  return intervalId;
}

type CreateElementProps = {
  keyElement: keyof HTMLElementTagNameMap,
  classList?: string[] | string,
  id?: string,
  content?: string | string[] | HTMLElement | HTMLElement[] | number | number[] | (string | HTMLElement | number)[]
  event?: {
    target: string,
    callback: (e?: Event) => void
  }
}

export type FunctionComponent<T, F = any> = (props: T) => F

export const createElement: FunctionComponent<CreateElementProps, HTMLElement> = (
  {
    keyElement,
    classList = null,
    id = null,
    content = null,
    event = null
  }) => {
  const element = document.createElement(keyElement);
  classList && element.classList.add(...(Array.isArray(classList) ? classList : [ classList ]));
  id && element.setAttribute('id', id);
  content && (() => {
    element.innerHTML = '';
    appendChildren({ element, children: content })
  })()
  event && element.addEventListener(event.target, event.callback);

  return element;
}

type AppendChildrenProps = {
  element: HTMLElement,
  children: string | string[] | HTMLElement | HTMLElement[] | number | number[] | (string | HTMLElement | number)[],
}

export const appendChildren: FunctionComponent<AppendChildrenProps> = ({ element, children }) => {
  (Array.isArray(children) ? children : [ children ]).map(value => {
    (typeof value === 'string' || typeof value === 'number') ?
      element.innerHTML += value :
      element.appendChild(value);
  })

  return element;
}