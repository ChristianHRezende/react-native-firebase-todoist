import {Button, Container, FormTextInput} from '@/components';
import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import {signIn} from '@/services';
import {RootStackParamsList} from '@/types/navigation';
import capitalize from '@/utils/format/capitalize';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useMutation} from '@tanstack/react-query';
import {useToast} from 'react-native-toast-notifications';
import schema from './schema';

type SignInScreenProps = NativeStackScreenProps<RootStackParamsList, 'SignIn'>;

export const SignInScreen = ({navigation}: SignInScreenProps) => {
  const {t} = useTranslation();
  const toast = useToast();
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const {navigate} = navigation;

  const signInMt = useMutation({
    mutationFn: (params: {email: string; password: string}) => signIn(params),
  });

  const submit = handleSubmit(values => {
    signInMt.mutateAsync(values, {
      onSuccess: () => {
        toast.show(t('success'));
        navigate('Home');
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
              testID={`input${capitalize(fieldProps.name)}`}
              textContentType="emailAddress"
              autoCapitalize={'none'}
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
              testID={`input${capitalize(fieldProps.name)}`}
            />
          );
        }}
      />
      <Button
        testID="submitButton"
        variant="contained"
        title={t('submit')}
        customClassName="self-center"
        onPress={submit}
      />
    </Container>
  );
};
