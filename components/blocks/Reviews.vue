<template>
  <section class="reviews">
    <div class="container">
      <div class="reviews_main">
        <h4>Отзывы наших покупателей</h4>
        <ul class="reviews_grid">
          <li class="reviews_item" v-for="(item, i) in reviews" :key="'reviews-item' + i">
            <div class="reviews_item__img">
              <img :src="`/assets/img/user-${item.img}.png`" alt="" />
            </div>
            <p>{{ item.txt }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const reviews = ref<any>([
  {
    img: "0",
    txt:
      "“Шапочка отличная, интересный фасон, без утеплителя, на весну прекрасный вариант. Размер соответствует. Внутри нет швов, что очень важно для новорожденных”",
  },
  {
    img: "1",
    txt:
      "“Очень хорошая шапочка, ребенок даже не сопротивлялся ее надевать. Ушки плотно закрывает, тактильно приятная. Возьму сразу еще другие цвета размером побольше!”",
  },
  {
    img: "2",
    txt:
      "“Я влюбилась в комплект (шапка и шарф)! Идеальный цвет, удобно и мягко прилегают к телу. Вещи отлично прошли тест-драйв стиркой! Закажу еще в другом цвете, дочка тоже захотела себе такой комплект”",
  },
]);
</script>

<style scoped lang="scss">
.reviews_main {
  h4 {
    font-size: 4rem;
    font-family: $font_2;
    font-weight: 300;
    text-transform: uppercase;
    margin-bottom: 6rem;
    @include bp($point_2) {
      font-size: 2rem;
      margin-bottom: 3rem;
    }
  }
}

.reviews_grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  grid-gap: 4rem;
  @include bp($point_2) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    grid-gap: 1rem;
  }
  li {
    border: 0.2rem solid $black;
    padding: 8.5rem 2rem 2rem 2rem;
    font-size: 2rem;
    @include bp($point_2) {
      padding: 4rem 2rem 2rem 2rem;
      font-size: 1.4rem;
    }
  }
}

.reviews_item__img {
  margin-bottom: 1.6rem;
  img {
    @include bp($point_2) {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  @include bp($point_2) {
    max-width: 5rem;
    @include flex-center;
  }
}
</style>
