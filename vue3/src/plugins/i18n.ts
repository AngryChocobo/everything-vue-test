import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  locale: "en",
  globalInjection: true,
  messages: {
    en: {
      todoAppTitle: "antdv todos app",
    },
    ja: {
      todoAppTitle: "antdv こんにちは",
    },
    zh: {
      todoAppTitle: "antdv 待办清单",
    },
  },
});
