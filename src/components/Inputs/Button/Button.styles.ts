import {TouchableOpacity} from 'react-native';
import styled from 'styled-components';

export const ContainedButton = styled(TouchableOpacity)`
  width: 228px;
  height: 54px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextButton = styled(TouchableOpacity)`
  gap: 12px;
  color: #2dd8fe;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
