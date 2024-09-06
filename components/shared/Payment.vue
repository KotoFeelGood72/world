<template>
  <div class="payment">
    <div class="payment__row">
      <div class="payment__col">
        <h3>Контактная информация</h3>
        <div class="payment__form">
          <Inputs v-model="paymentData.name" placeholder="Имя" />
          <Inputs v-model="paymentData.phone" placeholder="Телефон" />
          <Inputs v-model="paymentData.email" placeholder="Почта" />
          <Inputs v-model="paymentData.address" placeholder="Адрес" />
        </div>
        <h4>Стоимость: {{ price }} руб.</h4>
      </div>
      <div class="payment__col">
        <h3>Способ доставки</h3>
        <div class="payment__options first">
          <input
            id="sdek"
            type="radio"
            v-model="paymentData.deliveryMethod"
            value="СДЕК"
            name="delivery"
          />
          <label for="sdek"> СДЕК </label>
          <input
            id="mail"
            type="radio"
            name="delivery"
            v-model="paymentData.deliveryMethod"
            value="Почта"
          />
          <label for="mail"> Почта </label>
        </div>

        <h3>Способ оплаты:</h3>
        <div class="payment__options">
          <input
            type="radio"
            id="site"
            v-model="paymentData.paymentMethod"
            value="на сайте"
            name="payment"
          />
          <label for="site"> на сайте </label>
          <input
            id="complete"
            type="radio"
            v-model="paymentData.paymentMethod"
            name="payment"
            value="при получении"
          />
          <label for="complete"> при получении </label>
        </div>
      </div>
    </div>

    <div class="cart_pay" v-if="carts.length > 0" @click="submitOrder">
      <Button name="Перейти к оплате" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Inputs from "../ui/Inputs.vue";
import Button from "../ui/Button.vue";
import { useCartStoreRefs } from "~/stores/useCartStore";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const { carts } = useCartStoreRefs();

const toast = useToast();
const router = useRouter();

// Моделируем данные формы оплаты
const paymentData = ref({
  name: "",
  phone: "",
  email: "",
  address: "",
  deliveryMethod: "СДЕК",
  paymentMethod: "на сайте",
});

// Входящие пропсы
const props = defineProps<{
  price: any;
}>();

// Функция для создания заказа в WooCommerce
const submitOrder = async () => {
  try {
    // Собираем все данные для заказа
    const orderData = {
      payment_method:
        paymentData.value.paymentMethod === "на сайте" ? "bacs" : "cod", // метод оплаты: 'bacs' - банковский перевод, 'cod' - оплата при получении
      payment_method_title:
        paymentData.value.paymentMethod === "на сайте"
          ? "Оплата на сайте"
          : "Оплата при получении",
      set_paid: paymentData.value.paymentMethod === "на сайте", // если 'true', значит заказ считается оплаченным
      billing: {
        first_name: paymentData.value.name,
        address_1: paymentData.value.address,
        phone: paymentData.value.phone,
        email: paymentData.value.email,
      },
      shipping: {
        first_name: paymentData.value.name,
        address_1: paymentData.value.address,
      },
      line_items: carts.value.map((item: any) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      shipping_lines: [
        {
          method_id:
            paymentData.value.deliveryMethod === "СДЕК"
              ? "flat_rate"
              : "free_shipping",
          method_title: paymentData.value.deliveryMethod,
          total: paymentData.value.deliveryMethod === "СДЕК" ? "300" : "0",
        },
      ],
    };

    // Отправляем данные на сервер WooCommerce
    const { $wooco } = useNuxtApp();

    const response = $wooco.post("/orders", orderData);

    // Очищаем корзину
    carts.value = [];
    toast("Заказ успешно отправлен");
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    alert("Произошла ошибка при создании заказа.");
  } finally {
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }
};
</script>

<style scoped lang="scss">
.payment__col {
  h3 {
    font-size: 4rem;
    line-height: 4.8rem;
    margin-bottom: 5.5rem;
    font-family: $font_1;
    font-weight: 500;
    @include bp($point_2) {
      font-size: 2.6rem;
      line-height: 3rem;
      margin-bottom: 3rem;
    }
  }

  h4 {
    font-size: 3.5rem;
    font-family: $font_1;
    font-weight: 500;
    @include bp($point_2) {
      font-size: 2.6rem;
      line-height: 3rem;
      margin-bottom: 3rem;
    }
  }
}

.payment__row {
  @include flex-start;
  align-items: flex-start;
  gap: 14.6rem;
  margin-bottom: 5.8rem;
  @include bp($point_2) {
    flex-direction: column;
    gap: 4rem;
  }
}

.payment__form {
  display: flex;
  flex-direction: column;
  gap: 2.7rem;
  margin-bottom: 4.2rem;
  @include bp($point_2) {
    width: 100%;
    gap: 1.5rem;
  }
}

.payment__options {
  input {
    display: none;
    &:checked + label:after {
      opacity: 1;
      visibility: visible;
    }
  }

  label {
    position: relative;
    padding-left: 2.5rem;
    &:before {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      content: "";
      border-radius: 100%;
      width: 1.8rem;
      height: 1.8rem;
      background-color: #0000001f;
    }
    &:after {
      position: absolute;
      top: 50%;
      left: 0.6rem;
      transform: translateY(-50%);
      content: "";
      border-radius: 100%;
      width: 0.6rem;
      height: 0.6rem;
      background-color: $black;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease-in-out;
    }
  }
}

.payment__options {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &.first {
    margin-bottom: 5.3rem;
  }
  label {
    font-size: 2.5rem;
    cursor: pointer;
  }
}
</style>
