import { CogIcon, HomeIcon, MapIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { useCallback } from "react";
import { Fragment, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

import useGameData from "../../api/hook/useGameData";
import { patchGameData } from "../../lib/api";
import GamePlay from "../GamePlay";
import CurrentPlace from "./CurrentPlace";

const tooltip = clsx(
  "z-50",
  "invisible group-hover:visible",
  "bg-sky-300 rounded",
  "p-1 whitespace-nowrap select-none absolute left-full ml-2"
);

const button = "group relative bg-slate-700 w-9 h-9 p-1 m-1.5 rounded";

interface IProps {}

const Layout = (props: PropsWithChildren<IProps>) => {
  const { children } = props;
  const [gameData, mutate] = useGameData();

  const { t } = useTranslation();

  const endJoureny = useCallback(() => {
    mutate(
      patchGameData({
        userId: "1",
        journeys: [],
      })
    );
  }, [mutate]);

  return (
    <Fragment>
      <GamePlay />
      <Head>
        <title>Great Adventure</title>
        <meta name="description" content="Game of Great Adventure" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen">
        <div className="flex flex-col justify-between	w-12 bg-slate-600">
          <div>
            <Link href="/camp">
              <div className={button}>
                <div className={tooltip}>{t("camp")}</div>
                <HomeIcon />
              </div>
            </Link>
            <Link href="/map">
              <button className={button}>
                <div className={tooltip}>{t("map")}</div>
                <MapIcon />
              </button>
            </Link>
            <button className={button}>
              <div className={tooltip}>{t("camp")}</div>
            </button>
          </div>
          <div>
            <button className={button}>
              <div className={tooltip}>{t("camp")}</div>
            </button>
            <button className={button}>
              <div className={tooltip}>{t("camp")}</div>
            </button>
            <Link href="/settings">
              <button className={button}>
                <div className={tooltip}>{t("settings")}</div>
                <CogIcon />
              </button>
            </Link>
          </div>
        </div>
        {children}
        {gameData?.currentPlaceId && (
          <CurrentPlace
            placeId={gameData.currentPlaceId}
            endJoureny={endJoureny}
          />
        )}
      </div>
    </Fragment>
  );
};

export default Layout;
