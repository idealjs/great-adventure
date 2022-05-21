import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { Fragment, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

import GamePlay from "../GamePlay";

const tooltip = clsx(
  "z-50",
  "invisible group-hover:visible",
  "bg-sky-300 rounded",
  "p-1 whitespace-nowrap select-none absolute left-full ml-2"
);

const button =
  "group relative bg-slate-700 w-9 h-9 m-1.5 rounded hover:cursor-pointer";

interface IProps {}

const Layout = (props: PropsWithChildren<IProps>) => {
  const { children } = props;

  const { t } = useTranslation();

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
              </div>
            </Link>
            <Link href="/map">
              <div className={button}>
                <div className={tooltip}>{t("map")}</div>
              </div>
            </Link>
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
            <Link href="/settings">
              <div className={button}>
                <div className={tooltip}>{t("settings")}</div>
              </div>
            </Link>
          </div>
        </div>
        {children}
      </div>
    </Fragment>
  );
};

export default Layout;
