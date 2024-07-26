import auth from '@react-native-firebase/auth';

export type SignInParams = {
  email: string;
  password: string;
};

export async function signIn({email, password}: SignInParams) {
  return auth().signInWithEmailAndPassword(email, password);
}

export type SignUpParams = {
  email: string;
  password: string;
};

export async function signUp({email, password}: SignUpParams) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export async function signOut() {
  return auth().signOut();
}
