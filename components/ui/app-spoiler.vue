<template>
  <div class="spoiler">
    <div class="spoiler__header" @click="active = !active">
      <img src="/img/icon/question.svg" class="mr-4" alt="Вопрос" />
      <slot name="title">Что это за сайт?</slot>
      <div class="spoiler__toggler">
        <img
          class="spoiler__arrow"
          :class="{ 'spoiler__arrow--active': active }"
          src="/img/icon/arrow.svg"
          alt="Открыть"
        />
      </div>
    </div>
    <div ref="body" class="spoiler__body" :style="{ height: bodyHeight }">
      <p class="pb-4">
        <slot name="text"
          >EZCASH – финансовые игры с выводом реальных средств. На данный момент
          на сайте представлены 5 самых популярных денежных игр. EZCASH
          зарегистрирована в Великобритании, и ведет свою деятельность в
          соответствии со всеми установленными правовыми нормами.
        </slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    }
  },
  computed: {
    bodyHeight() {
      return `${this.active ? this.$refs.body.scrollHeight : 0}px`
    },
  },
}
</script>

<style lang="scss">
.spoiler {
  &__header {
    @apply font-semibold px-6 py-4 cursor-pointer select-none flex items-center;
  }

  &__arrow {
    @apply w-full h-auto transition duration-200 ease-linear transform;

    &--active {
      @apply rotate-180;
    }
  }

  &__toggler {
    @apply p-2 ml-auto bg-white rounded w-7 h-7 transition duration-200;
  }

  &:hover &__toggler {
    @apply bg-primary;
  }

  &__body {
    height: 0;
    @apply px-6 overflow-hidden transition duration-200 transition-height;
  }
}

.slide-enter-active,
.slide-leave-enter {
  opacity: 0;
  transform: translateY(0);
  transition: all 0.3s linear;
}
.slide-enter,
.slide-leave-to {
  opacity: 1;
  transform: translateY(100%);
}
</style>
