import { Button, Icon, Link, View } from "reshaped";
import * as style from "#/components/Footer/style.css";
import { GitHub } from "#/icons";
import { t } from "#/shared/i18n";

export const Footer = () => {
  return (
    <View className={style.view} as="footer">
      <View>
        {t("_.footer.made-by.label")}
        <Link href="https://github.com/sudosubin" variant="plain">
          {t("_.footer.made-by.author")}
        </Link>
      </View>
      <View>
        <Button
          href="https://github.com/sudosubin/stockmind"
          color="media"
          icon={<Icon svg={GitHub} color="neutral-faded" size={4} />}
          size="small"
          rounded
        />
      </View>
    </View>
  );
};
