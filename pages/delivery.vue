<template>
  <div class="delivery">
    <div class="container">
      <div class="delivery_main mb-18">
        <ul class="delivery_list">
          <li v-for="(item, i) in delivery" :key="'delivery-item-' + i">
            <Accordion :title="item.title">
              <div v-html="item.content"></div>
            </Accordion>
          </li>
        </ul>
      </div>
    </div>
    <Submission class="mb-18" />
    <Socials class="mb-18" />
  </div>
</template>

<script setup lang="ts">
import Accordion from "@/components/ui/Accordion.vue";
import Submission from "@/components/ui/Submission.vue";
import Socials from "@/components/blocks/Socials.vue";
import { delivery } from "@/consts/Shared";
import { useRoute } from "vue-router";

useHead({
  title: "Доставка и возврат",
});
</script>

<style scoped lang="scss">
.delivery_main {
  max-width: 86rem;
}
</style>
