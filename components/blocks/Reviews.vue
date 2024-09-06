<template>
  <section class="reviews" v-if="option">
    <div class="container">
      <div class="reviews_main">
        <h4>{{ option.reviews_title }}</h4>
        <ul class="reviews_grid">
          <li
            class="reviews_item"
            v-for="(item, i) in option.reviews_list"
            :key="'reviews-item' + i"
          >
            <div class="reviews_item__img">
              <img :src="item.kartinka" />
            </div>
            <p>{{ item.txt }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGlobalStoreRefs } from "~/stores/useGlobalStore";
const { option } = useGlobalStoreRefs();
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
