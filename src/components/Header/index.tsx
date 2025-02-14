import { Button, Container, Image, View } from "reshaped";
import * as style from "#/components/Header/style.css";
import { routes } from "#/constants/routes";
import { t } from "#/shared/i18n";

export const Header = () => {
  return (
    <View className={style.view} as="header">
      <Container className={style.container}>
        <View>
          <Image src="/vite.svg" alt="Logo" width="24px" />
        </View>
        <View className={style.right}>
          <Button href={routes.steps.start} color="primary" variant="faded">
            {t("_.header.start")}
          </Button>
        </View>
      </Container>
    </View>
  );
};
