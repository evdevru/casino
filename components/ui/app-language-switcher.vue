<template>
  <t-dropdown class="2xl:!ml-0" :class="{ 'w-full': !short }">
    <template slot="button">
      <div class="flex flex-center">
        <img
          class="w-4"
          :src="selectedLanguage.icon"
          :alt="selectedLanguage.text"
        />
        <span v-show="!short" class="flex-1 text-left ml-2.5">{{
          selectedLanguage.text
        }}</span>
        <img class="w-2.5 ml-2.5" src="/img/icon/arrow.svg" alt="Открыть" />
      </div>
    </template>
    <div class="p-1 space-y-1 rounded">
      <button
        v-for="(lang, idx) in languages"
        :key="`lang-${idx}`"
        type="button"
        class="flex items-center space-x-2.5 bg-opacity-5 hover:bg-gray-100 w-full p-1 rounded"
        @click="selectLanguage(lang)"
      >
        <div>
          <img :src="lang.icon" class="w-5" :alt="lang.name" />
        </div>
        <span>{{ lang.name }}</span>
      </button>
    </div>
  </t-dropdown>
</template>

<script>
export default {
  props: {
    short: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      languages: this.$i18n.locales,
    }
  },
  computed: {
    selectedLanguage() {
      return this.languages.find((x) => x.code === this.$i18n.locale)
    },
  },
  methods: {
    selectLanguage(lang) {
      this.$i18n.setLocale(lang.code)
    },
  },
}
</script>

<style></style>
