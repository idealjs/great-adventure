import clsx from "clsx";
import { useTranslation } from "react-i18next";

const tooltip = clsx(
  "invisible group-hover:visible",
  "p-1 whitespace-nowrap select-none absolute left-full ml-1.5"
);

const button = "group relative bg-slate-700 w-9 h-9 m-1.5 hover:cursor-pointer";

const Game = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-between	w-12 bg-slate-600">
        <div>
          <div className={button}>
            <div className={tooltip}>{t("camp")}</div>
          </div>
          <div className={button}>
            <div className={tooltip}>{t("camp")}</div>
          </div>
          <div className={button}>
            <div className={tooltip}>{t("camp")}</div>
          </div>
        </div>
        <div>
          <div className={button}>
            <div className={tooltip}>{t("camp")}</div>
          </div>
          <div className={button}>
            <div className={tooltip}>{t("camp")}</div>
          </div>
          <div className={button}>
            <div className={tooltip}>{t("settings")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
