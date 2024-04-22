import {Task} from './task';

export type RootStackParamsList = {
  Home: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Welcome: undefined;
  TaskForm?: {
    id?: Task['id'];
  };
};
