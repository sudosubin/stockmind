import { useMemo } from "preact/hooks";
import { Avatar, Badge, Button, Card, Image, Text, View } from "reshaped";
import { stockClient } from "#/clients/stock-client";
import { Header } from "#/components/Header";
import { PageWithCTA } from "#/components/PageWithCTA";
import { StockGraph } from "#/components/StockGraph";
import { useFakeLoading } from "#/hooks/useFakeLoading";
import { useSearchStepsStock } from "#/hooks/useSearchStepsStock";
import * as style from "#/pages/steps/result/style.css";
import { t } from "#/shared/i18n";
import { type StockName, formatRate } from "#/shared/stock";

export const StepsResultPage = () => {
  const { isLoading } = useFakeLoading({ duration: 2_000 });
  return isLoading ? <StepsResultLoading /> : <StepsResult />;
};

const StepsResultLoading = () => {
  return (
    <PageWithCTA
      renderHeader={() => <Header />}
      renderContent={() => (
        <View className={style.container} gap={6} as="section">
          <Image
            src="/static/emoji-animated-robot.webp"
            alt="robot"
            width={32}
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

const StepsResult = () => {
  const stockNames = stockClient.getStockNames();

  return (
    <PageWithCTA
      renderHeader={() => <Header />}
      renderContent={() => (
        <View className={style.container} gap={6} paddingBottom={4}>
          <HeroSection />
          <RisingSection />
          {stockNames.map((stockName) => (
            <StockSection key={stockName} stockName={stockName} />
          ))}
        </View>
      )}
      renderButton={(props) => (
        <Button {...props} color="primary" size="large">
          {t("steps.result.button")}
        </Button>
      )}
    />
  );
};

const HeroSection = () => {
  const { top, previous } = useSearchStepsStock();

  const answers = stockClient.getAnswers();
  const { from, to } = stockClient.getDates();

  const count = useMemo(() => {
    return ((answers.rising.top.stockName === top ? 1 : 0) +
      answers.stocks.filter(
        ({ stockName, answer }) => previous[stockName] === answer,
      ).length) as 0 | 1 | 2 | 3 | 4 | 5;
  }, [answers, previous, top]);

  const image = {
    5: "/static/emoji-crown.svg",
    4: "/static/emoji-graduation-cap.svg",
    3: "/static/emoji-evergreen-tree.svg",
    2: "/static/emoji-seedling.svg",
    1: "/static/emoji-alien.svg",
    0: "/static/emoji-ghost.svg",
  }[count];

  return (
    <View align="center" gap={4} maxWidth="320px" paddingBottom={6}>
      <Image src={image} width={32} />
      <Text variant="featured-2" align="center" weight="medium">
        {t(`steps.result.${count}.title`)}
      </Text>
      <Text variant="body-1" align="center" color="neutral-faded">
        {t(`steps.result.${count}.description`)}
      </Text>
      <Text variant="body-3" color="disabled" align="center">
        {t("_.shared.referenceData", { from, to })}
      </Text>
    </View>
  );
};

const RisingSection = () => {
  const { rising } = stockClient.getAnswers();
  const { top } = useSearchStepsStock();

  const correct = rising.top.stockName === top;

  return (
    <View width="100%" maxWidth="440px">
      <Card padding={0} className={correct ? style.correct : style.incorrect}>
        <View
          direction="column"
          align="center"
          paddingBlock={4}
          backgroundColor={correct ? "positive-faded" : "critical-faded"}
        >
          <View direction="row" align="center" gap={2} paddingBottom={5}>
            <Badge
              color={correct ? "positive" : "critical"}
              size="medium"
              rounded
            >
              <Text variant="body-3">
                {correct
                  ? t("steps.result.answer.correct")
                  : t("steps.result.answer.incorrect")}
              </Text>
            </Badge>
            <Text variant="body-2">
              {t("steps.start.hero.question.title.nowrap")}
            </Text>
          </View>

          <View direction="row" align="center" justify="center" gap={8}>
            <RisingStock
              stockName={rising.top.stockName}
              rate={rising.top.rate}
              size="large"
            />
            {rising.rest.map(({ stockName, rate }) => (
              <RisingStock
                key={stockName}
                stockName={stockName}
                rate={rate}
                size="small"
              />
            ))}
          </View>
        </View>
      </Card>
    </View>
  );
};

const RisingStock = ({
  stockName,
  rate,
  size,
}: { stockName: StockName; rate: number; size: "small" | "large" }) => {
  const color = rate > 100 ? "critical" : "primary";
  const isLarge = size === "large";

  return (
    <View align="center" gap={isLarge ? 2 : 1}>
      <Badge.Container position="top-end">
        <Badge color={color} variant="faded" size="small" rounded>
          <Text variant={isLarge ? "caption-1" : "caption-2"}>
            {formatRate(rate)}
          </Text>
        </Badge>
        <Avatar src={`/static/${stockName}.svg`} size={isLarge ? 12 : 8} />
      </Badge.Container>
      <View align="center">
        <Text variant={isLarge ? "body-2" : "body-3"} weight="medium">
          {t(`_.stock.${stockName}`)}
        </Text>
        <Text variant={isLarge ? "body-3" : "caption-1"} color="neutral-faded">
          {t(`_.stock.${stockName}.description`)}
        </Text>
      </View>
    </View>
  );
};

const StockSection = ({ stockName }: { stockName: StockName }) => {
  const { previous } = useSearchStepsStock();

  const data = stockClient.getStock({ stockName });
  const { from, to, answer, rate } = stockClient.getAnswer({ stockName });

  const correct = previous[stockName] === answer;
  const increasing = rate > 100;

  return (
    <View key={stockName} width="100%" maxWidth="440px">
      <Card padding={0} className={correct ? style.correct : style.incorrect}>
        <View
          direction="column"
          align="stretch"
          paddingBlock={4}
          backgroundColor={correct ? "positive-faded" : "critical-faded"}
        >
          <View
            direction="row"
            align="center"
            justify="center"
            gap={2}
            paddingBottom={5}
          >
            <Badge
              color={correct ? "positive" : "critical"}
              size="medium"
              rounded
            >
              <Text variant="body-3">
                {correct
                  ? t("steps.result.answer.correct")
                  : t("steps.result.answer.incorrect")}
              </Text>
            </Badge>
            <Text variant="body-2">
              {t("steps.stock.hero.question.title.nowrap", {
                name: t(`_.stock.${stockName}`),
              })}
            </Text>
            <Text variant="body-3">
              {increasing &&
                t("steps.result.stock.increase", {
                  from: from.price,
                  to: to.price,
                  rate: rate - 100,
                })}
              {!increasing &&
                t("steps.result.stock.decrease", {
                  from: from.price,
                  to: to.price,
                  rate: 100 - rate,
                })}
            </Text>
          </View>

          <View direction="row" align="stretch" justify="center" height={40}>
            <StockGraph
              id={`stock-graph-${stockName}`}
              color={
                correct
                  ? "var(--rs-color-foreground-positive)"
                  : "var(--rs-color-foreground-critical)"
              }
              data={data}
            />
          </View>
        </View>
      </Card>
    </View>
  );
};
