import { useMemo, useState } from "react";
import { Avatar, Button, Card, Radio, RadioGroup, Text, View } from "reshaped";
import { Link } from "wouter";
import { stockClient } from "#/clients/stock-client";
import { Header } from "#/components/Header";
import { PageWithCTA } from "#/components/PageWithCTA";
import { Question } from "#/components/Question";
import * as style from "#/pages/steps/start/style.css";
import { t } from "#/shared/i18n";
import { route } from "#/shared/route";
import type { StockName } from "#/shared/stock";

export const StepsStartPage = () => {
  const { from, to } = useMemo(() => stockClient.getDates(), []);
  const [selectedName, setSelectedName] = useState<StockName | null>(null);

  const options = stockClient.getStockNames().map((stockName) => ({
    name: stockName,
    displayName: t(`_.stock.${stockName}`),
    description: t(`_.stock.${stockName}.description`),
  }));

  return (
    <>
      <PageWithCTA
        renderHeader={() => <Header />}
        renderContent={() => (
          <Question
            image="/static/emoji-chart-increasing.svg"
            title={t("steps.start.hero.question.title")}
            description={t("steps.start.hero.question.description")}
            additional={t("_.shared.referenceData", { from, to })}
          >
            <RadioGroup name="stock">
              <View gap={3} className={style.radios}>
                {options.map((option) => {
                  const isSelected = selectedName === option.name;

                  return (
                    <Card key={option.name} selected={isSelected} as="label">
                      <View gap={4} direction="row" align="center">
                        <View.Item>
                          <Avatar src={`/static/${option.name}.svg`} size={8} />
                        </View.Item>
                        <View.Item grow>
                          <Text variant="body-2" weight="medium">
                            {option.displayName}
                          </Text>
                          <Text variant="body-3">{option.description}</Text>
                        </View.Item>
                        <Radio
                          value={option.name}
                          checked={isSelected}
                          onChange={() => setSelectedName(option.name)}
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
          <Link
            href={route.steps.stock({
              stock: selectedName,
              query: { top: selectedName },
            })}
          >
            <Button {...props} disabled={!selectedName}>
              {t("steps.start.button")}
            </Button>
          </Link>
        )}
      />
    </>
  );
};
