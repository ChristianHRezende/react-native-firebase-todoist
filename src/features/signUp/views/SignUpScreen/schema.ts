import {t} from 'i18next';
import isValidCPF from 'utils/validations/isValidCpf';
import {isValidPassword} from 'utils/validations/isValidPassword';
import {z} from 'zod';

const shema = z.object({
  name: z.string().min(1, t('error.validation.min')),
  cpf: z.string().refine(isValidCPF, t('error.validation.cpf')),
  email: z
    .string()
    .min(1, t('error.validation.min'))
    .email(t('error.validation.email')),
  password: z.string().refine(isValidPassword, t('error.validation.password')),
});

export default shema;
