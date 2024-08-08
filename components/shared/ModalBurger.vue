<template>
  <div class="burger">
    <div class="burger-close" @click="closeModal('burger')">
      <Icon name="material-symbols:close" size="32" />
    </div>
    <div class="burger-logo">
      <NuxtLink>
        <img src="/assets/img/logo.png" alt="" />
      </NuxtLink>
    </div>
    <div class="burger-nav">
      <div class="nav-col">
        <p>Каталог</p>
        <ul>
          <li><NuxtLink to="/shop/categories/new"> Новинки </NuxtLink></li>
          <li><NuxtLink to="/shop/categories/best"> Бестселлеры </NuxtLink></li>
          <li><NuxtLink to="/shop/categories/accesories"> Аксессуары </NuxtLink></li>
          <li><NuxtLink to="/shop/categories/kinder"> Для новорожденных </NuxtLink></li>
          <li><NuxtLink to="/shop/categories/dog"> Для животных </NuxtLink></li>
        </ul>
      </div>
      <div class="nav-col">
        <p>Клиентам</p>
        <ul>
          <li><NuxtLink to="/delivery"> Доставка и оплата </NuxtLink></li>
          <li><NuxtLink to="/about"> О бренде </NuxtLink></li>
          <li><NuxtLink to="/"> Контакты </NuxtLink></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { useModalStore, useModalStoreRefs } from "~/stores/useModalStore";

const {  closeModal } = useModalStore();
const { modals } = useModalStoreRefs();
const router = useRouter();

watch(
  () => router.currentRoute.value.fullPath,
  (newPath, oldPath) => {
    if (modals.value.burger) {
      closeModal('burger');
    }
  }
);
</script>


<style scoped lang="scss">
.burger {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: $white;
  @include flex-start;
  flex-direction: column;
  align-items: flex-end;
  padding: 3.5rem 6rem;
  z-index: 9999;
}

.burger-logo {
  max-width: 7.2rem;
  margin-bottom: 2.3rem;
  a,
  img {
    @include flex-center;
    width: 100%;
    height: 100%;
  }
}

.burger-nav {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  p {
    font-size: 2rem;
    margin-bottom: 1.1rem;
  }
  ul {
    li {
      font-size: 1.6rem;
      &:not(:last-child) {
        margin-bottom: 0.8rem;
      }
    }
  }
}

.burger-close {
  @include flex-center;
  margin-bottom: 3.5rem;
}
</style>
