<template>
  <t-modal
    :click-to-close="false"
    name="profile-fullname"
    @before-open="syncUser"
  >
    <template slot="close">
      <svg class="w-full h-full">
        <use xlink:href="/img/icon/free/sprite.svg#close"></use>
      </svg>
    </template>
    <template #header>
      <h3>Смена имени и фамилии</h3>
    </template>
    <form class="mb-4" @submit.prevent="updateUser('first_name')">
      <label>
        <span class="block mb-2 opacity-80">Ваше имя</span>
        <div class="relative">
          <t-input
            v-model="user.first_name"
            placeholder="Введите имя"
            class="w-full pl-12"
          ></t-input>
          <img
            src="/img/icon/user.svg"
            class="absolute w-8 h-4 transform -translate-y-1/2 left-3 top-1/2"
            alt=""
          />
          <t-button
            type="submit"
            class="absolute transform -translate-y-1/2 right-2 top-1/2"
            variant="primary"
          >
            <span class="hidden lg:block">Сохранить</span>
            <CheckIcon fill="#fff" class="w-4 h-4 lg:hidden" />
          </t-button>
        </div>
      </label>
    </form>
    <form @submit.prevent="updateUser('last_name')">
      <label>
        <span class="block mb-2 opacity-80">Ваша фамилия</span>
        <div class="relative">
          <t-input
            v-model="user.last_name"
            placeholder="Введите фамилию"
            class="w-full pl-12"
          ></t-input>
          <img
            src="/img/icon/user.svg"
            class="absolute w-8 h-4 transform -translate-y-1/2 left-3 top-1/2"
            alt=""
          />
          <t-button
            type="submit"
            class="absolute transform -translate-y-1/2 right-2 top-1/2"
            variant="primary"
          >
            <span class="hidden lg:block">Сохранить</span>
            <CheckIcon fill="#fff" class="w-4 h-4 lg:hidden" />
          </t-button>
        </div>
      </label>
    </form>
  </t-modal>
</template>

<script>
import CheckIcon from '@/static/img/icon/check.svg?inline'

export default {
  components: { CheckIcon },
  props: {
    initUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {
        first_name: '',
        last_name: '',
      },
    }
  },
  methods: {
    syncUser() {
      Object.assign(this.user, this.initUser)
    },
    async updateUser(field) {
      await this.$axios
        .put('/api/v1/profile', {
          [field]: this.user[field],
        })
        .then((response) => {
          this.$auth.fetchUser()
        })
    },
  },
}
</script>

<style></style>
