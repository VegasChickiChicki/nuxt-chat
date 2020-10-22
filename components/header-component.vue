<template>
  <header class="header">
    <div class="user-info">
      <div class="user-info__icon">

      </div>
      <div class="user-info__description">
        <p class="user-info__status user-info__status--active">online</p>
        <p class="user-info__name">
          Las Vegas
          <span class="user-info__id">#VegasChicki</span>
        </p>
      </div>
    </div>
    <div class="site-info">
      <p class="site-info__name">nuxt-chat</p>
      <p class="site-info__version">version - 1.2.4</p>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'header-component',
    data: () => {
      return {

      }
    }
  }
</script>
