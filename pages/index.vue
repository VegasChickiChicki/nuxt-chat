<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        nuxt-chat
      </h1>
      <div class="links">
        <button type="button" class="button--green" @click="CreateRequest">
          создать тестовый запрос
        </button>
        <button type="button" class="button--grey">
          GitHub
        </button>
      </div>
      <p class="subtitle">version 1.0.9</p>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'index',
    data: () => {
      return {

      }
    },
    methods: {
      CreateRequest(){
        this.$axios.post('http://194.67.87.60:8080', {
          value: 256,
        }).then(response => {
          console.log(response)
        }).catch(error => {
          console.log(error);
        })
      }
    }
  }
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
