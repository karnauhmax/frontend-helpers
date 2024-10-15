import { createI18n } from 'vue-i18n';
import en from '@locales/en-US';
import nl from '@locales/nl-NL';
import uk from '@locales/uk-UK';

const i18n = createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  globalInjection: true,
  legacy: false,
  messages: {
    en,
    nl,
    uk,
  },
});

export default i18n;
