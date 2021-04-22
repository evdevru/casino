<template>
  <header class="header">
    <div
      class="container flex flex-wrap items-center h-16 space-x-3 md:space-x-8"
    >
      <nuxt-link
        :to="{ name: 'index' }"
        class="header__link header__link--logo"
        exact-active-class="header__link--active"
      >
        <img src="/logo.svg" class="w-auto h-2/3" alt="" />
      </nuxt-link>
      <app-language-switcher class="hidden xl:block" />
      <div class="flex-1 md:hidden !ml-0">
        <t-button
          class="header__burger"
          variant="white"
          @click="activeMenu = !activeMenu"
        >
          <div class="flex items-center justify-center w-full">
            <img src="/img/icon/menu.svg" class="w-3 mr-2" alt="" />
            <div>{{ $t('menu') }}</div>
          </div>
        </t-button>
      </div>
      <nav class="header__nav">
        <nuxt-link
          :to="{ name: 'help' }"
          class="header__link"
          :exact-active-class="`header__link--active`"
          >{{ $t('help') }}</nuxt-link
        >
        <nuxt-link
          :to="{ name: 'bonus' }"
          class="header__link"
          :exact-active-class="`header__link--active`"
          >{{ $t('bonus') }}</nuxt-link
        >
      </nav>
      <user-balance class="hidden sm:flex" />
      <nuxt-link
        v-if="$auth.loggedIn"
        v-tooltip="$t('profile-edit')"
        :to="{ name: 'profile' }"
        class="flex items-center justify-end flex-1 md:flex-none"
      >
        <div class="relative w-10 cursor-pointer">
          <img
            :src="$auth.user.avatar"
            :alt="$auth.user.username"
            class="w-10 w-full h-10 rounded-full"
          />
          <button
            class="absolute top-0 right-0 transition-all transform translate-x-1 -translate-y-1 rounded-md bg-cream hover:bg-primary"
            type="button"
          >
            <EditIcon />
          </button>
        </div>
        <div class="flex flex-col flex-wrap ml-3 text-xs font-semibold">
          <template v-if="$auth.user.first_name || $auth.user.last_name">
            <span>{{ $auth.user.first_name }}</span>
            <span>{{ $auth.user.last_name }}</span>
          </template>
          <template v-else-if="$auth.user.username">
            <span>{{ $auth.user.username }}</span>
          </template>
          <template v-else>
            <span>{{ $t('profile-you') }}</span>
          </template>
        </div>
      </nuxt-link>
      <t-button
        v-if="$auth.loggedIn"
        v-tooltip="$t('profile-exit')"
        class="!px-2 w-primary"
        variant="white"
        @click="$auth.logout()"
      >
        <LogoutIcon />
      </t-button>
      <div v-if="!$auth.loggedIn" class="flex justify-end flex-1 space-x-4">
        <t-button
          class="hidden md:block"
          variant="primary"
          @click="$modal.show('register')"
        >
          {{ $t('registration') }}
        </t-button>
        <t-button variant="white" @click="$modal.show('auth')">
          {{ $t('login') }}
        </t-button>
      </div>
    </div>
    <div
      v-if="$auth.loggedIn"
      class="inline-block w-full px-4 py-3 sm:hidden border-t-1 border-secondary"
    >
      <user-balance />
    </div>
    <app-sidebar :active="activeMenu" @close="activeMenu = !activeMenu" />
  </header>
</template>

<script>
import EditIcon from '@/static/img/icon/edit.svg?inline'
import LogoutIcon from '@/static/img/icon/logout.svg?inline'
import AppLanguageSwitcher from '@/components/ui/app-language-switcher.vue'
import UserBalance from '../user/user-balance.vue'
import AppSidebar from './app-sidebar.vue'

export default {
  components: {
    EditIcon,
    LogoutIcon,
    AppLanguageSwitcher,
    UserBalance,
    AppSidebar,
  },
  data() {
    return {
      activeMenu: false,
    }
  },
  watch: {
    $route() {
      this.activeMenu = false
    },
  },
}
</script>

<style lang="scss">
.header {
  position: sticky;
  top: 0;
  @apply z-30 border-b-1 border-secondary bg-cream flex flex-col sm:flex-row;

  &__body,
  &__nav,
  &__link {
    @apply h-full;
  }

  &__burger {
    @apply font-semibold;

    @screen md {
      @apply hidden;
    }
  }

  &__nav {
    display: none;
    @apply flex-1;

    @screen md {
      @apply block;
    }
  }

  &__link {
    @apply cursor-pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-weight: 600;
    transition: all 0.3s;

    &--logo {
      display: none;
      @screen md {
        display: inline-flex;
      }

      @screen 2xl {
        position: absolute;
        left: 1rem;
      }
    }

    & + & {
      margin-left: 1.5rem;
    }

    &::after {
      content: '';
      width: 100%;
      height: 1px;
      border-radius: 100px;
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translateY(50%);
      opacity: 0;
      transition: opacity 0.3s;
      background-color: rgba(var(--color-primary), 1);
    }

    &--active,
    &:hover {
      color: rgba(var(--color-primary), 1);
    }

    &:hover:after,
    &--active:after {
      opacity: 1;
    }
  }
}
</style>
