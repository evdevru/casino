<template>
  <div class="free-wheel">
    <span class="free-wheel__arrow"
      ><svg class="free-wheel__icon">
        <use xlink:href="/img/icon/free/sprite.svg#wheel-pin"></use></svg
    ></span>
    <div class="free-wheel__description">
      <div class="free-wheel__ticker">
        <svg class="w-6 h-5">
          <use
            :xlink:href="`/img/icon/free/sprite.svg#${
              timeout > 0 ? 'time' : 'clock'
            }`"
          ></use>
        </svg>
        <div class="flex-1 text-white">
          <template v-if="timeout <= 0">
            <div class="font-semibold leading-none">15 минут</div>
            <div class="text-xs">перезарядка</div>
          </template>
          <template v-else>
            <div class="text-3xl font-semibold leading-none">{{ timer }}</div>
          </template>
        </div>
        <t-button
          v-tooltip="timeout > 0 ? 'Ожидайте таймера' : ''"
          variant="primary"
          :disabled="timeout > 0"
          @click="submit"
          >Крутить колесо</t-button
        >
      </div>
    </div>
    <div
      class="free-wheel__body"
      :style="{ transform: `rotate(${circleRotate}deg)` }"
    >
      <img class="w-full h-auto" src="/img/icon/free/wheel.svg" alt="" />
      <div class="absolute top-0 left-0 z-10 w-full h-full">
        <ul class="free-wheel__items">
          <li
            v-for="(number, idx) in numbers"
            :key="`roulette-slot-${idx}`"
            class="free-wheel__item"
            :data-content="number"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    numbers: {
      type: Array,
      required: false,
      default: () => [
        0.01,
        0.03,
        0.05,
        0.1,
        0.15,
        0.18,
        0.2,
        0.01,
        0.03,
        0.05,
        0.1,
        0.15,
        0.18,
        0.2,
      ],
    },
  },
  data() {
    return {
      circleRotate: 0,
      oldRotate: 0,
      timeout: 0,
      interval: {},
    }
  },
  computed: {
    timer() {
      const minutes = Math.floor(this.timeout / 60)
      const seconds = Math.floor(this.timeout - minutes * 60)

      return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
    },
  },
  beforeMount() {
    if (this.$auth.loggedIn) {
      this.$axios.get('/api/v1/freebie').then((response) => {
        this.timeout = response.data.data.timeout
        this.startTimer()
      })
    }
  },
  methods: {
    async submit() {
      const response = await this.$axios.post('/api/v1/freebie')
      const index = this.numbers.findIndex(
        (x) => x === response.data.data.amount
      )
      this.spin(index + 1)
      this.timeout = 60 * 15
      this.startTimer()
      this.$auth.fetchUser()
    },
    spin(idx) {
      // count sections in deg
      const countRotate = 360 * 10

      // 14 = numbers.length = background items count
      const oneItemDeg = 360 / 14

      const min = 3 // right range
      const max = Math.floor(oneItemDeg) - 3 // left range

      const rndItemPosition = Math.floor(Math.random() * (max - min + 1)) + min
      const targetDeg = 360 - idx * oneItemDeg + rndItemPosition

      this.circleRotate += countRotate + targetDeg - this.oldRotate
      this.oldRotate = targetDeg
    },
    startTimer() {
      clearInterval(this.interval)
      this.interval = setInterval(() => {
        if (this.timeout <= 0) {
          return clearInterval(this.interval)
        }

        this.timeout -= 1
      }, 1000)
    },
  },
}
</script>

<style lang="scss">
.free-wheel {
  position: relative;

  &__arrow {
    position: absolute;
    z-index: 5;
    top: 0;
    left: calc(50% + 1px);
    width: 15%;
    height: 20%;
    transform: translate(-50%, -35%);
    @apply z-20;
  }

  &__icon {
    @apply w-full h-full;
  }

  &__description {
    @apply absolute z-10 flex items-center justify-center w-full h-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2;
  }

  &__ticker {
    @apply flex items-center w-full py-3 px-6 space-x-3 bg-opacity-95 bg-dark rounded-full md:max-w-sm;
  }

  &__body {
    transition: 6s ease-in-out;
    @apply relative mx-auto w-4/5 overflow-hidden rounded-full;
  }

  &__items {
    position: relative;
    width: 100%;
    height: 100%;
    transform: rotate(76deg);
  }

  &__item {
    position: absolute;
    left: 0;
    top: 0;
    text-align: center;
    width: 50%;
    height: 50%;

    background-color: hsla(0, 0%, 56.9%, 0.1);
    transform-origin: 100% 100%;
    user-select: none;

    &:after {
      content: attr(data-content);
      font-size: 16px;
      font-weight: 600;
      display: block;
      position: absolute;
      text-align: center;
      right: 60%;
      bottom: -10px;
      transform: skew(-64.2858deg) rotate(-180deg);
    }

    @for $i from 1 through 14 {
      &:nth-child(#{$i}) {
        transform: rotate(#{(360 / 14) * $i}deg) skew(64.2858deg);
      }
    }
  }
}
</style>
