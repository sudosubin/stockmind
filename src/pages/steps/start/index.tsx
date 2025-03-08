import { useMemo, useState } from "preact/hooks";
import { Button, Card, Image, Radio, RadioGroup, Text, View } from "reshaped";
import { Header } from "#/components/Header";
import { PageWithCTA } from "#/components/PageWithCTA";
import { Question } from "#/components/Question";
import * as style from "#/pages/steps/start/style.css";
import { t } from "#/shared/i18n";
import { route } from "#/shared/route";
import {
  type StockName,
  calculateStockFrom,
  calculateStockTo,
} from "#/shared/stock";

export const StepsStartPage = () => {
  const from = useMemo(() => calculateStockFrom(), []);
  const to = useMemo(() => calculateStockTo(), []);
  const [selectedName, setSelectedName] = useState<StockName | null>(null);

  const stocks = [
    {
      name: "amazon",
      displayName: t("_.stock.amazon"),
      description: t("_.stock.amazon.description"),
    },
    {
      name: "apple",
      displayName: t("_.stock.apple"),
      description: t("_.stock.apple.description"),
    },
    {
      name: "nvidia",
      displayName: t("_.stock.nvidia"),
      description: t("_.stock.nvidia.description"),
    },
    {
      name: "tesla",
      displayName: t("_.stock.tesla"),
      description: t("_.stock.tesla.description"),
    },
  ] as { name: StockName; displayName: string; description: string }[];

  return (
    <>
      <PageWithCTA
        renderHeader={() => <Header />}
        renderContent={() => (
          <Question
            image="/static/emoji-chart-increasing.svg"
            title={t("steps.start.hero.question.title")}
            description={t("steps.start.hero.question.description")}
            additional={t("steps.start.hero.question.additional")({ from, to })}
          >
            <RadioGroup name="stock">
              <View gap={3} className={style.radios}>
                {stocks.map((stock) => {
                  const isSelected = selectedName === stock.name;

                  return (
                    <Card key={stock.name} selected={isSelected} as="label">
                      <View gap={4} direction="row" align="center">
                        <View.Item>
                          <Image
                            src={`/static/${stock.name}.svg`}
                            alt={stock.name}
                            className={style.icon}
                          />
                        </View.Item>
                        <View.Item grow>
                          <Text variant="body-2" weight="medium">
                            {stock.displayName}
                          </Text>
                          <Text variant="body-3">{stock.description}</Text>
                        </View.Item>
                        <Radio
                          value={stock.name}
                          checked={isSelected}
                          onChange={() => setSelectedName(stock.name)}
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
          <Button
            {...props}
            href={route.steps.stock({ stock: selectedName })}
            disabled={!selectedName}
          >
            {t("steps.start.button")}
          </Button>
        )}
      />
    </>
  );
};
