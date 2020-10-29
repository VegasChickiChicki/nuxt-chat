<template>
	<div class="input-text">
    <label :for="`input-${type}-${name}`" class="input-text__wrapper">
      <span class="input-text__title" v-if="title">{{ title }}</span>
      <input
        class="input-text__input"
        :type="type"
        :id="`input-${type}-${name}`"
        :value="value"
        :disabled="disabled"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        @blur="$emit('blur-input')"
        @input="ChangeValue($event)"
      >
      <span class="input-text__footer">
        <transition name="input-text__footer-inner">
          <span class="input-text__footer-inner" v-if="HelperText && HelperText.length > 0">
            {{ HelperText }}
          </span>
        </transition>
      </span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'input-component',
    props: {
      name: {
        type: String,
        default: 'default',
      },
      title: {
        type: String,
      },
      type: {
        type: String,
        default: 'text',
      },
      HelperText: {
        type: String,
      },
      value: {
        default: '',
      },
      disabled: {
        type: Boolean,
      },
      placeholder: {
        type: String,
      },
      autocomplete: {
        type: String,
        default: 'off',
      }
    },
    methods: {
      ChangeValue(event){
        const value = event.target.value;

        this.$emit('input', value);
      }
    }
  }
</script>
