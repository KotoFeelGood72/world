<!-- @format -->

<template>
  <div class="input">
    <div class="input__w">
      <input :type="type" :placeholder="placeholder" v-model="localValue" />
    </div>
    <span v-if="error" class="input-message">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";

const props = withDefaults(
  defineProps<{
    type?: string;
    placeholder?: string;
    message?: string;
    error?: boolean;
    modelValue: string;
  }>(),
  {
    type: "text",
    placeholder: "placeholder",
    message: "",
    error: false,

    modelValue: "",
  }
);

const emit = defineEmits(["update:modelValue"]);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});
</script>

<style scoped lang="scss">
input {
  @include app;
  border: 0.1rem solid $black;
  font-size: 2.5rem;
  line-height: 3rem;
  max-width: 34.4rem;
  padding: 1.2rem 1.6rem;
  width: 100%;
  @include bp($point_2) {
    font-size: 1.8rem;
  }
}
</style>
