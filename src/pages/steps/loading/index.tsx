import { useEffect } from "react";
import { Image, Text, View } from "reshaped";
import { useLocation, useSearchParams } from "wouter";
import { Header } from "#/components/Header";
import { PageWithCTA } from "#/components/PageWithCTA";
import { useFakeLoading } from "#/hooks/useFakeLoading";
import * as style from "#/pages/steps/loading/style.css";
import { t } from "#/shared/i18n";
import { route, search } from "#/shared/route";

export const StepsLoadingPage = () => {
  const [_, navigate] = useLocation();
  const [searchParams, __] = useSearchParams();
  const query = Object.fromEntries(searchParams);

  const { isLoading } = useFakeLoading({ duration: 2_000 });

  useEffect(() => {
    if (!isLoading) {
      const deserialized = search.steps.stock.deserialize(query);
      const { state } = search.steps.result.serialize(deserialized);
      navigate(route.steps.result({ query: { state } }));
    }
  });

  return (
    <PageWithCTA
      renderHeader={() => <Header />}
      renderContent={() => (
        <View className={style.container} gap={6} as="section">
          <Image
            src="/static/emoji-animated-robot.webp"
            alt="robot"
            width={32}
            height={32}
          />
          <View gap={4} maxWidth="320px">
            <Text variant="featured-2" align="center" weight="medium">
              {t("steps.result.loading.text")}
            </Text>
            <Text variant="body-1" align="center" color="neutral-faded">
              {t("steps.result.loading.description")}
            </Text>
          </View>
        </View>
      )}
      renderButton={() => null}
    />
  );
};
