import { ko } from "#/shared/i18n/translations";

export const t = <K extends keyof typeof ko>(
  key: K,
  ...args: (typeof ko)[K] extends (...params: infer P) => any ? P : []
): (typeof ko)[K] extends (...params: any[]) => infer R
  ? R
  : (typeof ko)[K] => {
  const value = ko[key];

  if (typeof value === "function") {
    return value.apply(null, args);
  }

  return value as any;
};
