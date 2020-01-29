import Vue from 'vue'
import Vuex from 'vuex'
import db from '../config/firebase.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boardLength:0,
    boardSpec:[],
    boardOrder:{},
    boardOrderTitle:{}

    
  },
  getters:{
    boardSpec2: state=>{
        return state.boardSpec
    }
  },
  mutations: {
    SET_BOARD_LENGTH(state,payload)
      {
        state.boardLength = payload
      },
    SET_BOARD_SPEC(state,payload)
      {
        state.boardSpec = payload
      },
    SET_BOARD_ORDER(state,payload)
      {
        state.boardOrder = payload
      },
    SET_BOARD_ORDER_TITLE(state,payload)
      {
        state.boardOrderTitle = payload
      }


  },
  actions: {
    fetchBoard({commit,state}, payload)
      {
        db.collection('board').orderBy('boardIndex')
          .onSnapshot( function(doc){
              // console.log("TCL: doc @fetchBoard - store.js", doc)
              // console.log("TCL: doc length", doc.docs.length)
              
              const array = []
              doc.forEach(element => {
                // console.log('TCL \n============\n dalem element', element.data())
                array.push({
                  id: element.id,
                  boardIndex: element.data().boardIndex,
                  boardTitle: element.data().boardTitle,
                  color: element.data().color,
                  task: element.data().task
                })
              });

              commit('SET_BOARD_LENGTH', doc.docs.length)
              commit('SET_BOARD_SPEC', array)
              
          }
          ,function(err)
          {
            console.log('TCL error @fetchBoard - store \n============\n ', err)
          })

      },
    // fetchTask({commit, state}, payload) //MUNGKIN NANTI BISA DIAPUS AJA
    //   {
    //     db.collection('board').doc(payload)
    //         .onSnapshot(function(doc){
    //             console.log("Current data: ", doc.data());
    //             console.log('TCL \n============\n current boardSpec', state.boardSpec )
    //         })
    //   }


  },
  modules: {



  }
})
