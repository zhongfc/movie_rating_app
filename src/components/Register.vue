<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field label="Name" v-model="name" required></v-text-field>
    <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
    <v-text-field label="Password" v-model="password" required></v-text-field>
    <v-text-field name="input-7-1" label="Comfirm Password" v-model="comfirm_password"></v-text-field>
    <v-btn @click="submit" :disabled="!valid">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    valid: true,
    name: '',
    email: '',
    password: '',
    comfirm_password: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid'
    ]
  }),
  methods: {
    async submit () {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            name: this.name,
            email: this.email,
            password: this.password
          },
          url: 'http://localhost:3000/users/register',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(() => {
            this.$swal(
              'Greate',
              'You have been successfully registered!',
              'success'
            )
            this.$route.push({name: 'Login'})
          })
          .catch((error) => {
            const message = error.response.data.message
            this.$swal('Oh oo!', `${message}`, 'error')
          })
      }
      return true
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
