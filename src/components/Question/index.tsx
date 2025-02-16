import type { PropsWithChildren, ReactNode } from "preact/compat";
import { Text, View } from "reshaped";
import * as style from "#/components/Question/style.css";

interface Props {
  title: ReactNode;
  description: ReactNode;
  additional?: ReactNode;
}

export const Question = ({
  title,
  description,
  additional,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <View className={style.container} gap={4} as="section">
      <Text variant={{ s: "title-6", m: "title-5" }} align="center" as="h1">
        {title}
      </Text>
      <View maxWidth="440px">
        <Text
          variant={{ s: "body-2", m: "body-1" }}
          color="neutral-faded"
          align="center"
          className={style.description}
        >
          {description}
        </Text>
      </View>
      {!!additional && (
        <Text variant="body-3" color="disabled" align="center">
          {additional}
        </Text>
      )}
      {children}
    </View>
  );
};
