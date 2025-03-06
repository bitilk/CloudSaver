import dotenv from "dotenv";

// 加载.env文件
dotenv.config();

interface Channel {
  id: string;
  name: string;
}

interface CloudPatterns {
  baiduPan: RegExp;
  tianyi: RegExp;
  aliyun: RegExp;
  pan115: RegExp;
  pan123: RegExp;
  quark: RegExp;
  yidong: RegExp;
}

interface Config {
  jwtSecret: string;
  telegram: {
    baseUrl: string;
    channels: Channel[];
  };
  cloudPatterns: CloudPatterns;
}

// 从环境变量读取频道配置
const getTeleChannels = (): Channel[] => {
  try {
    const channelsStr = process.env.TELE_CHANNELS;
    if (channelsStr) {
      return JSON.parse(channelsStr);
    }
  } catch (error) {
    console.warn("无法解析 TELE_CHANNELS 环境变量，使用默认配置");
  }

  // 默认配置
  return [
    {
      id: "guaguale115",
      name: "115网盘资源分享",
    },
    {
      id: "hao115",
      name: "115网盘资源分享频道",
    },
    {
      id: "yunpanshare",
      name: "网盘资源收藏(夸克)",
    },
  ];
};

export const config: Config = {
  jwtSecret: process.env.JWT_SECRET || "uV7Y$k92#LkF^q1b!",

  telegram: {
    baseUrl: process.env.TELEGRAM_BASE_URL || "https://t.me/s",
    channels: getTeleChannels(),
  },

  cloudPatterns: {
    baiduPan: /https?:\/\/(?:pan|yun)\.baidu\.com\/[^\s<>"]+/g,
    tianyi: /https?:\/\/cloud\.189\.cn\/[^\s<>"]+/g,
    aliyun: /https?:\/\/\w+\.(?:alipan|aliyundrive)\.com\/[^\s<>"]+/g,
    // pan115有两个域名 115.com 和 anxia.com 和 115cdn.com
    pan115: /https?:\/\/(?:115|anxia|115cdn)\.com\/s\/[^\s<>"]+/g,
    pan123: /https?:\/\/www\.123pan\.com\/s\/[^\s<>"]+/g,
    quark: /https?:\/\/pan\.quark\.cn\/[^\s<>"]+/g,
    yidong: /https?:\/\/yun\.139\.com\/[^\s<>"]+/g,
  },
};
