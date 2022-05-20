import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export { default } from "../../components/Camp";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
