<template>
  <footer class="footer">
    <div class="container">
      <div class="footer_main">
        <div class="footer_col__info">
          <div class="footer_logo">
            <NuxtLink to="/">
              <img src="/assets/img/logo.png" alt="" />
            </NuxtLink>
          </div>
          <ul>
            <li>Телефон</li>
            <li>Почта</li>
            <li>Адрес?</li>
            <li>Юридическая информация</li>
          </ul>
        </div>
        <div class="footer_col__nav">
          <div class="footer_catalog">
            <p>Каталог</p>
            <ul>
              <li>
                <NuxtLink to="/"> Новинки</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/"> Бестселлеры</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/"> Категории</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="footer_client">
            <p>Клиентам</p>
            <ul>
              <li>
                <NuxtLink to="/"> О бренде</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/"> Доставка и возврат</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/"> Контакты</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <ul class="footer_company__info">
          <li>Телефон</li>
          <li>Почта</li>
          <li>Адрес?</li>
          <li>Юридическая информация</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.footer {
  background-color: $rose;
  padding: 3rem 0 8.4rem 0;
  @include bp($point_2) {
    padding: 4rem 0;
  }
}
.footer_main {
  @include flex-space;
  align-items: flex-start;
  gap: 3rem 16.8rem;
  @include bp($point_2) {
    flex-direction: column;
    gap: 0;
  }
}

.footer_logo {
  margin-bottom: 3.4rem;
  @include bp($point_2) {
    margin-bottom: 0;
    @include flex-center;
    margin: 0 auto;
    max-width: 8.3rem;
  }

  img {
    @include bp($point_2) {
      @include flex-center;
      width: 100%;
      height: 100%;
    }
  }
}
.footer_col__info {
  @include bp($point_2) {
    width: 100%;
  }
  ul {
    @include bp($point_2) {
      display: none;
    }
    li {
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }
}

.footer_col__nav {
  @include flex-start;
  gap: 16.4rem;
  padding-top: 5rem;
  @include bp($point_2) {
    gap: 5.2rem;
    padding: 3.4rem 0 5.1rem 0;
    align-items: flex-start;
  }
  li {
    &:not(:last-child) {
      margin-bottom: 1rem;
      @include bp($point_2) {
        margin-bottom: 0.8rem;
      }
    }
  }
  a {
    font-size: 2rem;
    @include bp($point_2) {
      font-size: 1.4rem;
    }
  }
  p {
    font-size: 3rem;
    font-family: $font_2;
    font-weight: 300;
    margin-bottom: 2rem;
    @include bp($point_2) {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }
}

.footer_company__info {
  display: none;
  @include bp($point_2) {
    display: block;
  }
  li {
    &:not(:last-child) {
      margin-bottom: 0.7rem;
    }
  }
}
</style>
