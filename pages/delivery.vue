<!-- @format -->

<template>
  <div class="delivery" v-if="delivery">
    <div class="container">
      <div class="delivery_main mb-18">
        <ul class="delivery_list">
          <li
            v-for="(item, i) in delivery.accardion"
            :key="'delivery-item-' + i"
          >
            <Accordion
              :title="item.title"
              :id="item.id"
              :currentOpenId="currentOpenId"
              @update:currentOpenId="updateCurrentOpenId"
            >
              <div v-html="item.txt"></div>
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
import { useGlobalStoreRefs } from "~/stores/useGlobalStore";

const { load } = useGlobalStoreRefs();

useHead({
  title: "Доставка и возврат",
});

const currentOpenId = ref<any>();
const delivery = ref<any>();

async function getPageContent() {
  try {
    const { $custom } = useNuxtApp();
    const response = await $custom.get("/dostavka-i-vozvrat.json");
    delivery.value = response.data.acf;
  } catch (error) {
  } finally {
    load.value = false;
  }
}

const updateCurrentOpenId = (id: number | null) => {
  currentOpenId.value = id;
};

onMounted(async () => {
  await getPageContent();
});
</script>

<style scoped lang="scss">
.delivery_main {
  max-width: 86rem;
}

.delivery_list {
  li {
    &:not(:last-child) {
      margin-bottom: 4rem;
      @include bp($point_2) {
        margin-bottom: 2.5rem;
      }
    }
  }
}
</style>
