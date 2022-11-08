export const useState = (initialState: any = null): [() => any, (newState: any) => void] => {

  let state = { value: initialState };

  const setState: (newState: any) => void = (newState: any) => {
    state.value = newState
  };
  const getState: () => any = () => state.value;

  return [getState, setState];
}

export const useEffect = async (callback: () => void, dependency: (() => any)[]) => {
  let useEffectOldDependency: any[] = [] ;

  setInterval(() => {
    let hasChange = false;

    dependency.map(x => {
      if (!useEffectOldDependency.includes(x())) {
        hasChange = true;
      }
    })

    if (hasChange) {
      useEffectOldDependency = dependency.map(x => x());
      callback();
    }
  }, 100)
}