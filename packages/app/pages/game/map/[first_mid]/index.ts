import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export { default } from "../../../../components/Map";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          first_mid: "1",
        },
      },
    ],
    fallback: true,
  };
}
