<template>
  <div class="p-4 font-semibold text-center bg-white rounded-xl text-md">
    <div class="mb-2">через соц. сеть</div>
    <div class="flex items-center justify-center">
      <button
        type="button"
        class="social social--vk"
        @click="$auth.loginWith('vkontakte')"
      >
        <VkSimpleIcon fill="#fff" class="inline-block w-6 h-auto" />
      </button>
    </div>
  </div>
</template>

<script>
import VkSimpleIcon from '@/static/img/icon/social/vk-simple.svg?inline'

export default {
  components: { VkSimpleIcon },
}
</script>

<style lang="scss">
.social {
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  transition: all 0.3s;
  &--fb {
    & svg {
      fill: #3b5999;
    }

    &:hover svg {
      fill: #2c4782;
    }
  }
  &--vk {
    background: #4d76a1;

    &:hover {
      background: #3f668f;
    }
  }
  &--g {
    & svg {
      fill: #f9f8f6;
    }

    &:hover svg {
      fill: #e6e4df;
    }
  }
}
</style>
