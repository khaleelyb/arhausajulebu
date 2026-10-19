<template>
  <section
    class="body-font overflow-hidden pt-24 text-gray-600"
    id="faq"
  >
    <CommonTitle
      title="الأسئلة الشائعة"
      :description="['إجابات على أكثر الأسئلة شيوعاً حول كيفية استخدام التطبيق والاستفادة القصوى منه']"
    />
    <div class="divide-y divide-gray-100 py-16 dark:divide-gray-800" dir="rtl">
      <template
        v-for="(qsItem, qsIndex) in QUESTIONS"
        :key="qsIndex"
      >
        <details
          class="group"
          :open="qsIndex === 0"
        >
          <summary class="flex cursor-pointer items-center justify-between py-5">
            <h2 class="text-base font-medium text-black dark:text-gray-300 lg:text-lg">
              {{ qsItem.title }}
            </h2>
            <UIcon
              name="i-ph-caret-left-bold"
              class="icon h-6 w-6 text-purple-500"
            ></UIcon>
          </summary>
          <div
            class="transition-max-height mb-4 overflow-hidden duration-500 ease-in-out dark:text-gray-400"
          >
            <template
              v-for="(asItem, asIndex) in qsItem.content"
              :key="`content-${asIndex}`"
            >
              <p class="py-2 text-sm lg:text-base leading-relaxed">
                <span v-if="qsItem.content.length > 1">{{ asIndex + 1 }}. </span>
                {{ asItem }}
              </p>
            </template>
          </div>
        </details>
      </template>
    </div>
  </section>
  <CommonDivider />
</template>

<script setup lang="ts">
const QUESTIONS = [
  {
    title: "كيف يساعدني التطبيق على التحدث بالإنجليزية بطلاقة؟",
    content: [
      "يعتمد Earthworm على أسلوب الترجمة التفاعلية وبناء الجمل الكاملة بدلاً من مجرد حفظ كلمات منفصلة. تكرار كتابة الجمل والاستماع إليها يبني في ذهنك وعضلات أصابعك ردود فعل سريعة للتحدث والتعبير.",
    ],
  },
  {
    title: "هل التطبيق مناسب للمبتدئين من الصفر؟",
    content: [
      "نعم، صُممت الدروس من مستوى الصفر المطلق مع الضمائر والأفعال البسيطة، ثم تتدرج تدريجياً وبطريقة ذكية بدون أي تعقيد أو مصطلحات قواعد مبهمة.",
    ],
  },
  {
    title: "كيف يتم تخزين تقدمي التعليمي؟",
    content: [
      "يدعم التطبيق التخزين السحابي الآمن عبر Supabase، مما يحفظ درجاتك والدروس المكتملة وقائمة الكلمات المتقنة عبر جميع جلساتك.",
    ],
  },
  {
    title: "ما هي اختصارات لوحة المفاتيح المفيدة أثناء التمرين؟",
    content: [
      "مفتاح (Enter ⏎) للانتقال المباشر إلى السؤال أو الدرس التالي.",
      "مفتاح المسافة (Space) لإعادة الاستماع للنطق الصوتي.",
      "مفتاح (Esc) لإغلاق النوافذ المنبثقة ولوحة المتصدرين بسرعة.",
    ],
  },
];
</script>

<style scoped>
.icon {
  transition: transform 0.5s ease;
}

details[open] .icon {
  transform: rotate(-90deg);
}

.transition-max-height {
  max-height: 0;
  transition: max-height 0.5s ease-in-out;
}

details[open] .transition-max-height {
  max-height: 500px;
}
</style>
