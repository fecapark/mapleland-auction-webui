import { StatisticsData } from "@/server/actions";

export interface IModalContent {
  title: string;
  content: React.ReactNode;
}

export interface IRecentPriceData {
  recentDate: string | null;
  prevDate: string | null;
  recentData: StatisticsData | null;
  prevData: StatisticsData | null;
}
