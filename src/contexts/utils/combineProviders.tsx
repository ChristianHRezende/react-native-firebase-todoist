import React from 'react';
import {CombineProvider} from './types/types';

export const combineComponents = (...components: CombineProvider[]) => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({children}: React.PropsWithChildren) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({children}) => <>{children}</>,
  );
};
