import React from "react";
import { LoadingContext } from "./contexts";
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
