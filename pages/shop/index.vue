<template>
  <div class="shop">
    <ListView class="mb-18">
      <CategoryCard
        v-for="(item, i) in Categories"
        :key="'category-item-' + i"
        :data="item"
      />
    </ListView>
    <Submission class="mb-18" />
    <Socials class="mb-18" />
  </div>
</template>

<script setup lang="ts">
import ListView from "@/components/list/ListView.vue";
import CategoryCard from "@/components/card/CategoryCard.vue";
import { Categories } from "@/consts/Products";
import Submission from "@/components/ui/Submission.vue";
import Socials from "@/components/blocks/Socials.vue";

useHead({
  title: "Категории",
});
</script>

<style scoped lang="scss"></style>
