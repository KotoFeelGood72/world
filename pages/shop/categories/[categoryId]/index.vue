<template>
  <div class="products" @click="handleClickOutside">
    <div class="products-filter">
      <div class="container">
        <div class="filters">
          <div class="filter-trigger" @click.stop="toggleFilterMobile">
            <div class="filter_trigger__icon">
              <Icon name="custom:filter" />
            </div>
            <p>Фильтры</p>
          </div>
          <div
            :class="[{ active: isFilterMobile }, 'products_filer__main']"
            ref="filterMain"
          >
            <div class="filter__dropdown">
              <Dropdown
                class="category_drop"
                v-model="selectedCategory"
                title="Категории"
                :options="['Аксессуары', 'Для новорожденных', 'Для животных']"
              />
              <Dropdown
                class="size_drop"
                title="Размер"
                v-model="selectedSize"
                :options="['20-22', '22-24', '24-26']"
              />
            </div>
            <div class="filter__sorts">
              <div class="search">
                <input type="search" placeholder="Поиск" />
                <Icon name="carbon:search" size="22" />
              </div>
              <SingleDropdown
                v-model="selectedSort"
                :options="[
                  'Порядок: по умолчанию',
                  'Порядок: сперва новые',
                  'Порядок: сперва старые',
                  'Цена: по возрастанию',
                  'Цена: по убыванию',
                ]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="products_main">
      <ListView :btn="true" class="mb-18">
        <ProductsCard
          v-for="(item, i) in ProductsAll"
          :key="'products-all-item-' + i"
          :data="item"
        />
      </ListView>
    </div>
    <Reviews class="mb-18" />
    <Submission class="mb-18" />
    <Socials class="mb-18" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import ListView from "@/components/list/ListView.vue";
import ProductsCard from "@/components/card/ProductsCard.vue";
import Reviews from "@/components/blocks/Reviews.vue";
import Submission from "@/components/ui/Submission.vue";
import Socials from "@/components/blocks/Socials.vue";
import { ProductsAll } from "@/consts/Products";
import { useRoute } from "vue-router";

import Dropdown from "@/components/ui/Dropdown.vue";
import SingleDropdown from "@/components/ui/SingleDropdown.vue";

const route = useRoute()
useHead({
  title: `Категория: ${String(route.params.id)}`,
});

const selectedSort = ref<any>("Порядок: сверху новые");
const selectedCategory = ref<string[]>([]);
const selectedSize = ref<string[]>([]);
const isFilterMobile = ref<boolean>(false);

const filterMain = ref(null);

const toggleFilterMobile = () => {
  isFilterMobile.value = !isFilterMobile.value;
  console.log("Filter Mobile Toggled:", isFilterMobile.value);
};

const handleClickOutside = (event: Event) => {
  if (filterMain.value && !filterMain.value.contains(event.target as Node)) {
    isFilterMobile.value = false;
    console.log("Clicked outside filter, closing it.");
  }
};

const handleScroll = () => {
  isFilterMobile.value = false;
  console.log("Scrolled, closing filter.");
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("scroll", handleScroll);
  console.log("Event listeners added.");
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("scroll", handleScroll);
  console.log("Event listeners removed.");
});
</script>

<style lang="scss">
.filter__dropdown,
.filter__sorts {
  @include flex-start;
  gap: 3rem;
  @include bp($point_2) {
    width: 100%;
  }
}

.filter__sorts {
  @include bp($point_2) {
    order: 0;
    // border-top: 0.1rem solid #888888;
    // border-bottom: 0.1rem solid #888888;
  }
}

.filter__dropdown {
  @include bp($point_2) {
    flex-direction: column;
    align-items: flex-start;
    order: 1;
    gap: 0;
  }
}

.products_filer__main {
  @include flex-space;

  @include bp($point_2) {
    display: none;
    border: 0.1rem solid $black;
    padding: 0.5rem 1.5rem 2.6rem 1.5rem;
    position: absolute;
    z-index: 22;
    background-color: $white;
    width: 100%;
  }

  &.active {
    @include bp($point_2) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
}

.search {
  border: 0.1rem solid $black;
  position: relative;
  max-width: 20rem;

  @include bp($point_2) {
    display: none;
  }
  input {
    @include app;
    font-size: 2rem;
    padding: 0;
    min-height: 3.4rem;
    padding: 0.5rem 1rem;
  }

  span {
    @include flex-center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;
  }
}

.products_filer__main {
  margin-bottom: 10rem;
}

.filter-trigger {
  display: none;
  @include bp($point_2) {
    @include flex-start;
    gap: 1rem;
    margin-bottom: 1.7rem;
  }
}

.filter_trigger__icon {
  @include flex-center;
}

.category_drop {
  @include bp($point_2) {
    border-top: 0.1rem solid #888888;
    border-bottom: 0.1rem solid #888888;
  }
}
.size_drop {
  @include bp($point_2) {
    border-bottom: 0.1rem solid #888888;
  }
}

.filters {
  position: relative;
}
</style>
