<template>
  <div class="container max-w-screen-sm">
    <form @submit.prevent="signup" class="card grid grid-cols-5 px-3 my-20 mx-3 pt-3">
      <h2 class="text-center col-span-5">Signup</h2>
      <label class="flex justify-end items-center mr-3" for="email">E-mail</label>
      <input v-model="email" @blur="emailValidation" class="input col-span-4 my-2" type="email" name="email" id="email" placeholder="example@folks.com">

      <div class="col-span-4 col-end-6 text-light-secondary dark:text-dark-secondary">
        {{ reviewer.email }}
      </div>

      <label class="flex justify-end items-center mr-3" for="password">Password</label>
      <div class="col-span-4 my-2 w-full flex">
        <input v-model="password" @input="passValidation" class="input flex-1" :type="[ passType ? 'text' : 'password' ]" name="password" id="password">
        <span @click="togglePassType" class="btn btn-secondary rounded-full ml-1 hover:cursor-pointer">
          <i v-if="passType" class="fas fa-eye"></i>
          <i v-else class="fas fa-eye-slash"></i>
        </span>
      </div>

      <div class="col-span-4 col-end-6 text-light-secondary dark:text-dark-secondary">
        {{ reviewer.password }}
      </div>

      <button :disabled="!isValid" class="btn btn-primary my-2 col-end-6" type="submit" :title="[ isValid ? '' : 'Oops, keep trying' ]">
        {{ loading ? 'loading' : 'Signup' }}
      </button>
    </form>
    <div class="flex items-center justify-center">
      <i class="fas fa-exclamation mr-2"></i>
      <p>Already have an account?</p>
      <NuxtLink to="/profile/login">
        <button class="btn btn-secondary underline hover:no-underline mx-0 hover:mx-2">
          Login
        </button>
      </NuxtLink>
      <p>here.</p>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Signup'
    }
  },
  data() {
    return {
      email: '',
      password: '',
      passType: false,
      loading: false,
      reviewer: {
        email: '',
        password: ''
      },
      emailIsValid: false,
      passIsValid: false
    }
  },
  computed: {
    isValid() {
      return this.emailIsValid && this.passIsValid
    }
  },
  methods: {
    togglePassType() {
      this.passType = !this.passType
    },
    emailValidation() {
      if (!this.email) {
        this.reviewer.email = 'Where is your email? 🤔'
        this.emailIsValid = false
      } else if (!this.emailValidator(this.email)) {
        this.reviewer.email = 'Is that even an "email"? 🙄'
        this.emailIsValid = false
      } else {
        this.reviewer.email = ""
        this.emailIsValid = true
      }
    },
    emailValidator(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    passValidation() {
      if (!this.password) {
        this.reviewer.password = "I don't know your password"
        this.passIsValid = false
      } else if (this.password.length < 8) {
        this.reviewer.password = '8 character please.'
        this.passIsValid = false
      } else {
        this.reviewer.password = ""
        this.passIsValid = true
      }
    },
    async signup () {

      // email and password valid
      if (this.isValid) {
        console.log('Email and password valid.');
        try {
          const { user, error } = await this.$supabase.auth.signUp({
            email: this.email,
            password: this.password,
          })
          if (error) throw error
          console.log(`${user.email} signup success`)
          this.$store.dispatch('modalSubmit', `Signed up as ${user.email}`)
          this.$router.push(`/`)
        } catch (error) {
          this.$store.dispatch('modalSubmit', error.error_description || error.message)
        }
      } else {
        console.log('Email and password is not valid');
      }
    },
  },
}
</script>
