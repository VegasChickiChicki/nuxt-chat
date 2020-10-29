<template>
  <div class="login-case">
    <div class="login-case__wrapper login-case__content">

    </div>
    <div class="login-case__wrapper">
      <transition name="login-form" mode="out-in">
        <form class="default-form" :key="'LoginUserForm'" @submit.prevent="LoginUser" v-if="LoginState">
          <p class="default-form__title">Sign up</p>
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

        <form class="default-form" :key="'RegisterUserForm'" @submit.prevent="RegisterUser" v-else>
          <p class="default-form__title">Sign in</p>
          <input-component
            class="input-text--default"
            :name="'register-email'"
            :title="'Email'"
            :placeholder="'some-email@gmail.com'"
            :helper-text="this.errors.find(el => el.type === 'email') ? this.errors.find(el => el.type === 'email').text : ''"
            :class="{ 'input-text--error': this.errors.find(el => el.type === 'email') }"
            v-model="user.email"
          />
          <input-component
            class="input-text--default"
            :name="'register-name'"
            :title="'Login'"
            :placeholder="'some-login'"
            :helper-text="this.errors.find(el => el.type === 'login') ? this.errors.find(el => el.type === 'login').text :''"
            :class="{ 'input-text--error': this.errors.find(el => el.type === 'login') }"
            v-model="user.login"
          />
          <input-component
            class="input-text--default"
            :name="'register-password'"
            :title="'Password'"
            :placeholder="'some-password'"
            :type="'password'"
            :helper-text="this.errors.find(el => el.type === 'password') ? this.errors.find(el => el.type === 'password').text :''"
            :class="{ 'input-text--error': this.errors.find(el => el.type === 'password') }"
            v-model="user.password"
          />
          <button type="submit" class="btn-main btn--transparent">register</button>
        </form>
      </transition>
    </div>
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
    justify-content: flex-end;
    align-items: center;

    grid-row-start: 2;
    grid-row-end: -1;
    grid-column-start: 1;
    grid-column-end: -1;

    &__wrapper{
      width: 50%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      border-left: 1px solid $main-color;
    }

    &__content{
      height: calc(100% + 200px);

      transform: translateY(-100px);
    }
  }

  .login-form{
    &-enter-active, &-leave-active {
      transition: opacity 0.25s, transform ease 0.25s;
    }

    &-enter, &-leave-to{
      opacity: 0;
      transform: translateY(-32px);
    }
  }
</style>
