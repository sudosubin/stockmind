import * as style from "#/pages/steps/stocks/:stock/style.css";
import { type ComponentProps, useMemo, useState } from "react";
import { Avatar, Button, RadioGroup, View } from "reshaped";
import { Redirect, useParams } from "wouter";
import { Link } from "wouter";
import { stockClient } from "#/clients/stock-client";
import { Header } from "#/components/Header";
import { PageWithCTA } from "#/components/PageWithCTA";
import { Question } from "#/components/Question";
import { StockAnswerOption } from "#/components/StockAnswerOption";
import { stocks } from "#/constants/stocks";
import { useSearchStepsStock } from "#/hooks/useSearchStepsStock";
import { t } from "#/shared/i18n";
import { route, search } from "#/shared/route";
import {
  type StockAnswer,
  type StockName,
  isValidStockName,
} from "#/shared/stock";

export const StockPage = () => {
  const params = useParams<{ stock: StockName }>();

  if (!isValidStockName(params.stock)) {
    return <Redirect to="/404" />;
  }

  const { previous } = useSearchStepsStock();
  // use `key` to reset the state when the stock path changes
  return (
    <Stock key={params.stock} stockName={params.stock} previous={previous} />
  );
};

const Stock = ({
  stockName,
  previous,
}: { stockName: StockName; previous: Record<StockName, StockAnswer> }) => {
  const { from, to } = useMemo(
    () => stockClient.getStockDates({ stockName }),
    [stockName],
  );
  const options = stockClient.getStockAnswerOptions({ stockName });

  const [selectedValue, setSelectedValue] = useState<StockAnswer | null>(null);

  return (
    <PageWithCTA
      renderHeader={() => <Header />}
      renderContent={() => (
        <Question
          image={<Avatar src={`/static/${stockName}.svg`} size={16} />}
          title={
            <View align="center" gap={4}>
              <span>
                {t("steps.stock.hero.question.title", {
                  name: t(`_.stock.${stockName}`),
                })}
              </span>
            </View>
          }
          description={t("steps.stock.hero.question.description", {
            date: from.date,
            price: from.price,
          })}
          additional={t("_.shared.referenceData", {
            from: from.date,
            to: to.date,
          })}
        >
          <RadioGroup name="stock">
            <View gap={3} className={style.radios}>
              {options.map(({ answer, price }) => (
                <StockAnswerOption
                  key={answer}
                  answer={answer}
                  price={price}
                  isSelected={answer === selectedValue}
                  onSelect={() => setSelectedValue(answer)}
                />
              ))}
            </View>
          </RadioGroup>
        </Question>
      )}
      renderButton={(props) => (
        <UpcomingStockOrResultButton
          {...props}
          answers={{ ...previous, [stockName]: selectedValue }}
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
  const { top } = useSearchStepsStock();
  const query = search.steps.stock.serialize({ top, previous: answers });
  const stock = calculateUpcomingStock({ answers });

  if (stock) {
    return (
      <Link href={route.steps.stock({ stock, query })}>
        <Button {...props}>{t("steps.stock.button.next")}</Button>
      </Link>
    );
  }

  return (
    <Link href={route.steps.loading({ query })}>
      <Button {...props}>{t("steps.stock.button.result")}</Button>
    </Link>
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
