import i18n from '@/i18n/index';

const translation = {
  get supportedLocales() {
    return import.meta.env.VITE_SUPPORTED_LOCALES.split(',');
  },

  set currentLocale(newLocale) {
    i18n.global.locale.value = newLocale;
  },

  async switchLanguage(newLocale) {
    translation.currentLocale = newLocale;
    document.querySelector('html').setAttribute('lang', newLocale);
  },
};

export default translation;
