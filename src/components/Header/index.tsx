import { Button, Container, Image, View } from "reshaped";
import * as style from "#/components/Header/style.css";
import { routes } from "#/constants/routes";

export const Header = () => {
  return (
    <View className={style.view} as="header">
      <Container className={style.container}>
        <View>
          <Image src="/vite.svg" alt="Logo" width="24px" />
        </View>
        <View>
          <Button href={routes.steps.start} color="primary" variant="faded">
            시작하기
          </Button>
        </View>
      </Container>
    </View>
  );
};
