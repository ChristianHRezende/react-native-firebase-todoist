import {Image} from 'react-native';
import styled from 'styled-components';

export const UserImage = styled(Image)<{
  hidden: boolean;
}>`
  width: 32px;
  height: 32px;
  opacity: ${({hidden}) => (hidden ? 0 : 1)};
`;
