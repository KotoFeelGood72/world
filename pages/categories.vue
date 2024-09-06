<!-- @format -->

<template>
  <div class="shop">
    <ListView class="mb-18" link="/categories">
      <CategoryCard
        v-for="(item, i) in cat"
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
import Submission from "@/components/ui/Submission.vue";
import Socials from "@/components/blocks/Socials.vue";
import { useGlobalStoreRefs } from "~/stores/useGlobalStore";
useHead({
  title: "Категории",
});

const { cat, load } = useGlobalStoreRefs();

onMounted(() => {
  load.value = false;
});
</script>

<style scoped lang="scss"></style>
