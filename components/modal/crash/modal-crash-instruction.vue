<template>
  <t-modal :click-to-close="false" name="crash-instruction">
    <template slot="close">
      <svg class="w-full h-full">
        <use xlink:href="/img/icon/free/sprite.svg#close"></use>
      </svg>
    </template>
    <template #header>
      <h3>Как играть</h3>
    </template>
    <div v-show="step === 1">
      <p>
        Введите сумму ставки и значение автовывода (по желанию) – при выбранном
        автовыводе вы автоматически заберете выигрыш по достижению указанного
        коэффициента.
      </p>
    </div>
    <div v-show="step === 2">
      <p>Нажмите «Сделать ставку» и следите за ростом графика.</p>
    </div>
    <div v-show="step === 3">
      <p>
        Нажмите кнопку «Забрать» до того, как график обрушится и деньги сгорят,
        или заберите их с помощью автовывода.
      </p>
    </div>
    <div class="flex items-center flex-wrap mt-3 space-x-3">
      <t-button variant="white" @click="step -= 1">
        <div class="flex justify-center">
          <svg
            class="w-4 opacity-70 h-3 ml-2 transform -rotate-180 origin-center"
          >
            <use xlink:href="/img/icon/free/sprite.svg#arr-next"></use>
          </svg></div
      ></t-button>
      <t-button class="flex-1" variant="primary" @click="nextStep">
        <div class="flex items-center justify-center">
          <template v-if="step < 3">
            <span class="hidden md:inline-block"> Следующий шаг </span>
            <span class="md:hidden"> Далее </span>
          </template>
          <template v-else>
            <span> Начать зарабывать! </span>
          </template>
          <svg class="w-5 h-3 ml-2">
            <use xlink:href="/img/icon/free/sprite.svg#arr-next"></use>
          </svg>
        </div>
      </t-button>
    </div>
  </t-modal>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
    }
  },
  watch: {
    step(val) {
      if (val <= 0) {
        this.step = 1
      }
    },
  },
  methods: {
    nextStep() {
      if (this.step === 3) {
        return this.$modal.hide('crash-instruction')
      }
      this.step += 1
    },
  },
}
</script>

<style></style>
