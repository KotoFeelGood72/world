<template>
  <nav class="nav">
    <ul>
      <li v-for="(item, index) in nav" :key="index" class="nav-item">
        <NuxtLink :href="item.link">{{ item.name }}</NuxtLink>
        <ul v-if="item.submenu && item.submenu.length" class="submenu">
          <li v-for="(subItem, subIndex) in item.submenu" :key="subIndex">
            <NuxtLink :href="subItem.link">{{ subItem.name }}</NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

const nav = ref([
  {
    name: "Каталог",
    link: "/shop",
    submenu: [
      { name: "Все товары", link: "/shop/categories" },
      { name: "Новинки", link: "/shop/categories/new" },
      { name: "Бестселлеры", link: "/shop/categories/best" },
      { name: "Аксессуары", link: "/shop/categories/accesories" },
      { name: "Для новорожденных", link: "/shop/categories/kinder" },
      { name: "Для животных", link: "/shop/categories/pets" },
    ],
  },
  {
    name: "Покупателям",
    link: "/",
  },
  {
    name: "О бренде",
    link: "/about",
  },
  {
    name: "Контакты",
    link: "/",
  },
]);
</script>

<style scoped lang="scss">
.nav {
  margin-bottom: -1.5rem;
  & > ul {
    @include flex-start;
    gap: 6.3rem;
    & > li {
      position: relative;
      padding-bottom: 1.5rem;
      & > a {
        transition: all 0.3s ease-in-out;
        border-bottom: 0.1rem solid transparent;
      }
      &:hover {
        & > a {
          border-bottom: 0.1rem solid $black;
        }
        .submenu {
          opacity: 1;
          visibility: visible;
          top: 100%;
        }
      }

      .submenu {
        border: 0.1rem solid $black;
        display: flex;
        position: absolute;
        top: 110%;
        flex-direction: column;
        background-color: $white;
        gap: 0.5rem;
        padding: 2rem;
        min-width: 20.4rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease-in-out;
      }
    }
  }
}

.nav-item {
  a {
    transition: all 0.3s ease-in-out;
    border-bottom: 0.1rem solid transparent;
    &.router-link-active,
    &.router-link-exact-active {
      border-bottom: 0.1rem solid $black;
    }
    &:hover {
      border-bottom: 0.1rem solid $black;
    }
  }
}
</style>
