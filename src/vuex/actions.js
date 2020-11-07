const actions = {
    addCards(context, payload) {
        const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
  
        if (oldProduct) {
          context.commit("addCounter", oldProduct);
        } else {
          payload.count = 1;
          context.commit("addToCard", payload);
        }
      },
}
export default actions