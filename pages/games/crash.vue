<template>
  <section class="container">
    <modal-crash-instruction />
    <h1 class="flex items-center mb-6 text-2xl font-black uppercase">
      <span class="flex-1">CRASH</span>
      <t-button variant="white" @click="$modal.show('crash-instruction')">
        <svg class="w-4 h-6">
          <use xlink:href="/img/icon/free/sprite.svg#info-i"></use>
        </svg>
      </t-button>
    </h1>
    <div class="grid grid-cols-8 gap-1.5">
      <div class="col-span-8 p-12 bg-white lg:col-span-3 rounded-xl">
        <form class="flex flex-col" @submit.prevent="betPlace">
          <label class="mb-3 font-semibold text-md" for="amount">{{
            $t('bet-amount')
          }}</label>
          <div class="mb-3 relative">
            <t-input id="amount" v-model="bet.amount"></t-input>
            <div
              class="absolute top-1/2 right-3 transform -translate-y-1/2 space-x-2 flex items-center"
            >
              <t-button
                type="button"
                variant="outline"
                class="bg-gray-100 border-none w-10"
                @click="bet.amount *= 2"
                >X2</t-button
              >
              <t-button
                type="button"
                variant="outline"
                class="bg-gray-100 border-none w-10"
                @click="bet.amount /= 2"
                >1/2</t-button
              >
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2 mb-4 sm:grid-cols-6">
            <t-button type="button" variant="outline" @click="bet.amount += 1"
              >+1</t-button
            >
            <t-button type="button" variant="outline" @click="bet.amount += 5"
              >+5</t-button
            >
            <t-button type="button" variant="outline" @click="bet.amount += 10"
              >+10</t-button
            >
            <t-button type="button" variant="outline" @click="bet.amount += 100"
              >+100</t-button
            >
            <t-button type="button" variant="outline" @click="bet.amount += 500"
              >+500</t-button
            >
            <t-button
              type="button"
              variant="outline"
              @click="bet.amount += 100000"
              >Все</t-button
            >
          </div>
          <label class="mb-3 font-semibold text-md" for="auto">{{
            $t('autocashout')
          }}</label>
          <t-input
            id="auto"
            v-model="bet.rate_auto"
            class="mb-4"
            :placeholder="$t('rate')"
          ></t-input>
          <hr class="mt-0 mb-4 divider" />
          <t-button
            v-tooltip="{
              content: !userBet && rate > 1 ? $t('game-started') : '',
            }"
            :disabled="(rate > 1 && !userBet) || (userBet && rate === 1)"
            type="submit"
            class="!py-4"
            variant="primary"
            >{{ btnText }}</t-button
          >
        </form>
      </div>
      <div class="col-span-8 lg:col-span-5">
        <div class="px-8 py-6 bg-white rounded-xl">
          <crash-chart :socket="socket" />
        </div>
      </div>
      <div class="col-span-8">
        <crash-table :socket="socket" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import crashChart from '~/components/games/crash/crash-chart.vue'
import crashTable from '~/components/games/crash/crash-table.vue'
import ModalCrashInstruction from '~/components/modal/crash/modal-crash-instruction.vue'

export default {
  components: { crashChart, crashTable, ModalCrashInstruction },
  data() {
    return {
      bet: {
        amount: 0,
        rate_auto: null,
      },
      socket: null,
    }
  },
  computed: {
    ...mapState({
      rate: (state) => state.crash.rate,
    }),
    ...mapGetters({
      bets: 'crash/bets',
    }),
    userBet() {
      if (!this.$auth.loggedIn) return false
      return this.bets.find(
        (bet) => bet.user.id === this.$auth.user.id && bet.status === 'await'
      )
    },
    btnText() {
      if (this.userBet && this.rate === 1) {
        return this.$t('await-start')
      }
      return this.userBet && this.rate > 1
        ? this.$t('withdraw-on') + ` (x${this.rate})`
        : this.$t('make-bet')
    },
  },
  watch: {
    'bet.amount'(val) {
      if (val < 0) {
        this.bet.amount = 0
      } else if (this.$auth.loggedIn && val > this.$auth.user?.balance) {
        this.bet.amount = this.$auth.user.balance
      }
    },
  },
  beforeMount() {
    this.socket = this.$nuxtSocket({
      channel: 'crash',
      extraHeaders: {
        Authorization: this.$auth.strategy.token.get(),
      },
    })
    this.socket.emit('game:status')
  },
  methods: {
    betPlace() {
      if (!this.$auth.loggedIn) {
        return this.$modal.show('auth')
      }
      if (this.rate > 1 && this.userBet) {
        return this.socket.emit('bet:take')
      }
      if (this.$auth.user.balance === 0) {
        this.$notify(
          {
            group: 'default',
            type: 'error',
            text: 'Недостаточно средств',
          },
          4000
        )
      }
      this.socket.emit('bet:make', this.bet, async (data) => {
        this.$notify(
          {
            group: 'default',
            type: data.status,
            text: data.message,
          },
          4000
        )
        if (data.status === 'success') {
          await this.$auth.fetchUser()
        }
      })
    },
  },
}
</script>
