<template>
  <div class="about">
    <div class="container">
      <div class="about_main mb-18">
        <h1>АСиК - вещи ручной работы с положительной энергетикой</h1>
        <ul class="aboutBlock__list">
          <li class="aboutBlock_item">
            <div class="aboutBlock_item__img">
              <img src="/assets/img/about-1.png" alt="" />
            </div>
            <div class="aboutBlock_content">
              <h2>Начало в Сложные 90-е</h2>
              <p>
                История нашего бренда началась в непростые 90-е годы, когда страна
                переживала период значительных перемен и экономических трудностей. В то
                время у меня было сложное финансовое положение, и чтобы поддержать свою
                семью, я начала заниматься продажей вязаных вещей. Это было не просто
                хобби, а жизненная необходимость, которая помогала свести концы с концами.
                Вязание стало моим спасением, источником дохода и способом выразить свою
                креативность.
              </p>
              <h2>Превращение Хобби в Бизнес</h2>
              <p>
                Спустя годы, то, что начиналось как вынужденная мера, превратилось в нечто
                большее. Вязание стало неотъемлемой частью моей жизни, и я решила
                превратить это увлечение в полноценный бизнес. Осознав, что моя продукция
                пользуется спросом, я начала развивать бренд, расширяя ассортимент и
                улучшая качество изделий.
              </p>
            </div>
          </li>
          <li class="aboutBlock_item">
            <div class="aboutBlock_item__img">
              <img src="/assets/img/about-2.png" alt="" />
            </div>
            <div class="aboutBlock_content">
              <h2>Социальная Миссия</h2>
              <p>
                Однако, моя цель была не только в личном заработке. Я видела, как многие
                женщины вокруг меня также сталкиваются с трудностями и ищут способы
                заработать. Поэтому я решила, что мой бизнес должен стать платформой для
                создания возможностей заработка для других женщин, оказавшихся в трудной
                ситуации. Мы начали привлекать к работе мастериц, обучать их и
                предоставлять материалы для вязания. Таким образом, наш бренд стал не
                просто коммерческим проектом, но и социально значимым предприятием.
              </p>
            </div>
          </li>
          <li class="aboutBlock_item">
            <div class="aboutBlock_item__img">
              <img src="/assets/img/about-3.png" alt="" />
            </div>
            <div class="aboutBlock_content">
              <h2>Сегодня и Завтра</h2>
              <p>
                Сегодня наш бренд АСиК — это не только качественные и стильные изделия, но
                и сообщество женщин, которые поддерживают друг друга и вместе преодолевают
                трудности. Мы гордимся тем, что можем вносить вклад в улучшение жизни
                многих людей и продолжаем развиваться, сохраняя верность нашим ценностям и
                миссии. Мы верим, что в каждой петле наших изделий заключены тепло, забота
                и надежда на лучшее будущее. Наша история — это история о силе духа,
                креативности и взаимопомощи, и мы с гордостью продолжаем писать её вместе
                с вами.
              </p>
            </div>
          </li>
          <li class="aboutBlock_item">
            <div class="aboutBlock_item__img">
              <img src="/assets/img/about-4.png" alt="" />
            </div>
            <div class="aboutBlock_content">
              <p>
                Мы исследовали различные материалы с целью найти идеальный баланс и
                долговечность. Прошли все сложности, чтобы найти для вас лучшую пряжу и
                попасть в самое сердце.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Submission class="mb-18" />
    <Socials class="mb-18" />
  </div>
</template>

<script setup lang="ts">
import Socials from "@/components/blocks/Socials.vue";
import Submission from "@/components/ui/Submission.vue";
useHead({
  title: "О бренде",
});
</script>

<style scoped lang="scss">
.about_main {
  h1 {
    font-size: 4rem;
    font-family: $font_2;
    font-weight: 300;
    text-align: center;
    max-width: 80rem;
    margin: 0 auto 8rem auto;
  }
}

.aboutBlock__list {
  h2 {
    font-size: 3rem;
    font-family: $font_2;
    font-weight: 300;
    padding: 2rem 0;
  }
  p {
    padding: 1rem 0;
  }
  li {
    @include flex-start;
    align-items: flex-start;
    gap: 10rem;
    &:not(:last-child) {
      margin-bottom: 14rem;
    }

    &:nth-child(even) {
      flex-direction: row-reverse;
    }
  }
}

.aboutBlock_content {
  margin-top: -2rem;
}
</style>
