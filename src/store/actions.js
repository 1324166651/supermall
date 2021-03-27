import {ADDCOUNT,ADDTOCAR} from './mutations-types'
export default{
  addCart(context,payload){
    let oldProduct =context.state.cartList.find(item =>item.iid ===payload.iid)
    if(oldProduct){
      oldProduct.count +=1
      context.commit(ADDCOUNT,oldProduct)
    }else{  
      payload.count = 1
      context.commit(ADDTOCAR,payload)
    }
  }
}