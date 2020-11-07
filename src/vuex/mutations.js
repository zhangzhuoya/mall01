const mutations = {
    addCounter(state, payload) {
        payload.count++
        console.log(payload);
      },
      addToCard(state, payload) {
        console.log(payload);
        payload.checked = true
        state.cartList.push(payload);
      },
}
export default mutations