<template>
  <div class="favorite">
    <div class="container">
      <div class="favorite__main mb-18">
        <h2 v-if="likes.length > 0">Ваше избранное</h2>
        <ul class="favorite__list" v-if="likes.length > 0">
          <li
            class="favorite_item"
            v-for="item in likes"
            :key="'favorite-item' + item.id"
          >
            <div class="favorite_item__img">
              <img :src="`/assets/img/products/product-${item.img}.png`" alt="" />
            </div>
            <div class="favorite_item__content">
              <p>{{ item.title }}</p>
              <ul>
                <li>Размер: 36-38</li>
                <li>Цвет: голубой</li>
              </ul>
            </div>
            <div class="favorite_item__btn">
              <Button
                :name="isInCart(item) ? 'Товар в корзине' : 'Добавить в корзину'"
                :active="isInCart(item)"
                @click="toggleCart(item)"
              />
            </div>
            <div class="favorite_delete" @click="removeLike(item)">
              <Icon name="lets-icons:close-round" size="25" />
            </div>
          </li>
        </ul>
        <div class="favorite_empty" v-if="likes.length <= 0">
          <Empty />
        </div>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { computed } from 'vue';
import Button from "@/components/ui/Button.vue";
import { useLikeStore, useLikeStoreRefs } from "@/stores/useLikeStore";
import { useCartStore, useCartStoreRefs } from "~/stores/useCartStore";
import { useToast } from 'vue-toastification';
import Empty from "~/components/shared/Empty.vue";

const { likes } = useLikeStoreRefs();
const { removeLike } = useLikeStore();
const toast = useToast();
const { addCart, removeCart } = useCartStore();
const { carts } = useCartStoreRefs();

const isInCart = (item: any) => {
  return carts.value.some((cart) => cart.id === item.id);
};

const toggleCart = (item: any) => {
  if (isInCart(item)) {
    removeCart(item);
    toast.error("Удалено из корзины");
  } else {
    addCart(item);
    toast.success("Добавлено в корзину");
  }
};

useHead({
  title: "Избранное",
});
</script>


<style scoped lang="scss">
.favorite__main {
  h2 {
    font-size: 3rem;
    font-family: $font_2;
    font-weight: 300;
    margin-bottom: 5rem;
  }

  :deep(.button button) {
    padding: 1.9rem 5rem;
  }
}
.favorite__list {
  & > li {
    @include flex-start;
    border-bottom: 0.1rem solid #888888;
    padding: 2.7rem 6.4rem 2.7rem 0.7rem;
    position: relative;
    gap: 3rem;
    
    @include bp($point_2) {
      flex-wrap: wrap;
      gap: 2.6rem;
      padding: 3.9rem 0;
    }
    :deep(.button button) {
      @include bp($point_2) {
        padding: 1.1rem 3.7rem;
        font-size: 1.2rem;
      }
    }
    &:nth-child(1) {
      border-top: 0.1rem solid #888888;
    }
  }
}

.favorite_item__img {
  width: 12rem;
  height: 12rem;
  @include bp($point_2) {
    min-width: 8rem;
    width: 8rem;
    height: 8rem;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.favorite_item__content {
  margin-right: 5rem;
  flex-grow: 1;
  @include bp($point_2) {
    margin-right: 0;
  }
  p {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    @include bp($point_2) {
      font-size: 1.4rem;
      margin-bottom: 0.6rem;
    }
  }
  ul {
    li {
      font-size: 2rem;
      color: #888888;
      @include bp($point_2) {
        font-size: 1.2rem;
      }
      &:not(:last-child) {
        margin-bottom: 0.2rem;
      }
    }
  }
}

.favorite_delete {
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  @include bp($point_2) {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    padding: .2rem;
    color: #888888;
    border: .1rem solid #888888;
    @include flex-center;
    border-radius: 100%;
  }
  &:hover {
    color: rgb(247, 49, 49);
  }
}

.favorite_empty {
  @include flex-center;
}

.favorite_item__btn {
  @include bp($point_2) {
    @include flex-center;
    width: 100%;
    flex-grow: 1;
  }
}
</style>


