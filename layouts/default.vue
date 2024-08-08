<template>
  <main class="main">
    <Header />
    <div class="content">
      <Breadcrumb v-if="isHome" :breadcrumbs="isBread" />
      <slot />
    </div>
    <Footer />
  </main>
</template>

<script setup lang="ts">
import Header from "@/components/shared/Header.vue";
import Footer from "@/components/shared/Footer.vue";
import Breadcrumb from "@/components/ui/Breadcrumb.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const isHome = computed(() => route.name != "index");

const isBread = computed(() => {
  switch (route.name) {
    case "shop":
      return [{ path: "/shop", title: "Категории" }];
    case "shop-categories":
      return [{ path: "/shop", title: "Каталог" }];
    case "shop-categories-categoryId":
      return [
        { path: "/shop/", title: `Каталог` },
        { path: route.path, title: `Категория ${route.params.categoryId}` },
      ];
    case "delivery":
      return [{ path: "/delivery", title: "Доставка и возврат" }];
    case "about":
      return [{ path: "/about", title: "О бренде" }];
    case "favorite":
      return [{ path: "/favorite", title: "Избранное" }];
    case "cart":
      return [{ path: "/cart", title: "Заказы" }];
    case "shop-categories-categoryId-products-slug":
      return [
        { path: "/shop", title: "Каталог" },
        { path: "/cart", title: "Категория" },
        { path: "/cart", title: "Товар" },
      ];
    default:
      break;
  }
});
</script>

<style scoped lang="scss">
.content {
  @include bp($point_2) {
    padding-top: 9.6rem;
  }
}
</style>
