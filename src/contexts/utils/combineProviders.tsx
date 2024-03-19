import React from 'react';

export const combineComponents = (
  ...components: (({
    children,
  }: {
    children: React.ReactNode;
  }) => React.JSX.Element)[]
) => {
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
