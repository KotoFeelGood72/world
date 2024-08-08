<template>
  <section class="list">
    <div class="container">
      <div class="list_main">
        <h3 v-if="title">{{ title }}</h3>
        <div class="list_grid">
          <slot />
        </div>
        <div class="list-btn" v-if="btn">
          <Button name="Показать еще" @click="emit('onClick')" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import { defineEmits } from "vue";
const props = defineProps<{
  title?: string;
  btn?: boolean;
}>();

const emit = defineEmits(["onClick"]);
</script>

<style scoped lang="scss">
.list_main {
  h3 {
    text-transform: uppercase;
    font-size: 4rem;
    font-family: $font_2;
    font-weight: 400;
    margin-bottom: 4.5rem;

    @include bp($point_2) {
      font-size: 2rem;
      margin-bottom: 3rem;
    }
  }
}

.list_grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  gap: 10rem 4rem;
  @include bp($point_2) {
    gap: 3rem 2rem;
  }
}

.list-btn {
  padding-top: 18rem;
  @include flex-center;
  @include bp($point_2) {
    padding-top: 5.5rem;
  }
  :deep(.button button) {
    @include bp($point_2) {
      font-size: 1.2rem;
      padding: 1.1rem 4rem;
    }
  }
}
</style>
