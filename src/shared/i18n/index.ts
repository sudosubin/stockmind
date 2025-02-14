import { ko } from "#/shared/i18n/translations";

export const t = <K extends keyof typeof ko>(key: K): (typeof ko)[K] => {
  return ko[key];
};
