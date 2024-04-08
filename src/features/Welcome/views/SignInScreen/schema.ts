import {t} from 'i18next';
import {isValidPassword} from 'utils/validations/isValidPassword';
import {z} from 'zod';

const shema = z.object({
  email: z
    .string()
    .min(1, t('error.validation.min'))
    .email(t('error.validation.email')),
  password: z.string().refine(isValidPassword, t('error.validation.password')),
});

export default shema;
