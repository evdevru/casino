<template>
  <div v-if="$auth.loggedIn" class="flex justify-end space-x-3">
    <t-button variant="white">
      <div class="flex items-center">
        <CoinIcon class="inline-block w-4 h-4 mr-2" />
        &nbsp;
        <span class="font-extrabold leading-none text-md">{{
          $auth.user.balance
        }}</span>
      </div>
    </t-button>
    <t-button variant="primary">{{ $t('wallet') }}</t-button>
  </div>
</template>

<script>
import CoinIcon from '@/static/img/icon/coin.svg?inline'

export default {
  components: { CoinIcon },
}
</script>

<style></style>
