export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    eid: ''
  },
  mutations: {
    updateId (state, id) {
      state.id = id
    },
    updateName (state, name) {
      state.name = name
    },
    updateEid (state, eid) {
      state.eid = eid
    }
  }
}
