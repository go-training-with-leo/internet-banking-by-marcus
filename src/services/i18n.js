import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

import { en, vi } from 'translation';

const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: true,
  },
});

export default i18n;
