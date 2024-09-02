<!-- @format -->

<template>
  <header :class="['header', { 'fixed-header': isFixed }]">
    <div class="container">
      <div class="header_main">
        <div class="header_logo">
          <NuxtLink to="/">
            <img src="/assets/img/logo.png" alt="" />
          </NuxtLink>
        </div>
        <Nav class="header_nav" />
        <div class="header_actions">
          <ul>
            <li @click.stop="openModal('search')">
              <Icon name="custom:search" size="24" />
            </li>
            <li>
              <nuxt-link to="/favorite">
                <Icon name="custom:heart" size="24" />
                <div class="counter" v-if="isLikesLength">
                  {{ isLikesLength }}
                </div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/cart">
                <Icon name="custom:bag" size="24" />
                <div class="counter" v-if="isCartsLength">
                  {{ isCartsLength }}
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="burger-btn" @click="openModal('burger')">
          <Icon name="custom:burger" size="16" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Nav from "@/components/ui/Nav.vue";
import { useToast } from "vue-toastification";
import { useLikeStoreRefs } from "@/stores/useLikeStore";
import { useCartStoreRefs } from "~/stores/useCartStore";
import { useModalStore } from "~/stores/useModalStore";

const { likes } = useLikeStoreRefs();
const { carts } = useCartStoreRefs();
const { openModal } = useModalStore();

const isLikesLength = computed(() => likes.value.length);
const isCartsLength = computed(() => carts.value.length);

const toast = useToast();

const isFixed = ref(false);

const handleScroll = () => {
  if (window.scrollY > 0) {
    isFixed.value = true;
  } else {
    isFixed.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  z-index: 1000;
  transition: height 0.3s ease-in-out;
  position: fixed;
  z-index: 999;
  background-color: $white;
  @include bp($point_2, $direction: min) {
    height: $header;
  }
  &.fixed-header {
    background-color: $white;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 0.1rem solid #8888883f;
    @include bp($point_2, $direction: min) {
      height: 10rem;
      .header_logo {
        width: 8rem;
        transition: all 0.3s ease;
      }
      .header_main {
        padding: 2rem 0;
      }
    }
  }
}

.header_main {
  @include flex-space;
  padding: 4.9rem 0;
  transition: padding 0.3s ease-in-out;
  @include bp($point_2) {
    padding: 2rem 0;
  }
}

.header_actions {
  @include bp($point_2) {
    flex-grow: 1;
    width: 100%;
    margin-right: 2.3rem;
  }
  ul {
    @include flex-start;
    gap: 1.5rem;
    @include bp($point_2) {
      gap: 1.2rem;
      justify-content: flex-end;
      flex-grow: 1;
      width: 100%;
    }
    li {
      cursor: pointer;
      position: relative;
      @include bp($point_2) {
        width: 2rem;
        height: 2rem;
        @include flex-center;
      }
      a,
      span {
        @include bp($point_2) {
          @include flex-center;

          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.counter {
  position: absolute;
  bottom: 0;
  right: -0.6rem;
  width: 1.6rem;
  height: 1.6rem;
  background-color: $light;
  border-radius: 100%;
  font-size: 1rem;
  @include flex-center;
  @include bp($point_2) {
    font-size: 0.8rem;
    width: 1.2rem;
    height: 1.2rem;
  }
}

.header_logo {
  width: 10.2rem;
  transition: all 0.3s ease;
  @include bp($point_2) {
    max-width: 4.7rem;
  }
  a {
    @include flex-center;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

.header_nav {
  @include bp($point_2) {
    display: none;
  }
}

.burger-btn {
  display: none;
  @include bp($point_2) {
    @include flex-center;
    cursor: pointer;
  }
}
</style>
