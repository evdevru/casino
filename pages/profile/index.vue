/* eslint-disable camelcase */
<template>
  <section class="container">
    <modal-profile-fullname :init-user="user" />
    <h1 class="flex items-center mb-6 text-2xl font-black uppercase">
      <span class="flex-1">{{ $t('your-profile') }}</span>
    </h1>
    <div class="grid grid-cols-4 gap-3">
      <div class="col-span-4 space-y-3 lg:col-span-1">
        <div class="p-8 bg-white rounded-xl">
          <div class="flex items-center space-x-4">
            <div class="relative rounded-full cursor-pointer group">
              <img
                :src="$auth.user.avatar"
                :alt="$auth.user.username"
                class="w-24 h-24 rounded-full"
              />
              <label
                v-tooltip="$t('select-image')"
                for="avatar"
                class="absolute flex items-center justify-center w-full h-full transition duration-500 transform -translate-x-1/2 -translate-y-1/2 bg-gray-400 rounded-full opacity-0 cursor-pointer bg-opacity-20 top-1/2 left-1/2 group-hover:opacity-100"
              >
                <img src="/img/icon/upload.svg" alt="" />
              </label>
              <input
                id="avatar"
                type="file"
                name="avatar"
                class="hidden"
                @change="updateAvatar"
              />
            </div>
            <div class="flex flex-col">
              <p>
                {{ $t('fullname') }}
              </p>
              <div class="flex items-center">
                <p class="flex items-center font-semibold text-md">
                  {{ user.fullname ? user.fullname : 'Установить' }}
                  <button
                    class="ml-1 transition-all rounded-md bg-cream hover:bg-primary"
                    type="button"
                    @click="$modal.show('profile-fullname')"
                  >
                    <EditIcon />
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="p-8 bg-white rounded-xl">
          <h2 class="mb-3 text-lg font-semibold leading-none">
            {{ $t('socials') }}
          </h2>
          <div class="flex flex-col space-y-3">
            <t-button
              variant="strong"
              class="text-white bg-vk"
              :disabled="hasSocial('vk')"
              @click="connectVk"
            >
              <div class="flex items-center justify-center">
                <VkIcon fill="#fff" class="inline-block w-4 h-4 mr-2" />
                <span>{{ $t('connect') }} ВКонтакте</span>
              </div></t-button
            >
            <t-button variant="strong" class="text-white bg-google"
              >{{ $t('connect') }} Google</t-button
            >
            <t-button variant="strong" class="text-white bg-facebook"
              >{{ $t('connect') }} Facebook</t-button
            >
          </div>
        </div>
      </div>
      <div class="col-span-4 lg:col-span-3">
        <div class="p-8 bg-white rounded-xl">
          <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div class="space-y-3">
              <h2 class="mb-3 text-lg font-semibold">
                {{ $t('information') }}
              </h2>
              <form @submit.prevent="updateUser('username')">
                <label>
                  <span class="block mb-2 opacity-80">{{
                    $t('your-login')
                  }}</span>
                  <div class="relative">
                    <t-input
                      v-model="user.username"
                      class="w-full pl-12"
                    ></t-input>
                    <img
                      src="/img/icon/link.svg"
                      class="absolute w-8 h-4 transform -translate-y-1/2 left-3 top-1/2"
                      alt=""
                    />
                    <t-button
                      type="submit"
                      class="absolute transform -translate-y-1/2 right-2 top-1/2"
                      variant="primary"
                    >
                      <span class="hidden lg:block">{{ $t('save') }}</span>
                      <CheckIcon fill="#fff" class="w-4 h-4 lg:hidden" />
                    </t-button>
                  </div>
                </label>
              </form>
              <form @submit.prevent="updateUser('email')">
                <label class="block">
                  <span class="block mb-2 opacity-80"
                    >{{ $t('your-email') }} *</span
                  >
                  <div class="relative mb-2">
                    <t-input
                      v-model="user.email"
                      type="email"
                      class="w-full pl-12"
                    ></t-input>
                    <img
                      src="/img/icon/email.svg"
                      class="absolute w-8 h-4 transform -translate-y-1/2 left-3 top-1/2"
                      alt=""
                    />
                    <t-button
                      type="submit"
                      class="absolute transform -translate-y-1/2 right-2 top-1/2"
                      variant="primary"
                      ><span class="hidden lg:block">{{ $t('save') }}</span>
                      <CheckIcon fill="#fff" class="w-4 h-4 lg:hidden"
                    /></t-button>
                  </div>
                  <small class="block"
                    >* {{ $t('your-email-description') }}</small
                  >
                </label>
              </form>
            </div>
            <div>
              <h2 class="mb-3 text-lg font-semibold">
                {{ $t('change-password') }}
              </h2>
              <form class="space-y-3" @submit.prevent="updatePassword">
                <label class="block">
                  <span class="block mb-2 opacity-80">{{
                    $t('new-password')
                  }}</span>
                  <div class="relative">
                    <t-input
                      v-model="user.password"
                      type="password"
                      class="pl-12"
                    />
                    <img
                      src="/img/icon/password.svg"
                      class="absolute w-8 h-4 transform -translate-y-1/2 left-3 top-1/2"
                      alt=""
                    />
                  </div>
                </label>
                <label class="block">
                  <span class="block mb-2 opacity-80">{{
                    $t('repeat-new-password')
                  }}</span>
                  <div class="relative">
                    <t-input
                      v-model="user.password_confirmation"
                      type="password"
                      class="pl-12"
                    />
                    <img
                      src="/img/icon/password.svg"
                      class="absolute w-8 h-4 transform -translate-y-1/2 left-3 top-1/2"
                      alt=""
                    />
                  </div>
                </label>
                <t-button class="w-full" variant="primary">{{
                  $t('save')
                }}</t-button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import EditIcon from '@/static/img/icon/edit.svg?inline'
import CheckIcon from '@/static/img/icon/check.svg?inline'
import VkIcon from '@/static/img/social/vk.svg?inline'
import ModalProfileFullname from '~/components/modal/modal-profile-fullname.vue'

export default {
  components: {
    EditIcon,
    CheckIcon,
    ModalProfileFullname,
    VkIcon,
  },
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  mounted() {
    Object.assign(this.user, this.$auth.user)
  },
  methods: {
    async updateUser(field) {
      await this.$axios
        .put('/api/v1/profile', {
          [field]: this.user[field],
        })
        .then((response) => {
          this.$auth.fetchUser()
        })
    },
    async updatePassword() {
      // eslint-disable-next-line camelcase
      await this.$axios
        .put('/api/v1/profile', {
          password: this.user.password,
          password_confirmation: this.user.password_confirmation,
        })
        .then((response) => {
          this.$auth.fetchUser()
        })
    },
    async connectVk() {
      const token = this.$auth.strategy.token.get()
      await this.$auth.loginWith('vkontakte', {
        params: { state: token, jwt: token, asd: 'asd' },
      })
    },
    async updateAvatar(e) {
      const formData = new FormData()
      formData.append('avatar', e.target.files[0])
      await this.$axios
        .put('/api/v1/profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.$auth.fetchUser()
        })
    },
    hasSocial(provider) {
      return !!(
        this.$auth.user.socials.length &&
        this.$auth.user.socials.find((x) => x.provider === provider)
      )
    },
  },
}
</script>

<style></style>
