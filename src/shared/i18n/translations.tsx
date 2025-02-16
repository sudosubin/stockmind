export const ko = {
  "_.footer.made-by.label": "Made by ",
  "_.footer.made-by.author": "sudosubin",
  "_.header.start": "시작하기",
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
  "steps.start.hero.question.additional": ({
    from,
    to,
  }: { from: Date; to: Date }) => {
    const fromAsString = `${from.getFullYear()}년 ${from.getMonth() + 1}월 ${from.getDate()}일`;
    const toAsString = `${to.getFullYear()}년 ${to.getMonth() + 1}월 ${to.getDate()}일`;
    return `※ 기준 데이터: ${fromAsString} ~ ${toAsString}`;
  },
  "steps.start.button": "다음",
};
