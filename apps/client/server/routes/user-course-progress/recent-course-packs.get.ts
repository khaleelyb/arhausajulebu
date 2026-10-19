import { defineEventHandler } from "h3";

export default defineEventHandler(() => {
  return [
    {
      id: 1,
      coursePackId: "xingrong-01",
      courseId: "1",
      title: "دورة اللغة الإنجليزية للمبتدئين من الصفر",
      description: "المنهج الأكثر فاعلية للمتحدثين بالعربية لتعلم التحدث بالإنجليزية",
      cover: "https://earthworm-prod-1312884695.cos.ap-beijing.myqcloud.com/course-packs/xingrong.jpg",
      isFree: true,
    },
  ];
});
