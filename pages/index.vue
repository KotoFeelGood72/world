<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <div class="hero_main mb-18">
          <div class="hero_content">
            <h1>Уютный мир вязаных сокровищ: найди свою идеальную вещь!</h1>
            <p>Используем только высококачественный материалы</p>
            <Button name="В каталог" @click="router.push('/shop')" />
          </div>
          <div class="hero_img">
            <img src="/assets/img/hero.png" alt="" />
          </div>
        </div>
      </div>
    </section>
    <ListView title="НОВИНКИ" class="mb-18">
      <ProductsCard
        v-for="(item, i) in ProductsNew"
        :key="'products-new-item-' + i"
        :data="item"
      />
    </ListView>
    <ListView title="бестселлеры" class="mb-18">
      <ProductsCard
        v-for="(item, i) in ProductsBest"
        :key="'products-best-item-' + i"
        :data="item"
      />
    </ListView>
    <ListView title="Категории" class="mb-18">
      <CategoryCard
        v-for="(item, i) in Categories"
        :key="'category-item-' + i"
        :data="item"
      />
    </ListView>
    <section class="history mb-18">
      <div class="container">
        <div class="history_main">
          <div class="history__content">
            <h4>АСиК - РОССИЙСКИЙ БРЕНД, ПРОПИТАННЫЙ ЛЮБОВЬЮ К РУКОДЕЛИЮ</h4>
            <p>
              Мы с увлечением и тщательностью выбираем только лучшие материалы для каждого
              изделия, чтобы оно радовало вас красотой и комфортом.
            </p>
            <Button name="Погрузиться в историю" @click="router.push('/about')" />
          </div>
          <div class="history__img">
            <img src="/assets/img/history.png" alt="" />
          </div>
        </div>
      </div>
    </section>
    <section class="love">
      <div class="container">
        <div class="love_main mb-18">
          <h4>ЛЮБОВЬ В КАЖДОЙ ПЕТЕЛЬКЕ</h4>
          <ul class="love_grid">
            <li class="love_item">
              <div class="love_item__icon">
                <Icon name="custom:love-1" size="64" />
              </div>
              <p>Используем качественные материалы</p>
              <span>приятные на ощупь и безопасные для здоровья</span>
            </li>
            <li class="love_item">
              <div class="love_item__icon">
                <Icon name="custom:love-2" size="64" />
              </div>
              <p>Создаем долговечные изделия</p>
              <span>которые не потеряют форму после первой стирки</span>
            </li>
            <li class="love_item">
              <div class="love_item__icon">
                <Icon name="custom:love-3" size="64" />
              </div>
              <p>Лаконичный дизайн изделий</p>
              <span
                >подойдет под любой образ, от строгого и спокойного до самого
                смелого</span
              >
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="share">
      <div class="container">
        <div class="share_main mb-18">
          <h4>Делимся с вами, как продлить жизнь вашим любимым изделиям</h4>
          <div class="share__accardions">
            <ul class="share_grid">
              <li v-for="(item, i) in sharedColLeft" :key="'shared-item-' + i">
                <Accordion
                  :title="item.title"
                  :id="item.id"
                  :currentOpenId="currentOpenId"
                  @update:currentOpenId="updateCurrentOpenId"
                >
                  <div v-html="item.content"></div>
                </Accordion>
              </li>
            </ul>
            <ul class="share_grid">
              <li v-for="(item, i) in sharedColRight" :key="'shared-item-' + i">
                <Accordion
                  :title="item.title"
                  :id="item.id"
                  :currentOpenId="currentOpenId"
                  @update:currentOpenId="updateCurrentOpenId"
                >
                  <div v-html="item.content"></div>
                </Accordion>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <Reviews class="mb-18" />
    <Submission class="mb-18" />
    <Socials class="mb-18" />
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import ListView from "@/components/list/ListView.vue";
import ProductsCard from "@/components/card/ProductsCard.vue";
import Accordion from "@/components/ui/Accordion.vue";
import Submission from "@/components/ui/Submission.vue";
import Socials from "@/components/blocks/Socials.vue";
import Reviews from "@/components/blocks/Reviews.vue";
import CategoryCard from "@/components/card/CategoryCard.vue";
import { Categories } from "@/consts/Products";
import { ProductsNew, ProductsBest } from "@/consts/Products";
import { sharedColLeft, sharedColRight } from "@/consts/Shared";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

