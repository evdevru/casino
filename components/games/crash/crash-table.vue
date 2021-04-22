<template>
  <div class="p-12 bg-white rounded-xl">
    <h2 class="mb-3 font-semibold text-md">{{ $t('room-bets') }}</h2>
    <p v-if="!bets.length">{{ $t('no-bets') }}</p>
    <div v-else class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="(bet, idx) in betsLocal" :key="`bet-${idx}`">
        <div class="flex flex-wrap items-start space-x-3 font-medium">
          <img :src="bet.user.avatar" alt="" class="w-10 h-10 rounded-full" />

          <div class="flex flex-col flex-1 overflow-hidden overflow-ellipsis">
            <div class="flex items-center space-x-3">
              <p v-if="bet.user.first_name">
                {{ bet.user.first_name }}
              </p>
              <p
                v-if="bet.user.last_name"
                class="overflow-hidden whitespace-nowrap overflow-ellipsis"
              >
                {{ bet.user.last_name }}
              </p>
              <p v-if="!bet.user.last_name && !bet.user.first_name">
                {{ bet.user.username }}
              </p>
            </div>
            <div class="flex flex-wrap items-center flex-1 space-x-3">
              <span
                class="flex items-center justify-end"
                :class="{ 'text-red-400': bet.status === 'lose' }"
              >
                {{ bet.amount }}
                <CoinIcon class="w-4 h-4 ml-2" />
              </span>
              <template v-if="bet.status === 'win'">
                <span> x{{ bet.rate_final }} </span>
                <span>=</span>
                <p class="text-green-400">
                  {{ (bet.amount * bet.rate_final).toFixed(2) }}
                </p>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoinIcon from '@/static/img/icon/coin.svg?inline'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: { CoinIcon },
  props: {
    socket: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('crash', ['bets']),
    betsLocal() {
      return [...this.bets].sort((b, a) => a.amount - b.amount)
    },
    userBet() {
      return this.bets.find(
        (bet) => bet.user.id === this.$auth.user.id && bet.status === 'await'
      )
    },
  },
  beforeMount() {
    this.socket
      .on('game:status', (data) => {
        this.SET_BETS(data.bets)
      })
      .on('game:new', () => {
        this.SET_BETS([])
      })
      .on('bet:new', (bet) => {
        this.PUSH_BET(bet)
      })
      .on('bet:result', (data) => {
        if (
          this.$auth.loggedIn &&
          this.userBet &&
          data.bets.find((x) => x.user.id === this.$auth.user.id)
        ) {
          this.$auth.fetchUser()
        }
        data.bets.forEach((bet) => {
          this.UPDATE_BET(bet)
        })
      })
  },
  methods: {
    ...mapMutations({
      SET_BETS: 'crash/SET_BETS',
      PUSH_BET: 'crash/PUSH_BET',
      UPDATE_BET: 'crash/UPDATE_BET',
    }),
  },
}
</script>

<style></style>
