// 1.store index.js

// 2.vuex store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//用于响应组件中的动作
const actions = {
  //context value
  login(context, value) {
    console.log('-----------------------------'+value.username)
    context.commit('Login', value);
  }
};

//用于组件中的操作数据
const mutations = {
  // actions中一般小写 mutations中一般大写
  Login(state, value) {
    /*function copyObj(obj){
      var newobj = {};
      for ( var key in obj) {
        newobj[key ] = obj[key ];
      }
      return newobj;
    }
    state.user = copyObj(value);*/
    state.user = value
    console.log('-----------------------------'+state.user.username)
  }
};

//用于存储数据
const state = {
  user: {},
  t:''
};

//创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state
});


