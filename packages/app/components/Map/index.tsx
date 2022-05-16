import { useTranslation } from "next-i18next";

import Layout from "../Layout";

const Map = () => {
  const { t } = useTranslation();
  return <Layout>{t("map_title")}</Layout>;
};

export default Map;
