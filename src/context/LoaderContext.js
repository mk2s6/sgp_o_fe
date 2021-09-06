import { useState, createContext } from 'react';

export const LoaderContext = createContext({
  loader: true,
  setLoader: () => {},
});

export const LoaderContextProvider = (props) => {
  const [loader, setLoader] = useState(false);
  return <LoaderContext.Provider value={{ loader, setLoader }}>{props.children}</LoaderContext.Provider>;
};

export const LoaderContextConsumer = LoaderContext.Consumer;
