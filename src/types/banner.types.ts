import {PromotionProps} from "@/types/promotion.types";

export interface BannerProps {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  dateFrom: string;
  expirationAt: string;
  targetUrl?: string;
  products?: number[];
  promotion?: PromotionProps;
  advertisement: {
    erid: string,
    inn: string,
    advertiser: string,
  }
}