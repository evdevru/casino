<template>
  <section class="container">
    <h1 class="mb-6 text-2xl font-black uppercase">Бесплатные монеты</h1>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-5">
      <div class="col-span-2">
        <div class="p-8 bg-white rounded-xl">
          <free-wheel />
        </div>
      </div>
      <div class="col-span-3 space-y-3">
        <div class="p-8 bg-white rounded-xl">
          <h2 class="mb-3 text-xl font-bold leading-none">
            Подпишись на нас ВКонтакте
          </h2>
          <p class="mb-3">
            Вступите в нашу группу
            <a
              href="#"
              class="border-black border-dotted cursor-pointer border-b-1"
              target="_blank"
              ><strong>vk.com/ezcash_official</strong></a
            >
            и получи дополнительно <strong>10</strong>
            <CoinIcon class="inline-block" /> на баланс
          </p>
          <t-button variant="primary">
            <div class="flex items-center">
              <VkIcon fill="#000000" class="inline-block w-4 h-4 mr-2" />
              <span>Подписаться</span>
            </div></t-button
          >
        </div>
        <div class="p-8 bg-white rounded-xl">
          <h2 class="mb-3 text-xl font-bold leading-none">
            Активируй промокод
          </h2>
          <p class="mb-3">
            Выдаются в наших сообществах. Торопись, количество активации
            ограничени!
          </p>
          <form @submit.prevent="usePromocode">
            <label class="relative block">
              <svg
                class="absolute w-8 h-4 transform -translate-y-1/2 left-4 top-1/2"
              >
                <use xlink:href="/img/icon/free/sprite.svg#coupon"></use>
              </svg>
              <t-input
                v-model="promocode"
                class="w-full pr-40 pl-14"
                placeholder="Промокод"
              />
              <t-button
                type="submit"
                class="absolute transform -translate-y-1/2 right-2 top-1/2"
                variant="primary"
                >Активировать</t-button
              >
            </label>
          </form>
        </div>
      </div>
      <!-- <div class="col-span-1 p-8 space-y-3 bg-white rounded-xl">
        <h2 class="text-xl font-bold leading-none">Приглашайте друзей</h2>
        <p class="">
          Получайте до <strong>2.5%</strong> от ставок ваших друзей и до
          <strong>1000 <CoinIcon class="inline-block w-4 h-4" /></strong>
          за каждых
          <strong
            v-tooltip="{
              content:
                'Активным рефералом считается тот, кто пополнил баланс от 100 рублей',
            }"
            class="border-black border-dotted cursor-help border-b-1"
            >10 активных друзей</strong
          >
        </p>
        <t-button variant="primary">Подробнее</t-button>
        <t-button
          v-tooltip="{ content: 'Недостаточно приглашенных' }"
          :disabled="true"
          variant="primary"
          >Получить</t-button
        >
      </div> -->
    </div>
  </section>
</template>

<script>
import CoinIcon from '@/static/img/icon/coin.svg?inline'
import VkIcon from '@/static/img/social/vk.svg?inline'
import freeWheel from '~/components/free/free-wheel.vue'

export default {
  components: { freeWheel, CoinIcon, VkIcon },
  data() {
    return {
      promocode: '',
    }
  },
  methods: {
    usePromocode() {
      this.$axios
        .post('/api/v1/promocode/using', { promocode: this.promocode })
        .finally(() => {
          this.$auth.fetchUser()
        })
    },
  },
}
</script>

<style></style>
