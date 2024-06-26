import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './json/en.json';
import pt from './json/pt.json';
import {LangCode} from './types/types';

const resources = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
};

i18n.use(initReactI18next).init({
  debug: false,
  resources,
  lng: LangCode.en,
  fallbackLng: LangCode.en,
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
