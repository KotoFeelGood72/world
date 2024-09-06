<!-- @format -->

<template>
  <div class="single" v-if="product && product.acf">
    <div class="container">
      <div class="single_main__w">
        <div class="single_back" @click="router.go(-1)">
          <Icon name="teenyicons:arrow-left-outline" size="24" />
          <p>Назад</p>
        </div>
        <div class="single_main">
          <div class="single_slider__w">
            <div class="single_slider">
              <Swiper
                :slides-per-view="1"
                :space-between="20"
                :modules="[Navigation, Thumbs]"
                :thumbs="{ swiper: thumbsSwiper }"
                :autoHeight="true"
                :navigation="{
                  prevEl: `.single_prev`,
                  nextEl: `.single_next`,
                }"
              >
                <SwiperSlide
                  v-for="(image, i) in product.gallery"
                  :key="'single-item-slide-' + i"
                >
                  <img :src="image" alt="" />
                </SwiperSlide>
              </Swiper>
              <div class="single_navigation">
                <div class="single_prev">
                  <Icon name="system-uicons:chevron-left" size="30" />
                </div>
                <div class="single_next">
                  <Icon name="system-uicons:chevron-right" size="30" />
                </div>
              </div>
            </div>
            <div class="single_thumb">
              <Swiper
                :slides-per-view="3"
                :space-between="31"
                :modules="[Thumbs]"
                :breakpoints="{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 31,
                  },
                }"
                watch-slides-progress
                @swiper="setThumbsSwiper"
              >
                <SwiperSlide
                  v-for="(image, i) in product.gallery"
                  :key="'single-thumb-slide-' + i"
                >
                  <img :src="image" alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div class="single_content">
            <div class="single_content__head">
              <h1>{{ product.title }}</h1>
              <p>Артикул: {{ product.sku }}</p>
              <div class="price">{{ product.price }} ₽</div>
              <div class="single_size" v-if="sizes.length">
                <p>Размер</p>
                <Select :options="sizes" v-model="sizeModel" />
              </div>
              <div class="single_color" v-if="colors.length">
                <p>Цвет</p>

                <Select :options="colors" v-model="colorModel" />
              </div>
            </div>
            <div class="single_action">
              <Button
                :name="isInCart ? 'Товар в корзине' : 'Добавить в корзину'"
                @click="toggleCart"
                :disabled="isInCart"
                :active="isInCart"
              />
              <div
                class="single_like"
                @click="toggleLike"
                :class="{ active: isLiked }"
              >
                <Icon
                  :name="isLiked ? 'ph:heart-fill' : 'ph:heart-light'"
                  size="60"
                />
              </div>
            </div>
            <div class="single_desc">
              <div class="single_desc__row">
                <span>Состав:</span>
                <p>{{ product.acf.content.short_description }}</p>
              </div>
              <div class="single_desc__row">
                <span>Описание:</span>
                <p>{{ product.acf.content.txt }}</p>
              </div>
            </div>
          </div>
        </div>
        <ListView
          title="Вам также может понравиться"
          class="mb-18"
          style="text-align: center"
        >
          <ProductsCard
            v-for="(item, i) in product.upsell_products"
            :key="'upsell-product-' + i"
            :data="item"
          />
        </ListView>
        <Submission class="mb-18" />
        <Socials class="mb-18" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Navigation, Thumbs } from "swiper/modules";
import Socials from "~/components/blocks/Socials.vue";
import Submission from "~/components/ui/Submission.vue";
import ListView from "~/components/list/ListView.vue";
import ProductsCard from "~/components/card/ProductsCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import Button from "~/components/ui/Button.vue";
import Select from "~/components/ui/Select.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useCartStore, useCartStoreRefs } from "~/stores/useCartStore";
import { useLikeStore, useLikeStoreRefs } from "~/stores/useLikeStore";
import { useGlobalStoreRefs } from "~/stores/useGlobalStore";

const product = ref<any>(null);
const sizes = ref<any[]>([]);
const colors = ref<any[]>([]);
const sizeModel = ref<any>(null);
const colorModel = ref<any>(null);
const route = useRoute();
const router = useRouter();
const toast = useToast();
const thumbsSwiper = ref(null);

const { addCart, removeCart } = useCartStore();
const { carts } = useCartStoreRefs();
const { addLike, removeLike } = useLikeStore();
const { likes } = useLikeStoreRefs();
const { load } = useGlobalStoreRefs();

const isInCart = computed(() =>
  carts.value.some((cart: any) => cart.id === product.value.id)
);
const isLiked = computed(() =>
  likes.value.some((like: any) => like.id === product.value.id)
);

const setThumbsSwiper = (swiper: any) => {
  thumbsSwiper.value = swiper;
};

const toggleCart = () => {
  // Перебираем ключи объекта attributes
  const selectedAttributes = Object.keys(product.value.attributes).map(
    (key) => {
      const attr = product.value.attributes[key];

      // Проверяем, является ли текущий атрибут цветом или размером
      const selectedOption =
        key === "pa_color" ? colorModel.value : sizeModel.value;
      const selectedValue = attr.find(
        (value: any) => value.id === selectedOption
      );

      return {
        name: key, // Ключ атрибута (например, pa_color или pa_size)
        option: selectedValue ? selectedValue.name : null, // Имя атрибута
        id: selectedValue ? selectedValue.id : null, // ID атрибута
      };
    }
  );

  const selectedProduct = {
    id: product.value.id,
    quantity: 1,
    slug: product.value.slug,
    price: product.value.price,
    name: product.value.name,
    image: (product.value as any).gallery[0],
    attributes: {
      default_attributes: selectedAttributes,
    },
  };

  if (isInCart.value) {
    removeCart(selectedProduct);
    toast.error("Товар удален из корзины.");
  } else {
    addCart(selectedProduct);
    toast.success("Товар добавлен в корзину.");
  }
};

