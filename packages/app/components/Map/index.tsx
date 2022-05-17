import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import Layout from "../Layout";
import Graph from "./Graph";

const graph = new Graph();

const point1 = { id: "1", name: "point1" };
const point2 = { id: "2", name: "point2" };

graph.addEdge(point1, point2, 1);

const Map = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { first_mid } = router.query;

  const edges = graph.adjacency.get(point1.id);
  return (
    <Layout>
      <div className="flex">
        <div>
          <div>{`${t("map_placed")}${t(point1.name)}`}</div>
          <div>{t("map_title")}</div>
          {edges?.map((edge) => {
            return (
              <Link key={edge.point.id} href={`/game/map/${edge.point.id}`}>
                <div>{t(edge.point.name)}</div>
              </Link>
            );
          })}
        </div>
        <div>
          {first_mid != null ? (
            <div>{`${t(first_mid)}${t("map_reach")}`}</div>
          ) : (
            <div>{t("map_title")}</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Map;
