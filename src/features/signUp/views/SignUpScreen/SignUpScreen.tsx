import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Container, FormTextInput} from 'components';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import auth from '@react-native-firebase/auth';

import schema from './schema';
import {useToast} from 'react-native-toast-notifications';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from 'types/navigation';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamsList, 'SignUp'>;

export const SignUpScreen = ({}: SignUpScreenProps) => {
  const {t} = useTranslation();
  const toast = useToast();
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      password: '',
    },
  });
  console.log({errors});

  const submit = handleSubmit(values => {
    const {email, password} = values;
    try {
      auth().createUserWithEmailAndPassword(email, password);
      toast.show(t('success'));
    } catch (error) {
      toast.show(t('error.form.wrong.data'), {
        type: 'error',
      });
    }
  });

  return (
    <Container screen viewClassname="flex-col space-y-8">
      <Controller
        name="name"
        control={control}
        render={({field}) => {
          const fieldProps = {...field, ref: null};

          return (
            <FormTextInput
              {...fieldProps}
              className="mb-2"
              placeholder={t('name')}
              onChangeText={field.onChange}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          );
        }}
      />

      <Controller
        name="email"
        control={control}
        render={({field}) => {
          const fieldProps = {...field, ref: null};

          return (
            <FormTextInput
              {...fieldProps}
              className="mb-2"
              placeholder={t('email')}
              onChangeText={field.onChange}
              error={!!errors.name}
              helperText={errors.name?.message}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize={'none'}
            />
          );
        }}
      />

      <Controller
        name="cpf"
        control={control}
        render={({field}) => {
          const fieldProps = {...field, ref: null};

          return (
            <FormTextInput
              {...fieldProps}
              className="mb-2"
              placeholder={t('cpf')}
              onChangeText={field.onChange}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          );
        }}
      />

      <Controller
        name="password"
        control={control}
        render={({field}) => {
          const fieldProps = {...field, ref: null};

          return (
            <FormTextInput
              {...fieldProps}
              className="mb-2"
              placeholder={t('password')}
              onChangeText={field.onChange}
              error={!!errors.name}
              helperText={errors.name?.message}
              secureTextEntry
            />
          );
        }}
      />
      <Button
        variant="contained"
        title={t('submit')}
        customClassName="self-center"
        onPress={submit}
      />
    </Container>
  );
};
