import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    movies: []
  },
  getters: {
    fetchMovies: state => state.movies
  },
  mutations: {
    ADD_MOVIE: (state, payload) => {
      state.movies.unshift(payload)
    },
    MOVIES: (state, payload) => {
      state.movies = payload
    }
  },
  actions: {
    fetchMovies: (context, payload) => {
      const token = window.localStorage.getItem('auth')
      axios({
        method: 'get',
        url: 'http://localhost:3000/movies',
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          context.commit('MOVIES', response.data.movies)
        })
        .catch(() => {

        })
    },
    addMovie: (context, payload) => {
      return axios({
        method: 'post',
        data: payload,
        url: 'http://localhost:3000/movies',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          context.commit('ADD_MOVIE', response.data)
          this.$swal('Great!', 'Movie added successfully!', 'success')
        })
        .catch(() => {
          this.$swal('Oh oo!', 'Could not add the movie!', 'error')
        })
    }
  }
})
