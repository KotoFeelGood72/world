<template>
  <div class="single">
    <div class="container">
      <div class="single_main__w">
        <div class="single_back">
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
                <SwiperSlide v-for="(item, i) in 4" :key="'single-item-slide-' + i">
                  <img :src="`/assets/img/slider-${i + 1}.png`" alt="" />
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
                <SwiperSlide v-for="(item, i) in 4" :key="'single-item-slide-' + i">
                  <img :src="`/assets/img/slider-${i + 1}.png`" alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div class="single_content">
            <div class="single_content__head">
              <h1>Шапка для новорожденных и малышей</h1>
              <p>Артикул: name</p>
              <div class="price">1 150 ₽</div>
              <div class="single_size">
                <p>Размер</p>
                <Select :options="sizes" v-model="sizeModel" />
              </div>
              <div class="single_color">
                <p>Цвет</p>
                <Select :options="colors" v-model="colorModel" />
              </div>
            </div>
            <div class="single_action">
              <Button name="Добавить в корзину" />
              <div class="single_like">
                <Icon name="custom:heart" size="40" />
              </div>
            </div>
            <div class="single_desc">
              <div class="single_desc__row">
                <span>Состав:</span>
                <p>шерсть мериноса 40%; кашемир 20%; акрил 40%</p>
              </div>
              <div class="single_desc__row">
                <span>Описание:</span>
                <p>
                  Мягкая и комфортная шапочка подходит для младенцев с первых месяцев
                  жизни. Ручная работа. Выполнена без швов, с использованием шерсти
                  мериноса с добавлением кашемира и акрила. Вязаная шапка отлично
                  пропускает воздух, при этом сохраняя внутри тепло. Не колется. В меру
                  эластичная ввиду особенностей узора, не давит на головку малыша. Удобные
                  завязки позволяют регулировать плотность прилегания и обхват, а также
                  ширину шапки в месте их крепления. Универсальные цвета подойдут как
                  девочкам, так и мальчикам. Можно взять на выписку новорожденного в
                  роддом. Необычная форма шапки, которую также называют эльф или гномик,
                  смотрится особенно мило. Кто-то зовет ее шлем или шлемик, поскольку она
                  защищает детскую голову и ушки, в том числе и от продувания ветром в
                  демисезон. Отправляясь на прогулку со своим чадом, родители всегда будут
                  спокойны за его комфорт.
                </p>
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
            v-for="(item, i) in ProductsNew"
            :key="'products-new-item-' + i"
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
import { ProductsNew, ProductsBest } from "@/consts/Products";
import { Swiper, SwiperSlide } from "swiper/vue";
import Button from "~/components/ui/Button.vue";
import Select from "~/components/ui/Select.vue";
import { useCartStore, useCartStoreRefs } from "~/stores/useCartStore";
import { useLikeStore, useLikeStoreRefs } from "~/stores/useLikeStore";
import { useToast } from "vue-toastification";

const toast = useToast();
const { likes } = useLikeStoreRefs();
const { carts } = useCartStoreRefs();
const { addLike, removeLike } = useLikeStore();
const { addCart, removeCart } = useCartStore();

// const isLiked = computed(() => likes.value.some((like) => like.id === props.data.id));
// const isCarts = computed(() => carts.value.some((cart) => cart.id === props.data.id));
// const toggleLike = () => {
//   if (isLiked.value) {
//     removeLike(props.data);
//     toast.error("Удалено из избранного");
//   } else {
//     addLike(props.data);
//     toast.success("Добавлено в избранное");
//   }
// };
// const toggleCart = () => {
//   if (isCarts.value) {
//     removeCart(props.data);
//     toast.error("Убдалено из корзины");
//   } else {
//     addCart(props.data);
//     toast.success("Добавлено в корзину");
//   }
// };
const sizes = ref([
  { value: "32-34", label: "32-34" },
  { value: "34-36", label: "34-36" },
  { value: "38-40", label: "38-40" },
]);
const colors = ref([
  { value: "Красный", label: "Красный" },
  { value: "Белый", label: "Белый" },
  { value: "Синий", label: "Синий" },
]);

const colorModel = ref<any>("Синий");
const sizeModel = ref<any>("32-34");
const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper: any) => {
  thumbsSwiper.value = swiper;
};
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
