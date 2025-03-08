import { Text } from "reshaped";

export const ko = {
  "_.footer.made-by.label": "Made by ",
  "_.footer.made-by.author": "sudosubin",
  "_.header.start": "시작하기",
  "_.shared.referenceData": ({ from, to }: { from: Date; to: Date }) => {
    const fromAsString = `${from.getFullYear()}년 ${from.getMonth() + 1}월 ${from.getDate()}일`;
    const toAsString = `${to.getFullYear()}년 ${to.getMonth() + 1}월 ${to.getDate()}일`;
    return `※ 기준 데이터: ${fromAsString} ~ ${toAsString}`;
  },
  "_.stock.amazon": "아마존",
  "_.stock.amazon.description": "Amazon",
  "_.stock.apple": "애플",
  "_.stock.apple.description": "Apple",
  "_.stock.nvidia": "엔비디아",
  "_.stock.nvidia.description": "Nvidia",
  "_.stock.tesla": "테슬라",
  "_.stock.tesla.description": "Tesla",
  "index.hero.title": (
    <>
      그때 그 주식
      <br />
      얼마나 올랐을까?
    </>
  ),
  "index.hero.description": (
    <>
      2024년에 Nvidia, Tesla, Apple, Amazon 주식을 샀다면 지금은 얼마나 올랐을지
      알아보세요
    </>
  ),
  "index.hero.button": [
    "Nvidia 주식 알아보기",
    "Tesla 주식 알아보기",
    "Apple 주식 알아보기",
    "Amazon 주식 알아보기",
  ],
  "steps.start.hero.question.title": (
    <>
      어떤 주식이
      <br />
      가장 많이 올랐을까요?
    </>
  ),
  "steps.start.hero.question.description":
    "2024년을 기준으로 가장 많이 올랐을 것 같은 주식을 선택해주세요.",
  "steps.start.button": "다음",
  "steps.stock.hero.question.title": ({ name }: { name: string }) => (
    <>
      {name} 주식은
      <br />
      얼마나 올랐을까요?
    </>
  ),
  "steps.stock.hero.question.description": ({
    date,
    price,
  }: { date: Date; price?: number }) => {
    const fromAsString = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    if (price !== undefined) {
      return (
        <>
          {fromAsString}에는 주당{" "}
          <Text weight="bold" as="span">
            {price.toLocaleString()}원
          </Text>
          이었어요.
        </>
      );
    }
    return `${fromAsString}을 기준으로 최근 주가를 예측해보세요.`;
  },
  "steps.stock.answer.0.text": "엄청 올랐을 것 같아요",
  "steps.stock.answer.0.description": ({ price }: { price: number }) => (
    <>
      주당 약{" "}
      <Text weight="bold" as="span">
        {price.toLocaleString()}원
      </Text>{" "}
    </>
  ),
  "steps.stock.answer.0.badge": "50% 이상",
  "steps.stock.answer.1.text": "꽤 많이 올랐을 것 같아요",
  "steps.stock.answer.1.description": ({ price }: { price: number }) => (
    <>
      주당 약{" "}
      <Text weight="bold" as="span">
        {price.toLocaleString()}원
      </Text>{" "}
    </>
  ),
  "steps.stock.answer.1.badge": "10% ~ 50%",
  "steps.stock.answer.2.text": "약간 올랐을 것 같아요",
  "steps.stock.answer.2.description": ({ price }: { price: number }) => (
    <>
      주당 약{" "}
      <Text weight="bold" as="span">
        {price.toLocaleString()}원
      </Text>
    </>
  ),
  "steps.stock.answer.2.badge": "0% ~ 10%",
  "steps.stock.answer.3.text": "내렸을 것 같아요",
  "steps.stock.answer.3.description": ({ price }: { price: number }) => (
    <>
      주당 약{" "}
      <Text weight="bold" as="span">
        {price.toLocaleString()}원
      </Text>
    </>
  ),
  "steps.stock.answer.3.badge": "0% 미만",
  "steps.stock.button.next": "다음",
  "steps.stock.button.result": "결과 보기",
};
