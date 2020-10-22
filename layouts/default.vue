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

