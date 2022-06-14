import { useTranslation } from "next-i18next";

import { ICharacter } from "../../../lib/gamePlay";

interface IProps {
  adventurer: ICharacter;
}

const Card = (props: IProps) => {
  const { adventurer } = props;
  const { t } = useTranslation();

  return (
    <button className="h-48 w-80 p-3 m-2 rounded-md border-2 border-slate-200 text-left">
      <div className="font-bold text-xs">{adventurer.name}</div>
      <div className="grid grid-cols-3 mt-2">
        <div className="text-sm">
          <div className="font-bold">{t("cur_level")}</div>
          <div>{adventurer.level}</div>
        </div>
        <div className="text-sm">
          <div className="font-bold">
            {t("max_HP")}:{adventurer.maxHP}
          </div>
          <div>
            {t("cur_HP")}:{adventurer.curHP}
          </div>
        </div>
        <div className="text-sm">
          <div className="font-bold">
            {t("max_MP")}:{adventurer.maxMP}
          </div>
          <div>
            {t("cur_MP")}:{adventurer.curMP}
          </div>
        </div>
      </div>
    </button>
  );
};

export default Card;
