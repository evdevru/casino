<template>
  <div class="sidebar" :class="{ 'sidebar--active': active }">
    <div class="sidebar__body">
      <div class="sidebar__header">
        <button class="sidebar__close" @click="$emit('close')">
          <svg class="w-full h-full">
            <use xlink:href="/img/icon/free/sprite.svg#close"></use>
          </svg>
        </button>
        <h1 class="sidebar__title">МЕНЮ</h1>
        <nav class="sidebar__nav">
          <nuxt-link
            :to="{ name: 'help' }"
            class="sidebar__link"
            :exact-active-class="`sidebar__link--active`"
            >Помощь</nuxt-link
          >
          <nuxt-link
            :to="{ name: 'free-coins' }"
            class="sidebar__link"
            :exact-active-class="`sidebar__link--active`"
            >Бесплатные монеты</nuxt-link
          >
        </nav>
      </div>
      <div class="sidebar__footer">
        <app-language-switcher :short="false" />
        <hr class="my-4 divider" />
        <div class="flex items-center">
          <div class="flex items-center space-x-3">
            <a href="#">
              <TelegramIcon class="w-auto h-6" />
            </a>
            <a href="#">
              <VkIcon class="w-auto h-8" />
            </a>
          </div>
          <div class="flex items-end justify-end flex-1">
            <button>
              <DarkIcon v-if="true" class="w-auto h-8" />
              <LightIcon v-else class="w-auto h-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appLanguageSwitcher from '@/components/ui/app-language-switcher.vue'
import TelegramIcon from '@/static/img/icon/social/telegram.svg?inline'
import VkIcon from '@/static/img/icon/social/vk.svg?inline'
import DarkIcon from '@/static/img/icon/mode-dark.svg?inline'
import LightIcon from '@/static/img/icon/mode-light.svg?inline'
export default {
  components: {
    appLanguageSwitcher,
    TelegramIcon,
    VkIcon,
    DarkIcon,
    LightIcon,
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  transition: all 0.3s;
  width: 100vw;
  height: 100vh;
  display: flex;
  visibility: hidden;
  background: rgba(0, 0, 0, 0.05);

  @apply z-40;

  &--active {
    visibility: visible;
  }

  &__body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #ffffff;
    transition: all 0.3s;
    transform: translateX(-100%);
  }

  &--active &__body {
    transform: translateX(0);
  }

  &__close {
    @apply w-4 h-4 absolute transition duration-300 top-8 right-8 opacity-30 hover:opacity-100;
  }

  &__header {
    @apply p-8 bg-white flex-1 relative;
  }

  &__title {
    font-weight: 900;
    font-size: 20px;
    @apply mb-4 leading-none;
  }

  &__nav {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    margin-bottom: 1.5rem;
  }

  &__link {
    transition: color 0.3s;
    font-weight: 600;
    padding: 0.25rem 0;
    @apply whitespace-nowrap;

    &--active,
    &:hover {
      @apply text-primary;
    }
  }

  &__footer {
    @apply bg-cream p-8 mt-auto;
  }
}
</style>
