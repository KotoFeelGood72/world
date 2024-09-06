<!-- @format -->

<template>
  <div class="products" v-if="data">
    <NuxtLink :to="`/shop/categories/${data.category}/products/${data.slug}`">
      <div class="products_cardImg__w">
        <div
          class="products_like"
          :class="{ active: isLiked }"
          @click.prevent="toggleLike"
        >
          <Icon name="ph:heart-light" size="26" />
        </div>
        <div class="products_card__img">
          <img :src="`${data.image}`" />
        </div>
      </div>
      <div class="products__content">
        <h3>{{ data.name }}</h3>
        <div class="price">{{ data.price }} ₽</div>
        <Button
          @click.prevent="toggleCart"
          :name="isCarts ? 'Товар в корзине' : 'Добавить в корзину'"
          :active="isCarts"
        />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import { computed, defineEmits } from "vue";
import { useLikeStore, useLikeStoreRefs } from "@/stores/useLikeStore";
import { useCartStore, useCartStoreRefs } from "@/stores/useCartStore";
import { useToast } from "vue-toastification";

const props = defineProps<{
  data: any;
}>();

const toast = useToast();
const { likes } = useLikeStoreRefs();
const { carts } = useCartStoreRefs();
const { addLike, removeLike } = useLikeStore();
const { addCart, removeCart } = useCartStore();

const isLiked = computed(() =>
  likes.value.some((like: any) => like.id === props.data.id)
);
const isCarts = computed(() =>
  carts.value.some((cart: any) => cart.id === props.data.id)
);

const emit = defineEmits(["onClick"]);
const toggleLike = () => {
  if (isLiked.value) {
    removeLike(props.data);
    toast.error("Удалено из избранного");
  } else {
    addLike(props.data);
    toast.success("Добавлено в избранное");
  }
};
const toggleCart = () => {
  if (isCarts.value) {
    removeCart(props.data);
    toast.error("Убдалено из корзины");
  } else {
    addCart(props.data);
    toast.success("Добавлено в корзину");
  }
};
</script>

<style scoped lang="scss">
.products_cardImg__w {
  position: relative;
  width: 100%;
  @include flex-center;
}

.products_like {
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  width: 3rem;
  height: 3rem;
  @include flex-center;
  background-color: $white;
  border-radius: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  z-index: 90;

  @include bp($point_2) {
    width: 2rem;
    height: 2rem;
    padding: 0.3rem;
  }

  &:hover {
    background-color: #ffffff88;
  }
  &.active {
    background-color: $rose;
    color: #969696;
  }
}

.products_card__img {
  width: 100%;
  height: 100%;
  @include flex-center;
  position: relative;
  overflow: hidden;
  &:hover {
    img {
      transform: scale(1.1);
    }
  }
  img {
    height: 100%;
    width: 100%;
    transition: transform 0.8s ease-in-out;
  }
}

.products {
  a {
    @include flex-center;
    flex-direction: column;
    gap: 3rem;
    text-align: center;
    @include bp($point_2) {
      gap: 1rem;
    }
  }
}

.products__content {
  h3 {
    font-size: 2rem;
    font-weight: 300;
    margin-bottom: 1.4rem;
    @include bp($point_2) {
      font-size: 1.2rem;
    }
  }
  .price {
    font-size: 3.5rem;
    font-weight: 300;
    margin-bottom: 3rem;
    @include bp($point_2) {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }
  }
  :deep(.button button) {
    text-transform: none;
    padding: 1.9rem 4.3rem;
    @include bp($point_2) {
      padding: 1rem 1rem;
      font-size: 1.4rem;
    }
  }
}
</style>
