import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Container, FormTextInput} from 'components';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useMutation} from '@tanstack/react-query';
import {useToast} from 'react-native-toast-notifications';
import {signUp} from 'services';
import {RootStackParamsList} from 'types/navigation';
import schema from './schema';

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

  const signUpMt = useMutation({
    mutationFn: (params: {email: string; password: string}) => signUp(params),
  });

  const submit = handleSubmit(values => {
    signUpMt.mutateAsync(values, {
      onSuccess: () => {
        toast.show(t('success'));
      },
      onError: () => {
        toast.show(t('error.form.wrong.data'), {
          type: 'error',
        });
      },
    });
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
              error={!!errors.email}
              helperText={errors.email?.message}
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
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
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
              error={!!errors.password}
              helperText={errors.password?.message}
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
