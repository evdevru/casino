export const state = () => ({
  rate: 1,
  bets: [],
})

export const mutations = {
  SET_BETS(state, payload) {
    state.bets = payload
  },
  SET_RATE(state, payload) {
    state.rate = payload
  },
  PUSH_BET(state, payload) {
    state.bets.push(payload)
  },
  UPDATE_BET(state, payload) {
    const bet = state.bets.find((bet) => bet.id === payload.id)
    Object.assign(bet, payload)
  },
}

export const getters = {
  bets: (state) => [...state.bets].sort((a, b) => a.amount - b.amount),
  userBet: ({ $auth }, state) =>
    state.bets.find(
      (bet) => bet.user_id === $auth.user?.id && bet.status === 'await'
    ),
}
