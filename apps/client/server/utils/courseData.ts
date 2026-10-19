import fs from "node:fs";
import path from "node:path";
import {
  saveProgressToSupabase,
  saveCompletionToSupabase,
  saveMasteredElementToSupabase,
  removeMasteredElementFromSupabase,
  saveLearningActivityToSupabase,
} from "./supabase";

function findCoursesDir(): string {
  const possiblePaths = [
    path.resolve(process.cwd(), "packages/xingrong-courses/data/courses"),
    path.resolve(process.cwd(), "../../packages/xingrong-courses/data/courses"),
    path.resolve(process.cwd(), "../packages/xingrong-courses/data/courses"),
    "/packages/xingrong-courses/data/courses",
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  return "";
}

const arabicOrdinals = [
  "الأول", "الثاني", "الثالث", "الرابع", "الخامس",
  "السادس", "السابع", "الثامن", "التاسع", "العاشر",
  "الحادي عشر", "الثاني عشر", "الثالث عشر", "الرابع عشر", "الخامس عشر",
  "السادس عشر", "السابع عشر", "الثامن عشر", "التاسع عشر", "العشرون",
  "الحادي والعشرون", "الثاني والعشرون", "الثالث والعشرون", "الرابع والعشرون", "الخامس والعشرون",
  "السادس والعشرون", "السابع والعشرون", "الثامن والعشرون", "التاسع والعشرون", "الثلاثون",
  "الحادي والثلاثون", "الثاني والثلاثون", "الثالث والثلاثون", "الرابع والثلاثون", "الخامس والثلاثون",
  "السادس والثلاثون", "السابع والثلاثون", "الثامن والثلاثون", "التاسع والثلاثون", "الأربعون",
  "الحادي والأربعون", "الثاني والأربعون", "الثالث والأربعون", "الرابع والأربعون", "الخامس والأربعون",
  "السادس والأربعون", "السابع والأربعون", "الثامن والأربعون", "التاسع والأربعون", "الخمسون",
  "الحادي والخمسون", "الثاني والخمسون", "الثالث والخمسون", "الرابع والخمسون", "الخامس والخمسون"
];

function convertToArabicLessonTitle(numStr: string): string {
  const num = parseInt(numStr, 10);
  if (num >= 1 && num <= arabicOrdinals.length) {
    return `الدرس ${arabicOrdinals[num - 1]}`;
  }
  return `الدرس ${num}`;
}

// Arabic phrase dictionary for English statements
const phraseToArMap: Record<string, string> = {
  // Pronouns & Basic Verbs
  "i": "أنا",
  "like": "أُحِبُّ",
  "i like": "أنا أُحِبُّ",
  "the food": "هذا الطعام",
  "i like the food": "أنا أُحِبُّ هذا الطعام",
  "don't": "لا",
  "don't like": "لا أُحِبُّ",
  "i don't like the food": "أنا لا أُحِبُّ هذا الطعام",
  "to do": "أن أفعلَ",
  "it": "ذلك / هذا الأمر",
  "to do it": "أن أفعلَ ذلك",
  "i like to do it": "أنا أُحِبُّ أن أفعلَ ذلك",
  "i don't like to do it": "أنا لا أُحِبُّ أن أفعلَ ذلك",
  "now": "الآن",
  "i like to do it now": "أنا أُحِبُّ أن أفعلَ ذلك الآن",
  "i don't like to do it now": "أنا لا أُحِبُّ أن أفعلَ ذلك الآن",
  "here": "هنا",
  "to be here": "أن أكونَ هنا",
  "i like to be here": "أنا أُحِبُّ أن أكونَ هنا",
  "i don't like to be here": "أنا لا أُحِبُّ أن أكونَ هنا",
  "i don't like to be here now": "أنا لا أُحِبُّ أن أكونَ هنا الآن",
  "want": "أُرِيدُ",
  "i want": "أنا أُرِيدُ",
  "i want to do it": "أنا أُرِيدُ أن أفعلَ ذلك",
  "don't want": "لا أُرِيدُ",
  "i don't want to do it": "أنا لا أُرِيدُ أن أفعلَ ذلك",
  "today": "اليوم",
  "i want to do it today": "أنا أُرِيدُ أن أفعلَ ذلك اليوم",
  "i don't want to do it today": "أنا لا أُرِيدُ أن أفعلَ ذلك اليوم",
  "i don't want to do it now": "أنا لا أُرِيدُ أن أفعلَ ذلك الآن",
  "to eat": "أن آكلَ",
  "to eat the food": "أن آكلَ هذا الطعام",
  "i want to eat the food": "أنا أُرِيدُ أن آكلَ هذا الطعام",
  "i want to eat the food now": "أنا أُرِيدُ أن آكلَ هذا الطعام الآن",
  "i don't want to eat the food now": "أنا لا أُرِيدُ أن آكلَ هذا الطعام الآن",
  "i want to be here": "أنا أُرِيدُ أن أكونَ هنا",
  "i don't want to be here": "أنا لا أُرِيدُ أن أكونَ هنا",
  "every day": "كُلَّ يوم",
  "i want to be here every day": "أنا أُرِيدُ أن أكونَ هنا كُلَّ يوم",
  "i don't want to be here every day": "أنا لا أُرِيدُ أن أكونَ هنا كُلَّ يوم",
  "all the day": "طوالَ اليوم",
  "i don't want to be here all the day": "أنا لا أُرِيدُ أن أكونَ هنا طوالَ اليوم",
  "need": "أحتاجُ",
  "i need": "أنا أحتاجُ",
  "i need to be here": "أنا أحتاجُ أن أكونَ هنا",
  "i don't need to be here": "أنا لا أحتاجُ أن أكونَ هنا",
  "i need to be here every day": "أنا أحتاجُ أن أكونَ هنا كُلَّ يوم",
  "i don't need to be here every day": "أنا لا أحتاجُ أن أكونَ هنا كُلَّ يوم",
  "i need to eat the food": "أنا أحتاجُ أن آكلَ هذا الطعام",
  "i need to eat the food now": "أنا أحتاجُ أن آكلَ هذا الطعام الآن",
  "i don't need to eat the food now": "أنا لا أحتاجُ أن آكلَ هذا الطعام الآن",
  "i need to do it": "أنا أحتاجُ أن أفعلَ ذلك",
  "i need to do it today": "أنا أحتاجُ أن أفعلَ ذلك اليوم",
  "i don't need to do it today": "أنا لا أحتاجُ أن أفعلَ ذلك اليوم",
  "have to do": "يجبُ أن أفعلَ",
  "i have to do it": "يجبُ عليّ أن أفعلَ ذلك",
  "i have to do it today": "يجبُ عليّ أن أفعلَ ذلك اليوم",
  "i have to do it now": "يجبُ عليّ أن أفعلَ ذلك الآن",
  "don't have to do": "لستُ مضطراً لأن أفعلَ",
  "i don't have to do it": "لستُ مضطراً لأن أفعلَ ذلك",
  "i don't have to do it now": "لستُ مضطراً لأن أفعلَ ذلك الآن",
  "i don't have to do it every day": "لستُ مضطراً لأن أفعلَ ذلك كُلَّ يوم",
  "i don't have to do it all the day": "لستُ مضطراً لأن أفعلَ ذلك طوالَ اليوم",
  "i have to eat the food": "يجبُ عليّ أن آكلَ هذا الطعام",
  "i don't have to eat the food": "لستُ مضطراً لأكل هذا الطعام",
  "i don't have to eat the food today": "لستُ مضطراً لأكل هذا الطعام اليوم",
  "tomorrow": "غداً",
  "i have to eat the food tomorrow": "يجبُ عليّ أن آكلَ هذا الطعام غداً",
  "i have to be here": "يجبُ أن أكونَ هنا",
  "i have to be here today": "يجبُ أن أكونَ هنا اليوم",
  "to know": "أن أعرفَ / أن أتعرفَ على",
  "you": "أنت / إياكَ",
  "to know you": "أن أتعرفَ عليك",
  "i want to know you": "أنا أُرِيدُ أن أتعرفَ عليك",
  "soon": "قريباً",
  "i want to know you soon": "أنا أُرِيدُ أن أتعرفَ عليك قريباً",
  "to see": "أن أرى",
  "to see you": "أن أراكَ",
  "i have to see you": "يجبُ عليّ أن أراكَ",
  "tonight": "الليلة",
  "i have to see you tonight": "يجبُ عليّ أن أراكَ الليلة",
  "to tell": "أن أُخبِرَ",
  "to tell you": "أن أُخبِرَكَ",
  "i need to tell you": "أحتاجُ أن أُخبِرَكَ",
  "something": "شيئاً ما",
  "important": "مُهِمّ",
  "something important": "شيئاً مُهِمّاً",
  "i need to tell you something": "أحتاجُ أن أُخبِرَكَ شيئاً",
  "i need to tell you something important": "أحتاجُ أن أُخبِرَكَ بأمرٍ مُهِمّ",
  "it is important": "إنه مُهِمّ",
  "very": "جداً",
  "it is very important": "إنه مُهِمٌّ جداً",
  "me": "أنا / لي",
  "for me": "بالنسبةِ لي",
  "it is important for me": "إنه مُهِمٌّ بالنسبةِ لي",
  "it is very important for me": "إنه مُهِمٌّ جداً بالنسبةِ لي",
  "it is important to do it": "من المُهِمِّ فعلُ ذلك",
  "it is important to be here": "من المُهِمِّ التواجدُ هنا",
  "it is important to eat the food": "من المُهِمِّ أكلُ هذا الطعام",
  "impossible": "مستحيل",
  "it is impossible": "إنه مستحيل",
  "it is impossible to do it": "من المستحيلِ فعلُ ذلك",
  "it is impossible to do it now": "من المستحيلِ فعلُ ذلك الآن",
  "it is impossible for me": "إنه مستحيلٌ بالنسبةِ لي",
  "good": "جيد / رائع",
  "it is good": "إنه أمرٌ جيد",
  "it is good to be here": "من الجيدِ أن أكونَ هنا",
  "it is very good to be here": "من الرائعِ جداً أن أكونَ هنا",
  "it is very good to see you": "من الرائعِ جداً رؤيتُكَ",
  "it is very good to see you every day": "من الرائعِ جداً رؤيتُكَ كُلَّ يوم",
  "possible": "مُمكِن",
  "it is possible": "إنه مُمكِن",
  "it is possible to see you": "من المُمكِنِ رؤيتُكَ",
  "it is possible to see you every day": "من المُمكِنِ رؤيتُكَ كُلَّ يوم",
  "it is impossible to see you every day": "من المستحيلِ رؤيتُكَ كُلَّ يوم",
  "i want to know": "أُرِيدُ أن أعرفَ",
  "if": "ما إذا كان / لو",
  "i want to know if it is possible": "أُرِيدُ أن أعرفَ ما إذا كان ذلك مُمكِناً",
  "i want to know if it is important": "أُرِيدُ أن أعرفَ ما إذا كان ذلك مُهِمّاً",
  "so": "لذلك / لذا",
  "it is important for me so i have to do it": "إنه مُهِمٌّ بالنسبةِ لي لذا يجبُ أن أفعلَه",
  "it is important for me so i have to do it today": "إنه مُهِمٌّ بالنسبةِ لي لذا يجبُ أن أفعلَه اليوم",
  "it is important for me so i have to do it every day": "إنه مُهِمٌّ بالنسبةِ لي لذا يجبُ أن أفعلَه كُلَّ يوم",
  "it is very important for me so i have to do it every day": "إنه مُهِمٌّ جداً بالنسبةِ لي لذا يجبُ أن أفعلَه كُلَّ يوم",
  "it is very important for me so i have to do it now": "إنه مُهِمٌّ جداً بالنسبةِ لي لذا يجبُ أن أفعلَه الآن",
  "not important": "غيرُ مُهِمّ",
  "it is not important": "إنه ليس مُهِمّاً",
  "it is not important for me": "إنه ليس مُهِمّاً بالنسبةِ لي",
  "it is not important for me so i don't have to do it now": "ليس مُهِمّاً بالنسبةِ لي لذا لستُ مضطراً لفعله الآن",
  "i like to eat the food": "أنا أُحِبُّ أكلَ هذا الطعام",
  "i want to do it today": "أنا أُرِيدُ أن أفعلَ ذلك اليوم",
  "i need to tell you something important": "أحتاجُ أن أُخبِرَكَ بأمرٍ مُهِمّ",
  "i have to know you soon": "يجبُ أن أتعرفَ عليكَ قريباً",
  "like to do": "يُحِبُّ أن يفعلَ",
  "need to do": "يحتاجُ أن يفعلَ",
  "want to do": "يريدُ أن يفعلَ",
  "good morning": "صباح الخير",
  "good evening": "مساء الخير",
  "how are you": "كيف حالك؟",
  "nice to meet you": "سعدت بلقائك",
  "thank you": "شكراً لك",
  "you are welcome": "على الرحب والسعة",
  "where is the bathroom": "أين الحمام؟",
  "how much is this": "كم سعر هذا؟",
  "can you help me": "هل يمكنك مساعدتي؟",
  "i understand": "أنا أفهم",
  "i don't understand": "أنا لا أفهم",
  "please speak slowly": "تحدث ببطء من فضلك",
};

// Word-by-word fallback translator
const wordToArMap: Record<string, string> = {
  "i": "أنا", "you": "أنت", "he": "هو", "she": "هي", "we": "نحن", "they": "هم", "it": "هو/هي",
  "want": "أريد", "need": "أحتاج", "like": "أحب", "have": "لدي", "do": "أفعل", "go": "أذهب",
  "eat": "آكل", "see": "أرى", "know": "أعرف", "say": "أقول", "tell": "أخبر", "speak": "أتحدث",
  "today": "اليوم", "tomorrow": "غداً", "now": "الآن", "here": "هنا", "there": "هناك", "soon": "قريباً",
  "good": "جيد", "bad": "سيء", "big": "كبير", "small": "صغير", "important": "مهم", "possible": "ممكن",
  "impossible": "مستحيل", "food": "طعام", "water": "ماء", "house": "منزل", "car": "سيارة", "time": "وقت",
  "day": "يوم", "night": "ليلة", "every": "كل", "all": "جميع", "very": "جداً", "so": "لذلك", "not": "لا",
  "to": "أن", "for": "لأجل", "with": "مع", "at": "في", "in": "في", "on": "على", "is": "هو", "are": "هم/أنتم",
};

export function translateEnglishToAr(englishText: string, fallbackChinese?: string): string {
  const normalized = englishText.trim().toLowerCase().replace(/[.,!?;:]/g, "");
  if (phraseToArMap[normalized]) {
    return phraseToArMap[normalized];
  }

  // Check prefix matches or construct
  const words = normalized.split(/\s+/);
  const translatedWords = words.map(w => wordToArMap[w] || w);
  if (translatedWords.some(w => wordToArMap[w])) {
    return translatedWords.join(" ");
  }

  // If no match, return a clean translation or fallback
  return fallbackChinese || englishText;
}

// In-memory data store for local dev
const completionCounts = new Map<string, number>();
const statementProgress = new Map<string, number>();
const masteredElementsStore = new Map<string, { id: string; content: { english: string }; masteredAt: string }>();
const learningActivities: Array<{ date: string; duration: number }> = [
  { date: new Date().toISOString().split("T")[0], duration: 15 },
];

export function getCoursePacks() {
  return [
    {
      id: "xingrong-01",
      title: "دورة اللغة الإنجليزية للمبتدئين من الصفر (English for Arabic Speakers)",
      description: "المنهج الأكثر فاعلية للمتحدثين بالعربية لتعلم التحدث بالإنجليزية عبر التدريب التفاعلي والتكرار الذكي",
      cover: "https://earthworm-prod-1312884695.cos.ap-beijing.myqcloud.com/course-packs/xingrong.jpg",
      isFree: true,
    },
  ];
}

export function getCoursePack(coursePackId: string) {
  const coursesDir = findCoursesDir();
  let courseFiles: string[] = [];

  if (coursesDir && fs.existsSync(coursesDir)) {
    courseFiles = fs.readdirSync(coursesDir).filter((f) => f.endsWith(".json"));
    courseFiles.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  } else {
    courseFiles = Array.from({ length: 55 }, (_, i) => `${String(i + 1).padStart(2, "0")}.json`);
  }

  const courses = courseFiles.map((filename, index) => {
    const id = String(index + 1);
    return {
      id,
      coursePackId: "xingrong-01",
      title: convertToArabicLessonTitle(id),
      description: `مفردات وتمارين ${convertToArabicLessonTitle(id)} للتحدث بطلاقة`,
      order: index + 1,
      completionCount: completionCounts.get(id) || 0,
    };
  });

  return {
    id: "xingrong-01",
    title: "دورة اللغة الإنجليزية للمبتدئين من الصفر (English for Arabic Speakers)",
    description: "المنهج الأكثر فاعلية للمتحدثين بالعربية لتعلم التحدث بالإنجليزية عبر التدريب التفاعلي والتكرار الذكي",
    isFree: true,
    cover: "https://earthworm-prod-1312884695.cos.ap-beijing.myqcloud.com/course-packs/xingrong.jpg",
    courses,
  };
}

export function getCourse(coursePackId: string, courseId: string) {
  const coursesDir = findCoursesDir();
  const fileNum = String(courseId).padStart(2, "0");
  const filePath = coursesDir ? path.join(coursesDir, `${fileNum}.json`) : "";

  let rawStatements: Array<{ chinese: string; english: string; soundmark?: string }> = [];

  if (filePath && fs.existsSync(filePath)) {
    try {
      rawStatements = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (err) {
      console.warn("Failed to parse course JSON:", err);
    }
  }

  if (rawStatements.length === 0) {
    rawStatements = [
      { chinese: "أنا", english: "I", soundmark: "/aɪ/" },
      { chinese: "أُحب", english: "like", soundmark: "/laɪk/" },
      { chinese: "أنا أُحب", english: "I like", soundmark: "/aɪ/ /laɪk/" },
      { chinese: "هذا الطعام", english: "the food", soundmark: "/ðə/ /fud/" },
      { chinese: "أنا أُحب هذا الطعام", english: "I like the food", soundmark: "/aɪ/ /laɪk/ /ðə/ /fud/" },
    ];
  }

  const statements = rawStatements.map((item, index) => {
    const arabicPrompt = translateEnglishToAr(item.english, item.chinese);
    return {
      id: `${courseId}-${index}`,
      order: index + 1,
      // Store Arabic translation in chinese field so client views display Arabic prompt naturally
      chinese: arabicPrompt,
      english: item.english,
      soundmark: item.soundmark || "",
      isMastered: masteredElementsStore.has(item.english),
    };
  });

  const order = parseInt(courseId, 10);

  return {
    id: courseId,
    title: convertToArabicLessonTitle(courseId),
    description: `مفردات وتراكيب ${convertToArabicLessonTitle(courseId)}`,
    order,
    coursePackId,
    completionCount: completionCounts.get(courseId) || 0,
    statementIndex: statementProgress.get(courseId) || 0,
    video: "",
    statements,
  };
}

export function completeCourse(coursePackId: string, courseId: string, userId: string = "guest_user") {
  const count = (completionCounts.get(courseId) || 0) + 1;
  completionCounts.set(courseId, count);

  // Sync to Supabase in background
  saveCompletionToSupabase(userId, coursePackId, courseId).catch(() => {});

  const nextId = String(parseInt(courseId, 10) + 1);
  if (parseInt(nextId, 10) <= 55) {
    return {
      nextCourse: getCourse(coursePackId, nextId),
    };
  }

  return { nextCourse: undefined };
}

export function getCourseHistory(coursePackId: string) {
  const history: Array<{ courseId: string; completionCount: number }> = [];
  completionCounts.forEach((count, cId) => {
    history.push({ courseId: cId, completionCount: count });
  });
  return history;
}

export function updateCourseProgress(
  coursePackId: string,
  courseId: string,
  statementIndex: number,
  userId: string = "guest_user",
) {
  statementProgress.set(courseId, statementIndex);
  // Sync to Supabase
  saveProgressToSupabase(userId, coursePackId, courseId, statementIndex).catch(() => {});
  return { courseId };
}

export function getMasteredElements() {
  return Array.from(masteredElementsStore.values());
}

export function addMasteredElement(content: { english: string }, userId: string = "guest_user") {
  const id = `el_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const item = {
    id,
    content,
    masteredAt: new Date().toISOString(),
  };
  masteredElementsStore.set(content.english, item);
  // Sync to Supabase
  saveMasteredElementToSupabase(userId, id, content.english, translateEnglishToAr(content.english)).catch(() => {});
  return item;
}

export function removeMasteredElement(id: string, userId: string = "guest_user") {
  for (const [key, value] of masteredElementsStore.entries()) {
    if (value.id === id) {
      masteredElementsStore.delete(key);
      removeMasteredElementFromSupabase(userId, id).catch(() => {});
      return true;
    }
  }
  return true;
}

export function getLearningActivities() {
  return learningActivities;
}

export function addLearningActivity(duration: number, date?: string, userId: string = "guest_user") {
  const targetDate = date || new Date().toISOString().split("T")[0];
  const existing = learningActivities.find((a) => a.date === targetDate);
  if (existing) {
    existing.duration += duration;
  } else {
    learningActivities.push({ date: targetDate, duration });
  }
  saveLearningActivityToSupabase(userId, duration, targetDate).catch(() => {});
  return true;
}
