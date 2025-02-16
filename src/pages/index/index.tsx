import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "preact/hooks";
import { Button, Container, Icon, Text, View } from "reshaped";
import { Footer } from "#/components/Footer";
import { Header } from "#/components/Header";
import { ArrowRight } from "#/icons";
import * as style from "#/pages/index/style.css";
import { t } from "#/shared/i18n";
import { routes } from "#/shared/route";

export const IndexPage = () => {
  return (
    <>
      <Header />
      <Container width="1024px">
        <HeroSection />
        <Footer />
      </Container>
    </>
  );
};

const HeroSection = () => {
  const texts = t("index.hero.button");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2_500);

    return () => clearInterval(interval);
  }, [texts]);

  return (
    <View className={style.hero} gap={4} as="section">
      <Text
        variant={{ s: "title-6", m: "title-5", l: "title-3" }}
        align="center"
        as="h1"
      >
        {t("index.hero.title")}
      </Text>
      <View maxWidth="440px">
        <Text
          variant={{ s: "body-2", m: "body-1" }}
          color="neutral-faded"
          align="center"
          className={style.heroDescription}
        >
          {t("index.hero.description")}
        </Text>
      </View>
      <Button
        href={routes.steps.start}
        color="primary"
        endIcon={<Icon svg={ArrowRight} size={5} />}
        size="large"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={texts[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {texts[index]}
          </motion.span>
        </AnimatePresence>
      </Button>
    </View>
  );
};
