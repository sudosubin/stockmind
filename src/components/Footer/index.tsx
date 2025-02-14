import { Button, Icon, Link, View } from "reshaped";
import * as style from "#/components/Footer/style.css";
import { GitHub } from "#/icons";

export const Footer = () => {
  return (
    <View className={style.view} as="footer">
      <View>
        Made by{" "}
        <Link href="https://github.com/sudosubin" variant="plain">
          sudosubin
        </Link>
      </View>
      <View>
        <Button
          href="https://github.com/sudosubin"
          color="media"
          icon={<Icon svg={GitHub} color="neutral-faded" size={4} />}
          size="small"
          rounded
        />
      </View>
    </View>
  );
};