useHead({
  title: "Главная",
});

const currentOpenId = ref<number | null>(null);

const updateCurrentOpenId = (id: number | null) => {
  currentOpenId.value = id;
};
</script>

<style scoped lang="scss">
.hero_main {
  @include flex-start;
  gap: 2rem;
  height: 55.7rem;

  @include bp($point_2) {
    flex-direction: column;
    height: auto;
    gap: 1.5rem;
  }
  & > div {
    width: 50%;
    @include bp($point_2) {
      width: 100%;
    }
  }
}

.hero_content {
  background-color: $light;
  @include flex-end;
  flex-direction: column;
  align-items: flex-start;
  padding: 4.9rem 3.1rem;
  height: 100%;

  @include bp($point_2) {
    text-align: center;
    align-items: center;
    padding: 4rem 0.7rem;
  }

  h1 {
    font-size: 3rem;
    font-family: $font_2;
    text-transform: uppercase;
    font-weight: 400;
    margin-bottom: 2rem;
    @include bp($point_2) {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
  }
  p {
    margin-bottom: 6rem;
    @include bp($point_2) {
      font-size: 1.4rem;
      margin-bottom: 2.5rem;
    }
  }
}

.hero_img {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.history_main {
  @include flex-start;
  gap: 5rem;
  @include bp($point_2) {
    flex-direction: column;
  }
}
.history__content {
  @include bp($point_2) {
    text-align: center;
  }
  h4 {
    font-size: 3.5rem;
    font-weight: 400;
    font-family: $font_2;
    margin-bottom: 1.5rem;
    // text-transform: uppercase;
    line-height: 100%;
    @include bp($point_2) {
      font-size: 2rem;
    }
  }
  p {
    font-size: 2rem;
    margin-bottom: 5.5rem;
    @include bp($point_2) {
      font-size: 1.4rem;
      margin-bottom: 3.5rem;
    }
  }
  :deep(.button button) {
    @include bp($point_2) {
      padding: 1.1rem 1.3rem;
      font-size: 1.2rem;
    }
  }
}

.history__img {
  width: 100%;
  height: auto;
  max-width: 40rem;
  @include bp($point_2) {
    max-width: 100%;
  }
  img {
    width: 100%;
  }
}

.love_main {
  h4 {
    font-size: 4rem;
    text-transform: uppercase;
    text-align: center;
    font-family: $font_2;
    font-weight: 300;
    margin-bottom: 7.4rem;
    @include bp($point_2) {
      font-size: 2rem;
      margin-bottom: 2.9rem;
      text-align: left;
    }
  }
}

.love_grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(26%, 1fr));
  grid-gap: 5.6rem;
  @include bp($point_2) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    gap: 1rem;
  }
  li {
    background-color: $rose;
    border: 0.2rem solid $black;
    padding: 5rem 2rem;
    @include bp($point_2) {
      padding: 4rem 2рем;
    }
    p {
      font-size: 2.3rem;
      font-family: $font_2;
      margin-bottom: 2rem;
      line-height: 100%;
      @include bp($point_2) {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
      }
    }
    span {
      font-size: 1.8rem;
      line-height: 100%;
      @include bp($point_2) {
        font-size: 1rem;
      }
    }
  }

  .love_item__icon {
    margin-bottom: 5rem;
    @include bp($point_2) {
      margin-bottom: 1.5rem;
      width: 3.7rem;
      height: 3.7rem;
      @include flex-center;
    }
  }
}

.share_main {
  h4 {
    font-size: 4rem;
    font-weight: 400;
    font-family: $font_2;
    margin-bottom: 6rem;
    line-height: 100%;
    text-transform: uppercase;
    @include bp($point_2) {
      font-size: 2rem;
      margin-bottom: 3rem;
    }
  }
}

.share_grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  grid-gap: 2rem 13rem;
  width: 100%;

  @include bp($point_2) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    grid-gap: 2rem;
  }
}

.share__accardions {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0 4rem;
  @include bp($point_2) {
    gap: 2rem 0;
    flex-direction: column;
  }
  & > div {
    width: 50%;
  }
}
</style>
