import { useTranslation } from "next-i18next";

import Layout from "../Layout";

const Camp = () => {
  const { t } = useTranslation();

  return <Layout>{t("camp_empty_title")}</Layout>;
};

export default Camp;
