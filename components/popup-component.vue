<template>
  <transition name="popup">
    <div class="popup" v-if="state" @click="TogglePopup($event)">
      <div class="popup__wrapper" :ref="`popup-container--${name}`">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'popup-component',
    props: {
      state: {
        type: Boolean,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    methods: {
      TogglePopup(event){
        if (!this.$refs[`popup-container--${this.name}`].contains(event.target)){
          this.$emit('TogglePopup', !this.state);
        }
      }
    }
  }
</script>
