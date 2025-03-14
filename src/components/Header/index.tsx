import { Button, Container, Hidden, Image, View } from "reshaped";
import { Link } from "wouter";
import * as style from "#/components/Header/style.css";
import { t } from "#/shared/i18n";
import { routes } from "#/shared/route";

export const Header = () => {
  return (
    <View className={style.view} as="header">
      <Container className={style.container}>
        <View>
          <Link href={routes.index}>
            <Image src="/favicon.svg" alt="Logo" width="28px" />
          </Link>
        </View>
        <View>
          <Hidden hide={{ s: true, m: false }}>
            <Link href={routes.steps.start}>
              <Button color="primary" variant="faded">
                {t("_.header.start")}
              </Button>
            </Link>
          </Hidden>
        </View>
      </Container>
    </View>
  );
};
