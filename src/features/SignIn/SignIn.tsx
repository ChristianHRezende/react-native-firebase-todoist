import React from 'react';
import {Typography} from 'components';
import * as Styled from './SignIn.styled';

type Props = {};

export const SignIn: React.FC<Props> = ({}) => {
  return (
    <Styled.BodyWrapper>
      <Typography heading variant="lg">
        {'TEXT'}
      </Typography>
    </Styled.BodyWrapper>
  );
};
