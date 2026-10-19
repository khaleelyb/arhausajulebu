<template>
  <footer id="contact">
    <div class="mx-auto max-w-screen-xl space-y-6 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-6">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div>
          <div class="flex items-center">
            <img
              width="48"
              height="48"
              class="mr-6 overflow-hidden rounded-md"
              src="/logo.png"
              alt="earth-worm-logo"
            />
            <span class="mt-4 text-3xl">Earthworm</span>
          </div>

          <p class="mt-4 max-w-[20rem] text-base leading-relaxed" dir="rtl">
            انضم إلى مجتمع
            <span
              class="bg-gradient-to-r from-purple-400 via-purple-400 to-gray-400 bg-clip-text text-transparent dark:from-purple-600 dark:to-gray-100 font-bold"
              >Earthworm</span
            >
            لتعلم الإنجليزية بطلاقة!
          </p>

          <ul class="mt-6 flex gap-6 transition">
            <li>
              <a
                href="https://x.com/cui_xiaorui"
                rel="noreferrer"
                target="_blank"
              >
                <span class="sr-only">Twitter</span>
                <UIcon
                  name="i-simple-icons-x"
                  class="icon-link icon-link-gray"
                ></UIcon>
              </a>
            </li>
            <li>
              <a
                href="https://t.me/+dohhXSz-5n1kZDQ1"
                rel="noreferrer"
                target="_blank"
              >
                <UIcon
                  name="i-simple-icons-telegram"
                  class="icon-link icon-link-gray"
                ></UIcon>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/cuixueshe/earthworm"
                rel="noreferrer"
                target="_blank"
              >
                <UIcon
                  name="i-simple-icons-github"
                  class="icon-link icon-link-gray"
                ></UIcon>
              </a>
            </li>
          </ul>
        </div>

        <div class="grid grid-cols-1 gap-6 transition sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4" dir="rtl">
          <div>
            <p class="text-lg font-medium">Earthworm</p>

            <ul class="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="https://github.com/cuixueshe/earthworm"
                  class="hover:opacity-80"
                >
                  المصدر المفتوح
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/cuixueshe/earthworm/issues"
                  class="hover:opacity-80"
                >
                  المشاكل والدعم
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/cuixueshe/earthworm/issues/91"
                  class="hover:opacity-80"
                >
                  المساهمة في التطوير
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p class="text-lg font-medium">المجتمع والتواصل</p>

            <ul class="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="https://t.me/+dohhXSz-5n1kZDQ1"
                  class="hover:opacity-80"
                >
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          <!-- <div>
            <p class="font-medium text-lg">教学</p>

            <ul class="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="https://github.com/cuixueshe/earthworm"
                  class="transition hover:opacity-75"
                >
                  关于我们
                </a>
              </li>
            </ul>
          </div> -->
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.icon-link {
  @apply h-6 w-6 self-start;
}

.icon-link-gray {
  @apply text-gray-500 hover:text-black dark:hover:text-gray-300;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink-cursor {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: rgba(228, 110, 255, 0.75);
  }
}

.typing {
  overflow: hidden;
  border-right: 0.25em solid rgba(228, 110, 255, 0.75);
  white-space: nowrap;
  letter-spacing: 0.15em;
  animation:
    typing 3.5s steps(40, end),
    blink-cursor 0.75s step-end infinite;
}
</style>
