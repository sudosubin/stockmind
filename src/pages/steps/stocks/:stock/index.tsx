import * as style from "#/pages/steps/stocks/:stock/style.css";
import type { ComponentProps } from "preact";
import { useLocation, useRoute } from "preact-iso";
import { useMemo, useState } from "preact/hooks";
import {
  Badge,
  Button,
  Card,
  Image,
  Radio,
  RadioGroup,
  Text,
  View,
} from "reshaped";
import { Header } from "#/components/Header";
import { PageWithCTA } from "#/components/PageWithCTA";
import { Question } from "#/components/Question";
import { stocks } from "#/constants/stocks";
import { t } from "#/shared/i18n";
import { route, search } from "#/shared/route";
import {
  StockAnswer,
  calculatePredicatePrices,
  findStockDateByDate,
  isValidStockName,
} from "#/shared/stock";
import {
  type StockName,
  calculateStockFrom,
  calculateStockTo,
} from "#/shared/stock";

export const StockPage = () => {
  const location = useLocation();
  const { params, query } = useRoute();

  if (!isValidStockName(params.stock)) {
    location.route("/404");
    return null;
  }

  const { previous } = search.steps.stock.deserialize(query);
  // use `key` to reset the state when the stock path changes
  return <Stock key={params.stock} stock={params.stock} previous={previous} />;
};

const Stock = ({
  stock,
  previous,
}: { stock: StockName; previous: Record<StockName, StockAnswer> }) => {
  const from = useMemo(() => calculateStockFrom(), []);
  const to = useMemo(() => calculateStockTo(), []);

  const fromData = findStockDateByDate({ stock, date: from });
  const toData = findStockDateByDate({ stock, date: to });

  const [selectedValue, setSelectedValue] = useState<StockAnswer | null>(null);

  const prices = calculatePredicatePrices({
    from: fromData?.price || 0,
    to: toData?.price || 0,
  });

  const options = [
    {
      text: t("steps.stock.answer.0.text"),
      description: t("steps.stock.answer.0.description")({ price: prices[0] }),
      badge: t("steps.stock.answer.0.badge"),
      value: StockAnswer.MORE_THAN_50,
      image: "/static/emoji-chart-increasing.svg",
    },
    {
      text: t("steps.stock.answer.1.text"),
      description: t("steps.stock.answer.1.description")({ price: prices[1] }),
      badge: t("steps.stock.answer.1.badge"),
      value: StockAnswer.BETWEEN_10_AND_50,
      image: "/static/emoji-chart-increasing.svg",
    },
    {
      text: t("steps.stock.answer.2.text"),
      description: t("steps.stock.answer.2.description")({ price: prices[2] }),
      badge: t("steps.stock.answer.2.badge"),
      value: StockAnswer.BETWEEN_0_AND_10,
      image: "/static/emoji-chart.svg",
    },
    {
      text: t("steps.stock.answer.3.text"),
      description: t("steps.stock.answer.3.description")({ price: prices[3] }),
      badge: t("steps.stock.answer.3.badge"),
      value: StockAnswer.LESS_THAN_0,
      image: "/static/emoji-chart-decreasing.svg",
    },
  ];

  return (
    <PageWithCTA
      renderHeader={() => <Header />}
      renderContent={() => (
        <Question
          image={
            <Image
              src={`/static/${stock}.svg`}
              alt={stock}
              width={16}
              className={style.icon}
            />
          }
          title={
            <View align="center" gap={4}>
              <span>
                {t("steps.stock.hero.question.title")({
                  name: t(`_.stock.${stock}`),
                })}
              </span>
            </View>
          }
          description={t("steps.stock.hero.question.description")({
            date: from,
            price: fromData?.price,
          })}
          additional={t("_.shared.referenceData")({ from, to })}
        >
          <RadioGroup name="stock">
            <View gap={3} className={style.radios}>
              {options.map((option) => {
                const isSelected = selectedValue === option.value;

                return (
                  <Card key={option.value} selected={isSelected} as="label">
                    <View gap={4} direction="row" align="center">
                      <View.Item>
                        <Image src={option.image} width={8} />
                      </View.Item>
                      <View.Item grow>
                        <Text variant="body-2" weight="medium">
                          {option.text}
                        </Text>
                        <View direction="row" align="center" gap={2}>
                          <Text variant="body-3">{option.description}</Text>
                          <Badge
                            color={isSelected ? "primary" : undefined}
                            variant="faded"
                            size="small"
                          >
                            {option.badge}
                          </Badge>
                        </View>
                      </View.Item>
                      <Radio
                        value={option.value}
                        checked={isSelected}
                        onChange={() => setSelectedValue(option.value)}
                      />
                    </View>
                  </Card>
                );
              })}
            </View>
          </RadioGroup>
        </Question>
      )}
      renderButton={(props) => (
        <UpcomingStockOrResultButton
          {...props}
          answers={{ ...previous, [stock]: selectedValue }}
          disabled={!selectedValue}
        />
      )}
    />
  );
};

const UpcomingStockOrResultButton = ({
  answers,
  children,
  ...props
}: {
  answers: Record<StockName, StockAnswer>;
} & ComponentProps<typeof Button>) => {
  const query = search.steps.stock.serialize({ previous: answers });
  const stock = calculateUpcomingStock({ answers });

  if (stock) {
    return (
      <Button {...props} href={route.steps.stock({ stock, query })}>
        {t("steps.stock.button.next")}
      </Button>
    );
  }

  return (
    <Button {...props} href={route.steps.result({ query })}>
      {t("steps.stock.button.result")}
    </Button>
  );
};

const calculateUpcomingStock = ({
  answers,
}: { answers: Record<StockName, StockAnswer> }) => {
  const stockNames = Object.keys(answers) as StockName[];
  const rest = Object.keys(stocks).filter(
    (stock) => !stockNames.includes(stock as StockName),
  );
  return rest[0] as StockName | undefined;
};
