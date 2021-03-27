import {ADDCOUNT,ADDTOCAR} from './mutations-types'
export default {
  
    [ADDCOUNT](state,payload){
        state.count +=1
    },
    [ADDTOCAR](state,payload){
        state.cartList.push(payload)
    }
    //1
    // addCart(state,payload){
    //   let oldProduct =state.cartList.find(item =>item.iid ===payload.iid)
    //   if(oldProduct){
    //     oldProduct.count +=1
    //   }else{
    //     payload.count = 1
    //     state.cartList.push(payload)
    //   }
    // }
  
  // // 计数
  // [ADDCOUNT] (state,payload) {
  //   payload.count += 1
  // },
  // // 添加购物车
  // [ADDTOCAR] (state,payload) {
  //   payload.checked = true
  //   state.cartList.push(payload)
  // },
 
}