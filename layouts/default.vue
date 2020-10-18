<template>
  <div class="main-case">
    <header-component />
    <aside-component />
    <Nuxt />
  </div>
</template>

<script>
  import HeaderComponent from "../components/header-component";
  import AsideComponent from "../components/aside-component";

  export default {
    name: 'default-layout',
    components: { AsideComponent, HeaderComponent },
  }
</script>

<style lang="scss">
  .main-case{
    width: 100%;
    height: 100%;

    min-height: 100vh;

    display: grid;
    grid-template-areas: 'aside header' 'aside content';
    grid-template-columns: 420px calc(100vw - 420px);
    grid-template-rows: 100px calc(100vh - 100px);

    background: linear-gradient(125deg, $main-color 0, $main-color--light 75%);
  }
</style>
