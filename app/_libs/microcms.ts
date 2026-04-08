import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent
} from "microcms-js-sdk";

export type Member = {
  name: string;
  position: string;
  profile: string;
  image: MicroCMSImage;
} & MicroCMSListContent;

export type Category = {
  name: string;
} & MicroCMSListContent;

export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

// エラー
if(!process.env.MICROCMS_SERVICE_DOMAIN){
  throw new Error("MICROCMS_SERVICE_DOMAIN is required.");
}

if(!process.env.MICROCMS_API_KEY){
  throw new Error("MICROCMS__API_KEY is required.");
}

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// メンバー一覧
export const getMembersList = async (queries?: MicroCMSQueries) => {
  const memberListData = await client.getList<Member>({
    endpoint: "members",
    queries,
  });
  return memberListData;
};

// ニュース一覧
export const getNewsList = async (queries?: MicroCMSQueries) => {
  const newsListData = await client.getList<News>({
    endpoint: "news",
    queries,
  });
  return newsListData;
};

// ニュース詳細
export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const newsDetailData = await client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries,
  });
  return newsDetailData;
}

// カテゴリー
export const getCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const ctgDetailData = await client.getListDetail<Category>({
    endpoint: "categories",
    contentId,
    queries,
  });
  return ctgDetailData;
}