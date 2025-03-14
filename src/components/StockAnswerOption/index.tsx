import { Badge, Card, Image, Radio, Text, View } from "reshaped";
import { t } from "#/shared/i18n";
import { StockAnswer } from "#/shared/stock";

interface Props {
  answer: StockAnswer;
  price: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

const images = {
  [StockAnswer.MORE_THAN_50]: "/static/emoji-chart-increasing.svg",
  [StockAnswer.BETWEEN_10_AND_50]: "/static/emoji-chart-increasing.svg",
  [StockAnswer.BETWEEN_0_AND_10]: "/static/emoji-chart.svg",
  [StockAnswer.LESS_THAN_0]: "/static/emoji-chart-decreasing.svg",
};

export const StockAnswerOption = ({
  answer,
  price,
  isSelected,
  onSelect,
}: Props) => {
  const text = t(`steps.stock.answer.${answer}.text`);
  const description = t(`steps.stock.answer.${answer}.description`, { price });
  const badge = t(`steps.stock.answer.${answer}.badge`);
  const image = images[answer];

  return (
    <Card selected={isSelected} as="label">
      <View gap={4} direction="row" align="center">
        <View.Item>
          <Image src={image} width={8} height={8} />
        </View.Item>
        <View.Item grow>
          <Text variant="body-2" weight="medium">
            {text}
          </Text>
          <View direction="row" align="center" gap={2}>
            <Text variant="body-3">{description}</Text>
            <Badge
              color={isSelected ? "primary" : undefined}
              variant="faded"
              size="small"
            >
              {badge}
            </Badge>
          </View>
        </View.Item>
        <Radio value={answer} checked={isSelected} onChange={onSelect} />
      </View>
    </Card>
  );
};
