<template>
  <div
    class="card-game"
    :class="{
      'cursor-not-allowed pointer-events-none select-none filter-grayscale': disabled,
    }"
  >
    <h3 class="card-game__title">
      <slot name="title">{{ name }}</slot>
      <img
        class="card-game__dots"
        src="/img/icon/card-game-dots.svg"
        :alt="name"
      />
    </h3>
    <p class="card-game__description" v-html="description"></p>
    <div class="card-game__footer">
      <t-button :to="to" class="card-game__next" variant="primary"
        >{{ $t('play') }}
        <img class="card-game__icon" src="/img/icon/next.svg" alt="Next"
      /></t-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    to: {
      type: [Object, String],
      required: false,
      default: '/',
    },
  },
  computed: {
    description() {
      return this.$t(`description-${this.name.toLowerCase()}`)
    },
  },
}
</script>

<style lang="scss">
.card-game {
  padding: 3rem;
  border-radius: 20px;
  background: url('/img/card-game-bg.svg') top right no-repeat, #ffffff;
  background-size: 65%;
  display: flex;
  flex-direction: column;

  &__title {
    font-size: 24px;
    font-weight: 900;
    margin-bottom: 1.5rem;
    line-height: 1;
    display: flex;
    align-items: center;
  }

  &__dots {
    margin-left: 1.5rem;
  }

  &__description {
    margin-bottom: 1.5rem;
    max-width: 100%;
    flex: 1;

    @screen lg {
      max-width: 65%;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
  }

  &__next {
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }

  &__icon {
    width: 20px;
    margin-left: 0.5rem;
  }

  &__ping {
    background: #ffffff;
    border-radius: 50%;
    height: 6px;
    width: 6px;
    margin-right: 0.5rem;
    position: relative;
    z-index: 5;

    &:after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      height: 8px;
      width: 8px;
      transform: translate(-50%, -50%);
      z-index: -1;
      background: rgba(255, 255, 255, 0.85);
      border-radius: 50%;
      animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
  }

  &__counter {
    background: rgba(10, 186, 54, 1);
    border-radius: 6px;
    color: #ffffff;
    font-weight: 900;
    font-size: 12px;
    display: flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
    line-height: 1;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;

      transform: translate(-100%, -50%);
    }
  }
}

@keyframes ping {
  75%,
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}
</style>
