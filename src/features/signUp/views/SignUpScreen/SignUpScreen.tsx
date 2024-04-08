import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Container, FormTextInput} from 'components';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import schema from './schema';

export const SignUpScreen = ({}) => {
  const {t} = useTranslation();

  const {
    control,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      password: '',
    },
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
      />
    </Container>
  );
};
