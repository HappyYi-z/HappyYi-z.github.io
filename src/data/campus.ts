export type CampusPhotoCategory = "海滨与湖光" | "建筑与光影" | "校园四季";

export interface CampusPhoto {
  id: string;
  title: string;
  location: string;
  category: CampusPhotoCategory;
  src: string;
  alt: string;
  caption: string;
  takenAt?: string;
  aspect: "wide" | "landscape" | "portrait";
  /**
   * 替换为你自己拍摄的实拍照片后，将 isSample 改为 false（或删除该字段），
   * 画面上的“意境预览”角标会自动隐藏。
   */
  isSample?: boolean;
}

export interface MottoItem {
  term: string;
  pinyin: string;
  classicLine: string;
  meaning: string;
}

export interface CampusLandmark {
  name: string;
  englishName: string;
  area: string;
  note: string;
}

/**
 * 中山大学校园页数据配置文件
 *
 * 【后续上传实拍风景照步骤】
 * 1. 将照片放入 public/images/campus/ 目录（支持 .jpg / .png / .webp）
 * 2. 修改下方 heroPhoto 或 photos 数组中的 src、title、location、caption、takenAt
 * 3. 将 isSample 改为 false，提交并 git push 即可自动上线
 */
export const campusData = {
  universityCn: "中山大学",
  universityEn: "Sun Yat-sen University",
  campusCn: "珠海校区",
  campusEn: "Zhuhai Campus",
  foundedYear: "1924",
  address: "广东省珠海市香洲区唐家湾镇大学路 2 号",
  coordinates: "22°21'08\"N, 113°35'01\"E",
  officialUrl: "https://www.sysu.edu.cn/",
  brandColorName: "中大绿",
  brandColorHex: "#00561F",
  intro:
    "依山傍海，位于南海之滨的唐家湾。这里记录着中山大学的百年文脉、校园地标，以及日常走过的山海与四季光影。",

  heroPhoto: {
    src: "/images/campus/hero-sysu.jpg",
    alt: "中山大学校园建筑与南国绿荫海滨意境图",
    caption: "山海之间，绿荫长廊与午后日光",
    location: "中山大学 · 珠海校区",
    isSample: true,
  },

  mottoSource: "1924 年 11 月 11 日，孙中山先生亲笔题写，出自《礼记·中庸》",
  mottoItems: [
    {
      term: "博学",
      pinyin: "Bó Xué",
      classicLine: "博学之。有弗学，学之弗能，弗措也。",
      meaning: "广泛涉猎、融会贯通，不为单一学科所局限，建立开阔的知识版图。",
    },
    {
      term: "审问",
      pinyin: "Shěn Wèn",
      classicLine: "审问之。有弗问，问之弗知，弗措也。",
      meaning: "保持好奇与怀疑精神，对既有结论追问边界、求证事实。",
    },
    {
      term: "慎思",
      pinyin: "Shèn Sī",
      classicLine: "慎思之。有弗思，思之弗得，弗措也。",
      meaning: "审慎推理、独立思考，在复杂现象中理清逻辑与因果结构。",
    },
    {
      term: "明辨",
      pinyin: "Míng Biàn",
      classicLine: "明辨之。有弗辨，辨之弗明，弗措也。",
      meaning: "明晰是非、权衡取舍，在多元观点与方案之间作出清晰判断。",
    },
    {
      term: "笃行",
      pinyin: "Dǔ Xíng",
      classicLine: "笃行之。有弗行，行之弗笃，弗措也。",
      meaning: "知行合一、踏实落地，将所思所辨转化为长期持续的实践。",
    },
  ] as MottoItem[],

  photos: [
    {
      id: "zhuhai-coast",
      title: "唐家湾晨海",
      location: "若海 · 珠海校区海滨",
      category: "海滨与湖光",
      src: "/images/campus/zhuhai-coast.jpg",
      alt: "唐家湾清晨海滨步道与远山薄雾意境图",
      caption: "清晨海面微澜与远山雾气，校园向外延伸出的开阔海岸线。",
      takenAt: "意境预览",
      aspect: "landscape",
      isSample: true,
    },
    {
      id: "campus-library",
      title: "暮色灯火与湖影",
      location: "珠海校区图书馆 · 隐湖畔",
      category: "建筑与光影",
      src: "/images/campus/campus-library.jpg",
      alt: "暮色中亮起暖光的现代大学图书馆与湖面倒影意境图",
      caption: "蓝调时刻的玻璃幕墙与湖面静影，安静自习到夜幕降临。",
      takenAt: "意境预览",
      aspect: "portrait",
      isSample: true,
    },
    {
      id: "lingnan-garden",
      title: "雨后岭南绿荫",
      location: "涵碧园 · 校园庭院",
      category: "校园四季",
      src: "/images/campus/lingnan-garden.jpg",
      alt: "雨后苍翠的岭南庭院榕树与石径意境图",
      caption: "一场南国阵雨过后，深绿枝叶与石径间透出的清润空气。",
      takenAt: "意境预览",
      aspect: "landscape",
      isSample: true,
    },
  ] as CampusPhoto[],

  landmarks: [
    {
      name: "若海",
      englishName: "Ruohai",
      area: "海岸与湖景带",
      note: "依傍南海之滨的开阔水景，傍晚海风与落日余晖交汇之处。",
    },
    {
      name: "隐湖",
      englishName: "Yinhu Lake",
      area: "校园中心水系",
      note: "藏于绿荫与建筑群之间的静谧湖泊，倒映着四季天色与灯影。",
    },
    {
      name: "涵碧园",
      englishName: "Hanbi Garden",
      area: "岭南园林景观",
      note: "融岭南造园意趣与校园绿意于一体，曲径清幽、草木葱茏。",
    },
    {
      name: "天琴中心",
      englishName: "TianQin Center",
      area: "前沿科研地标",
      note: "空间引力波探测“天琴计划”重要研究平台，见证深空探索的理性浪漫。",
    },
    {
      name: "珠海校区图书馆",
      englishName: "Zhuhai Campus Library",
      area: "学术与自习核心",
      note: "现代通透的阅读与藏书空间，连接全校文献资源，是日常思考与阅读的港湾。",
    },
  ] as CampusLandmark[],
};
