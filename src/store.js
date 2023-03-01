import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'




let stock = createSlice({
  name : 'stock',
  initialState : [10, 11, 12]
})

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ] ,
  reducers : {
    increaseCount(state, action){
      for(let i=0; i<state.length; i++){
        if(state[i].id == action.payload){
          state[i].count += 1;
        }
      }
    },
    insertCart(state, action){
      console.log(state[0])
      console.log(action.payload)
      console.log(typeof action.payload)
      state.push(action.payload)
      console.log(state)
    }
  }
})

export let {increaseCount, insertCart} =  cart.actions

export default configureStore({
  reducer: {
     user : user.reducer,
     stock : stock.reducer,
     cart : cart.reducer
  }
}) 