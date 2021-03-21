export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    email: ''
  },
  mutations: {
    updateId (state, id) {
      state.id = id
    },
    updateName (state, name) {
      state.name = name
    },
    updateEmail (state, email) {
      state.email = email
    }
  }
}
