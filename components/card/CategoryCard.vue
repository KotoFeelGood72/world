<!-- @format -->

<template>
  <div class="category" v-if="data">
    <NuxtLink :to="'/shop/categories/' + data.id">
      <div class="category_card__img">
        <img :src="data.thumbnail" />
      </div>
      <Button :name="data.name" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/ui/Button.vue";

defineProps<{
  data: any;
}>();
</script>

<style scoped lang="scss">
.category img {
  width: 100%;
  height: 100%;
}

.category a {
  @include flex-center;
  flex-direction: column;
  gap: 4rem;
  @include bp($point_2) {
    gap: 1.5rem;
  }
  :deep(.button) {
    @include bp($point_2) {
      width: 100%;
    }
  }
  :deep(.button button) {
    padding: 1.9rem 5rem;
    @include bp($point_2) {
      padding: 0.4rem 0.8rem;
      font-size: 1.2rem;
      min-height: 4rem;
      line-height: 110%;
      width: 100%;
    }
  }
}

.category_card__img {
  @include flex-center;
}
</style>
