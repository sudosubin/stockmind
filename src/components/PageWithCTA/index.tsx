import type { ComponentProps, ReactNode } from "react";
import { type Button, Container, View } from "reshaped";
import * as style from "#/components/PageWithCTA/style.css";

interface Props {
  renderHeader: () => ReactNode;
  renderContent: () => ReactNode;
  renderButton: (props: ComponentProps<typeof Button>) => ReactNode;
}

export const PageWithCTA = ({
  renderHeader,
  renderContent,
  renderButton,
}: Props) => {
  return (
    <View height="100vh" direction="column">
      {renderHeader()}
      <Container width="1024px">{renderContent()}</Container>
      <Container
        width="1024px"
        align="center"
        className={style.buttonContainer}
      >
        {renderButton({
          fullWidth: { s: true, m: false },
          color: "primary",
          size: "large",
        })}
      </Container>
    </View>
  );
};
