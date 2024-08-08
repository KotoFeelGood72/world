<template>
  <div class="submission">
    <div class="container">
      <div class="submission__main">
        <h5>Подписка на рассылку</h5>
        <div class="submission_form__w">
          <p>Обещаем, что будем отправлять только самые интересные сообщения</p>
          <div class="submission_form">
            <div class="submission__input">
              <input type="email" placeholder="e-mail" />
            </div>
            <Button name="ПОДПИСАТЬСЯ" @click="openSubmission()" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import { useToast } from "vue-toastification";

const toast = useToast();

function openSubmission() {
  toast.success("Вы успешно подписались");
}
</script>

<style scoped lang="scss">
.submission__main {
  h5 {
    font-size: 4rem;
    text-transform: uppercase;
    font-family: $font_2;
    font-weight: 300;
    text-align: center;
    margin-bottom: 6rem;
    @include bp($point_2) {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }
  }
}
.submission_form__w {
  @include flex-center;
  gap: 2rem 9rem;
  align-items: flex-start;
  @include bp($point_2) {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
    width: 100%;
  }
  p {
    font-size: 2.5rem;
    max-width: 47.5rem;
    @include bp($point_2) {
      font-size: 1.4rem;
      max-width: 100%;
    }
  }
}

.submission_form {
  flex-grow: 1;
  @include bp($point_2) {
    width: 100%;
  }
  :deep(.button button) {
    @include bp($point_2) {
      font-size: 1.2rem;
      padding: 1.1rem 4.8rem;
    }
  }
}
.submission__input {
  margin-bottom: 4rem;
  width: 100%;
  @include bp($point_2) {
    margin-bottom: 2rem;
  }
  input {
    width: 100%;
    @include app;
    font-size: 3rem;
    border: 0.1rem solid $black;
    padding: 1.4rem 4rem;
    @include bp($point_2) {
      font-size: 1.2rem;
      padding: 0.7rem 1.6rem;
    }
    &::-webkit-input-placeholder {
      color: #cccccc;
      opacity: 1;
    }
  }
}

.submission_form {
  @include flex-center;
  flex-direction: column;
}
</style>
