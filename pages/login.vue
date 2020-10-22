<template>
  <div class="login-case">
    <transition name="login-form" mode="out-in">
      <form class="login-form" :key="'LoginUserForm'" @submit.prevent="LoginUser" v-if="LoginState">
        <p class="login-form__title">Sign up</p>
        <input-component
          class="input-text--default"
          :name="'login-login'"
          :title="'Email / Login'"
          :helper-text="this.errors.find(el => el.type === 'email/login' || el.type === 'auth') ? this.errors.find(el => el.type === 'email/login' || el.type === 'auth').text :''"
          :class="{ 'input-text--error': this.errors.find(el => el.type === 'email/login' || el.type === 'auth') }"
          v-model="user.login"
        />
        <input-component
          class="input-text--default"
          :name="'login-password'"
          :title="'Password'"
          :type="'password'"
          :helper-text="this.errors.find(el => el.type === 'password' || el.type === 'auth') ? this.errors.find(el => el.type === 'password' || el.type === 'auth').text : ''"
          :class="{ 'input-text--error': this.errors.find(el => el.type === 'password' || el.type === 'auth') }"
          v-model="user.password"
        />
        <button type="submit" class="btn-main btn--transparent">login</button>
      </form>

      <form class="login-form" :key="'RegisterUserForm'" @submit.prevent="RegisterUser" v-else>
        <p class="login-form__title">Sign in</p>
        <input-component
          class="input-text--default"
          :name="'register-email'"
          :title="'Email'"
          :helper-text="this.errors.find(el => el.type === 'email') ? this.errors.find(el => el.type === 'email').text : ''"
          :class="{ 'input-text--error': this.errors.find(el => el.type === 'email') }"
          v-model="user.email"
        />
        <input-component
          class="input-text--default"
          :name="'register-name'"
          :title="'Login'"
          :helper-text="this.errors.find(el => el.type === 'login') ? this.errors.find(el => el.type === 'login').text :''"
          :class="{ 'input-text--error': this.errors.find(el => el.type === 'login') }"
          v-model="user.login"
        />
        <input-component
          class="input-text--default"
          :name="'register-password'"
          :title="'Password'"
          :type="'password'"
          :helper-text="this.errors.find(el => el.type === 'password') ? this.errors.find(el => el.type === 'password').text :''"
          :class="{ 'input-text--error': this.errors.find(el => el.type === 'password') }"
          v-model="user.password"
        />
        <button type="submit" class="btn-main btn--transparent">register</button>
      </form>
    </transition>
  </div>
</template>

<script>
  import InputComponent from "../components/input-component";
  import { mapGetters } from 'vuex';

  export default {
    name: 'login',
    components: { InputComponent },
    layout: 'login-layout',
    data: () => {
      return {
        user: {
          email: '',
          login: '',
          password: '',
        },
        errors: [],
      }
    },
    methods: {
      RegisterUser() {
        this.$axios.post('user/register', {
          data: this.user
        }).then(async response => {
          if (!response.data.status){
            this.errors = response.data.errors;
          } else {
            this.errors.splice(0, this.errors.length);

            try {
              await this.$auth.loginWith('local', {
                data: {
                  email: this.user.email,
                  login: this.user.login,
                  password: this.user.password,
                }
              });

              this.$router.push('/');
            } catch (error) {
              console.log(error);
            }
          }
        });
      },
      async LoginUser(){
        try {
          await this.$auth.loginWith('local', {
            data: {
              login: this.user.login,
              password: this.user.password,
            }
          }).then(response => {
            if (!response.data.status){
              this.errors = response.data.errors;
            }
          });

          this.$router.push('/');
        } catch (error) {
          console.log(error);
        }
      }
    },
    computed: {
      ...mapGetters({
        LoginState: 'login-page/LoginState'
      })
    }
  }
</script>

<style lang="scss">
  .login-case{
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    grid-row-start: 2;
    grid-row-end: -1;
    grid-column-start: 1;
    grid-column-end: -1;
  }

  .login-form{
    width: 360px;
    height: 480px;

    padding: 24px 48px;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto 1fr;
    grid-row-gap: 8px;
    align-content: flex-start;

    border: 1px solid $helper-color;
    border-radius: 10px;

    &__title{
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      color: $main-color--dark;
    }

    .btn-main{
      margin-top: 48px;

      align-self: flex-end;
    }

    &-enter-active, &-leave-active {
      transition: opacity 0.25s, transform ease 0.25s;
    }

    &-enter, &-leave-to{
      opacity: 0;
      transform: translateY(-32px);
    }
  }
</style>