const toggleLike = () => {
  // Перебираем ключи объекта attributes
  const selectedAttributes = Object.keys(product.value.attributes).map(
    (key) => {
      const attr = product.value.attributes[key];

      // Проверяем, является ли текущий атрибут цветом или размером
      const selectedOption =
        key === "pa_color" ? colorModel.value : sizeModel.value;
      const selectedValue = attr.find(
        (value: any) => value.id === selectedOption
      );

      return {
        name: key, // Используем ключ как имя атрибута (например, pa_color или pa_size)
        option: selectedValue ? selectedValue.name : null, // Возвращаем имя атрибута, если найдено
        id: selectedValue ? selectedValue.id : null, // Возвращаем ID атрибута
      };
    }
  );

  const selectedProduct = {
    id: product.value.id,
    quantity: 1,
    slug: product.value.slug,
    price: product.value.price,
    title: product.value.title,
    thumbnail: product.value.gallery[0], // Предполагаем, что gallery содержит изображения
    attributes: {
      default_attributes: selectedAttributes,
    },
  };

  // Проверяем, добавлен ли продукт в избранное
  if (isLiked.value) {
    removeLike(selectedProduct);
    toast.error("Товар удален из избранного.");
  } else {
    addLike(selectedProduct);
    toast.success("Товар добавлен в избранное.");
  }
};

async function getProduct() {
  const { $custom } = useNuxtApp();

  try {
    const response = await $custom.get(`/${route.params.slug}.json`);
    product.value = response.data;

    useHead({
      title: product.value.title || "Товар",
    });

    // Проверка и сбор атрибутов, если они есть
    if (product.value.attributes) {
      // Доступ к атрибуту размера
      const sizeAttr = product.value.attributes.pa_size;
      // Доступ к атрибуту цвета
      const colorAttr = product.value.attributes.pa_color;

      // Проверка и обработка размеров
      if (sizeAttr) {
        sizes.value = sizeAttr.map((value: any) => ({
          label: value.name,
          value: value.id,
        }));
        sizeModel.value = sizes.value[0]?.value || null;
      }

      // Проверка и обработка цветов
      if (colorAttr) {
        colors.value = colorAttr.map((value: any) => ({
          label: value.name,
          value: value.id,
        }));
        colorModel.value = colors.value[0]?.value || null;
      }
    }
  } catch (error) {
    toast.error("Ошибка при загрузке товара.");
  } finally {
    load.value = false;
  }
}

onMounted(async () => {
  await getProduct();
});
</script>

<style scoped lang="scss">
.single_main {
  @include flex-start;
  align-items: flex-start;
  gap: 5.6rem;
  margin-bottom: 15.5rem;

  @include bp($point_2) {
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 8rem;
  }
}

.single_slider__w {
  max-width: 50rem;
  position: sticky;
  top: 2rem;
  @include bp($point_2) {
    max-width: 100%;
    position: static;
  }
}

.single_slider {
  position: relative;
  margin-bottom: 2.5rem;
  @include bp($point_2) {
    margin-bottom: 1rem;
  }
  :deep(.swiper-slide) {
    @include flex-center;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.single_thumb {
  :deep(.swiper-slide) {
    height: 12.8rem;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.single_navigation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @include flex-space;
  z-index: 99;
  width: 100%;
  padding: 0 2rem;
  pointer-events: none;
  div {
    pointer-events: all;
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    background-color: $white;
    @include flex-center;
    cursor: pointer;
  }
}

.single_action {
  @include flex-start;
  gap: 2.4rem;

  :deep(.button button) {
    @include bp($point_2) {
      font-size: 1.2rem;
      padding: 1.1rem 3.7rem;
    }
  }
}

.single_content__head {
  padding-bottom: 3.5rem;
  h1 {
    font-size: 2.5rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
    @include bp($point_2) {
      font-size: 2rem;
    }
  }
  p {
    color: #888888;
    margin-bottom: 1.1rem;
    @include bp($point_2) {
      font-size: 1.4rem;
    }
  }

  .price {
    font-size: 3.5rem;
    font-weight: 300;
    margin-bottom: 4.4rem;
    @include bp($point_2) {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
    }
  }
}

.single_size,
.single_color {
  p {
    font-size: 2rem;
    margin-bottom: 1rem;
    @include bp($point_2) {
      font-size: 1.4rem;
    }
  }
}

.single_size {
  margin-bottom: 1.5rem;
}
.single_action {
  margin-bottom: 4rem;
}

.single_back {
  @include flex-start;
  gap: 1rem;
  font-size: 2rem;
  cursor: pointer;
  margin-bottom: 7.6rem;
  margin-top: -3rem;
  @include bp($point_2) {
    margin-top: -0.5rem;
    margin-bottom: 2.5rem;
  }
}

.single_like {
  @include flex-center;
  cursor: pointer;
  @include bp($point_2) {
    width: 3rem;
    height: 3rem;
    @include flex-center;
  }
}

.single_desc {
  font-size: 2rem;
  @include bp($point_2) {
    font-size: 1.4rem;
  }
  .single_desc__row {
    &:first-child {
      margin-bottom: 2rem;
    }
    span {
      margin-bottom: 1rem;
      color: #888888;
    }
  }
}
</style>
