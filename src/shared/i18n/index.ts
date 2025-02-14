import { ko } from "#/shared/i18n/translations";

export const t = (key: keyof typeof ko) => {
  return ko[key];
};
