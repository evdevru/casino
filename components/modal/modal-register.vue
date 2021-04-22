<template>
  <t-modal :click-to-close="false" name="register">
    <template slot="close">
      <svg class="w-full h-full">
        <use xlink:href="/img/icon/free/sprite.svg#close"></use>
      </svg>
    </template>
    <template #header>
      <h3>Регистрация</h3>
    </template>
    <section-social class="mb-5" />
    <form class="grid grid-cols-1 gap-5" @submit.prevent="register">
      <div class="relative">
        <t-input
          v-model="user.username"
          class="!pl-12"
          variant="strong"
          placeholder="Логин"
        ></t-input>
        <img
          class="absolute transform -translate-y-1/2 top-1/2 left-4"
          src="/img/icon/user.svg"
          alt=""
        />
      </div>
      <div class="relative">
        <t-input
          v-model="user.password"
          class="!pl-12"
          variant="strong"
          type="password"
          placeholder="Пароль"
        ></t-input>
        <img
          class="absolute transform -translate-y-1/2 top-1/2 left-4"
          src="/img/icon/password.svg"
          alt=""
        />
      </div>
      <div class="relative">
        <t-input
          v-model="user.password_confirmation"
          class="!pl-12"
          variant="strong"
          type="password"
          placeholder="Повторите пароль"
        ></t-input>
        <img
          class="absolute transform -translate-y-1/2 top-1/2 left-4"
          src="/img/icon/password.svg"
          alt=""
        />
      </div>
      <div class="relative">
        <t-input
          v-model="user.email"
          class="!pl-12"
          variant="strong"
          type="email"
          placeholder="Электронная почта"
        ></t-input>
        <img
          class="absolute transform -translate-y-1/2 top-1/2 left-4"
          src="/img/icon/email.svg"
          alt=""
        />
      </div>
      <p>
        Регистрируясь вы принимаете условия<br />
        <a href="#" class="font-semibold text-primary"
          >пользовательского соглашения</a
        >
      </p>
      <t-button type="submit" variant="primary">
        <div class="flex items-center justify-center py-2">
          <span>Зарегистрироваться</span>
          <img class="ml-2" src="/img/icon/next.svg" alt="" />
        </div>
      </t-button>
    </form>
  </t-modal>
</template>

<script>
import sectionSocial from './section-social.vue'
export default {
  components: { sectionSocial },
  data() {
    return {
      user: {
        username: '',
        password: '',
        password_confirmation: '',
        email: '',
      },
    }
  },
  methods: {
    async register() {
      await this.$axios
        .$post('/api/v1/auth/register', this.user)
        .then(async (data) => {
          try {
            await this.$auth.setUserToken(data.data.token)
            this.$modal.hide('register')
          } catch (e) {
            console.log(e)
          }
        })
    },
  },
}
</script>

<style></style>
