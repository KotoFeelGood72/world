<template>
  <div class="payment">
    <div class="payment__row">
      <div class="payment__col">
        <h3>Контактная информация</h3>
        <div class="payment__form">
          <Inputs
            v-model="paymentData.name"
            placeholder="Имя"
            @blur="validateName"
          />
          <span v-if="errors.name" class="error">{{ errors.name }}</span>

          <Inputs
            v-model="paymentData.phone"
            placeholder="Телефон"
            @input="formatPhone"
            @blur="validatePhone"
          />
          <span v-if="errors.phone" class="error">{{ errors.phone }}</span>

          <Inputs
            v-model="paymentData.email"
            placeholder="Почта"
            @input="formatEmail"
            @blur="validateEmail"
          />
          <span v-if="errors.email" class="error">{{ errors.email }}</span>

          <Inputs
            v-model="paymentData.address"
            placeholder="Адрес"
            @blur="validateAddress"
          />
          <span v-if="errors.address" class="error">{{ errors.address }}</span>
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

    <!-- Отображаем лоадер во время отправки заказа -->
    <Loader v-if="loading" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Inputs from "../ui/Inputs.vue";
import Button from "../ui/Button.vue";
import { useCartStoreRefs } from "~/stores/useCartStore";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import Loader from "./Loader.vue";

const props = defineProps<{
  price: any;
}>();

const { carts } = useCartStoreRefs();
const toast = useToast();
const router = useRouter();

const paymentData = ref({
  name: "",
  phone: "",
  email: "",
  address: "",
  deliveryMethod: "СДЕК",
  paymentMethod: "на сайте",
});

// Ошибки валидации
const errors = ref({
  name: "",
  phone: "",
  email: "",
  address: "",
});

// Состояние загрузки
const loading = ref(false);

// Валидация имени
const validateName = () => {
  if (!paymentData.value.name) {
    errors.value.name = "Имя обязательно для заполнения";
  } else {
    errors.value.name = "";
  }
};

// Форматирование телефона — разрешаем вводить только цифры
const formatPhone = (event: Event) => {
  const input = event.target as HTMLInputElement;
  paymentData.value.phone = input.value.replace(/\D/g, ""); // Удаляем все символы, кроме цифр
};

const validatePhone = () => {
  const phone = paymentData.value.phone;
  if (!phone) {
    errors.value.phone = "Телефон обязателен для заполнения";
  } else if (phone.length !== 11) {
    errors.value.phone =
      "Введите корректный номер телефона (должен содержать 11 цифр)";
  } else {
    errors.value.phone = "";
  }
};

// Форматирование email — разрешаем только латинские буквы и допустимые символы для email
const formatEmail = (event: Event) => {
  const input = event.target as HTMLInputElement;
  paymentData.value.email = input.value.replace(/[^a-zA-Z0-9@._-]/g, ""); // Удаляем все символы, кроме латинских букв, цифр и разрешённых символов
};

// Валидация email
const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Пример паттерна для email
  if (!paymentData.value.email) {
    errors.value.email = "Почта обязательна для заполнения";
  } else if (!emailPattern.test(paymentData.value.email)) {
    errors.value.email = "Введите корректный адрес почты";
  } else {
    errors.value.email = "";
  }
};

// Валидация адреса
const validateAddress = () => {
  if (!paymentData.value.address) {
    errors.value.address = "Адрес обязателен для заполнения";
  } else {
    errors.value.address = "";
  }
};

// Функция для проверки всей формы перед отправкой
const validateForm = () => {
  validateName();
  validatePhone();
  validateEmail();
  validateAddress();
  return (
    !errors.value.name &&
    !errors.value.phone &&
    !errors.value.email &&
    !errors.value.address
  );
};

// Функция для создания заказа
// Функция для создания заказа
// Функция для создания заказа
const submitOrder = async () => {
  if (!validateForm()) {
    toast("Пожалуйста, исправьте ошибки в форме");
    return;
  }

  loading.value = true; // Устанавливаем лоадер

  try {
    // Устанавливаем статус заказа в зависимости от метода оплаты
    let orderStatus = "pending"; // Для оплаты при получении используем статус "в ожидании"
    if (paymentData.value.paymentMethod === "на сайте") {
      orderStatus = "processing"; // Если оплата на сайте, устанавливаем статус "обрабатывается"
    }

    // Собираем данные для заказа и отправляем на сервер
    const orderData = {
      payment_method: "custom", // Используем кастомный метод оплаты
      payment_method_title: paymentData.value.paymentMethod, // Название способа оплаты
      set_paid: paymentData.value.paymentMethod === "на сайте", // Если оплата на сайте, считаем заказ оплаченным

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

      status: orderStatus, // Добавляем статус заказа

      line_items: carts.value.map((item: any) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),

      // Добавляем кастомные метаданные для метода оплаты и доставки
      meta_data: [
        {
          key: "Метод доставки",
          value: paymentData.value.deliveryMethod, // Кастомный метод доставки
        },
        {
          key: "Метод оплаты",
          value: paymentData.value.paymentMethod, // Кастомный метод оплаты
        },
      ],
    };

    const { $wooco } = useNuxtApp();
    await $wooco.post("/orders", orderData);

    carts.value = [];
    toast("Заказ успешно отправлен");
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    alert("Произошла ошибка при создании заказа.");
  } finally {
    setTimeout(() => {
      loading.value = false; // Отключаем лоадер после завершения
      router.push("/");
    }, 600);
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

.error {
  color: red;
  font-size: 1.2rem;
  margin-top: -2rem;
}
</style>
