import { db } from "@/shared/firestore";
import firebase from "firebase/compat/app";
import {
  collection,
  doc,
  getDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import dayjs from "dayjs";

export interface ItemData {
  id: number;
  name: string;
  keywords: string[];
}

interface PriceCostData {
  cost: number;
  multiplier: number;
  unit: null | string;
  origin_text: "string";
}

interface PriceSearchData {
  query: string;
  ratio: number | string;
  text: string;
}

export interface PriceData {
  id: number;
  full_text: string;
  timestamp: string;
  search: PriceSearchData;
  costs: PriceCostData[];
  action: "구매" | "판매";
}

interface APIRecentItemData {
  id: string;
  recent_date: string;
  prev_date: string | null;
  recent: PriceData[];
  prev: PriceData[] | null;
  name: string;
}

export interface RecentItemData {
  id: string;
  recentDate: string;
  prevDate: string | null;
  recent: PriceData[];
  prev: PriceData[] | null;
  name: string;
}

export interface TrendingItemData {
  id: number;
  value: number;
  reliable: boolean;
  value_diff: number | null;
  rank_diff: number | null;
}

interface RecentScrollTrendingData {
  date: string;
  counts: {
    scrolls: number;
  };
  cost: TrendingItemData[];
  total_results: TrendingItemData[];
}

interface RecentNoScrollTrendingData {
  date: string;
  counts: {
    throwing_stars: number;
    total: number;
  };
  cost: TrendingItemData[];
  total_results: TrendingItemData[];
}

export interface RecentAllTrendingData {
  date: string;
  counts: {
    scrolls: number;
    throwing_stars: number;
    total: number;
  };
  cost: TrendingItemData[];
  total_results: TrendingItemData[];
}

interface RecentTrendingGGData {
  date: string;
  hour: number;
  price: TrendingItemData[];
}

interface StatisticValueData {
  average: number;
  expensive: number;
  frequent: number;
  minimum: number;
}

export interface StatisticsData {
  buyer: StatisticValueData;
  seller: StatisticValueData;
  overview: StatisticValueData;
  reliable: boolean;
  separated: boolean;
}

export interface ItemMessageData {
  channel_id: string;
  full_text: string;
  message_id: string;
  timestamp: string;
  username: string;
}

export interface APIMessageData {
  message_batch_index: number;
  messages: ItemMessageData[];
}

// export interface InfiniteAPIMessageData {

export const getItemImageSource = (id: number | string, resize = 1) => {
  return `https://maplestory.io/api/gms/62/item/${id}/icon?resize=${resize}`;
};

export async function getItemList(): Promise<ItemData[]> {
  const sessionData = sessionStorage.getItem("item-list");

  // 세션 스토리지에 데이터가 있으면 그걸 사용한다.
  if (sessionData && sessionData.length !== 0) {
    const data = JSON.parse(sessionData) as ItemData[];
    return data.sort((a, b) => a.name.localeCompare(b.name));
  }

  const itemDoc = await getDoc(doc(collection(db, "item"), "all-simple"));
  const data = itemDoc.exists() ? (itemDoc.data().data as ItemData[]) : [];

  sessionStorage.setItem("item-list", JSON.stringify(data));
  return data.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getRecentItemPrices(
  itemId: string
): Promise<RecentItemData | null> {
  const data = (
    await getDoc(doc(collection(db, itemId), "recent"))
  ).data() as APIRecentItemData | null;

  if (!data) return null;
  return {
    id: data.id,
    recentDate: data.recent_date,
    prevDate: data.prev_date,
    recent: data.recent,
    prev: data.prev,
    name: data.name,
  };
}

export async function getItemStatistics(
  itemId: string
): Promise<Record<string, StatisticsData> | null> {
  const data = (
    await getDoc(doc(collection(db, itemId), "statistics"))
  ).data() as Record<string, StatisticsData> | null;

  if (!data) return null;
  const dateWithDatestrAndHour: Record<string, StatisticsData> = {};
  Object.entries(data).forEach(([datestr, dataAboutHour]) => {
    Object.entries(dataAboutHour).forEach(([hour, data]) => {
      const datestrWithHour = `${datestr} ${hour}:00:00`;
      if (dayjs().diff(dayjs(datestrWithHour)) < 0) return;
      dateWithDatestrAndHour[datestrWithHour] = data;
    });
  });
  return dateWithDatestrAndHour;
}

export async function getGGItemStatistics(
  itemId: string
): Promise<Record<string, StatisticsData> | null> {
  const data = (
    await getDoc(doc(collection(db, itemId), "statistics-gg"))
  ).data() as Record<string, StatisticsData> | null;

  if (!data) return null;
  const dateWithDatestrAndHour: Record<string, StatisticsData> = {};
  Object.entries(data).forEach(([datestr, dataAboutHour]) => {
    Object.entries(dataAboutHour).forEach(([hour, data]) => {
      const datestrWithHour = `${datestr} ${hour}:00:00`;
      if (dayjs().diff(dayjs(datestrWithHour)) < 0) return;
      dateWithDatestrAndHour[datestrWithHour] = data;
    });
  });
  return dateWithDatestrAndHour;
}

export async function getTrendingData(): Promise<RecentAllTrendingData | null> {
  function uniquify(datas: TrendingItemData[]) {
    // 배열 상 먼저 온 데이터를 더 신뢰한다.
    const unique = new Map<number, TrendingItemData>();
    datas.forEach((data) => {
      if (!unique.has(data.id)) {
        unique.set(data.id, data);
      }
    });
    return Array.from(unique.values());
  }

  const noScrollData = (
    await getDoc(doc(collection(db, "trending"), "recent"))
  ).data() as RecentNoScrollTrendingData | null;

  const scrollData = (
    await getDoc(doc(collection(db, "trending"), "recent-scroll"))
  ).data() as RecentScrollTrendingData | null;

  if (!noScrollData || !scrollData) return null;

  const counts = {
    total: noScrollData.counts.total,
    scrolls: scrollData.counts.scrolls,
    throwing_stars: noScrollData.counts.throwing_stars,
  };

  let costs = [...scrollData.cost, ...noScrollData.cost];
  let total_results = [
    ...scrollData.total_results,
    ...noScrollData.total_results,
  ];

  costs = uniquify(costs)
    .sort((a, b) => a.value - b.value)
    .reverse()
    .slice(0, 10);
  total_results = uniquify(total_results)
    .sort((a, b) => a.value - b.value)
    .reverse()
    .slice(0, 10);

  return {
    date: noScrollData.date ?? scrollData.date,
    counts,
    cost: costs,
    total_results,
  };
}

export async function getTrendingGGData(): Promise<RecentTrendingGGData | null> {
  const data = (
    await getDoc(doc(collection(db, "trending"), "recent-gg"))
  ).data() as RecentTrendingGGData | null;

  if (!data) return null;
  return data;
}

export async function getItemMessageData(
  itemId: string,
  index: number = 0
): Promise<APIMessageData | null> {
  let data: APIMessageData | null = null;
  const q = query(
    collection(db, itemId),
    where("message_batch_index", "==", index)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    if (doc.exists()) {
      data = doc.data() as APIMessageData;
    }
  });

  return data;
}
