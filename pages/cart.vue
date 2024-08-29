<!-- @format -->

<template>
	<div class="cart">
		<div class="container">
			<div class="cart__main mb-18">
				<h2 v-if="carts.length > 0">Ваше корзина</h2>
				<ul class="cart__list">
					<li
						class="cart_item"
						v-for="(item, index) in carts"
						:key="'cart-item-' + item.id + index"
					>
						<NuxtLink :to="`/shop/categories/${item.category}/products/${item.slug}`">
							<div class="cart_item__left">
								<div class="cart_item__img">
									<img :src="item.image" alt="" />
								</div>
								<div class="cart_item__content">
									<p>{{ item.name }}</p>
									<ul>
										<li
											v-for="char in item.default_attributes"
											:key="'attributes-item-' + char.id"
										>
											{{ char.name }}:
											{{
												char.name === "Цвет" ? translateColor(char.option) : char.option
											}}
										</li>
									</ul>
								</div>
							</div>
							<div class="cart_item__right" @click.prevent>
								<div class="cart_quantity">
									<button type="button" class="minus" @click="decrementQuantity(index)">
										<Icon name="ic:baseline-minus" />
									</button>
									<input
										type="number"
										:value="item.quantity"
										@input="updateQuantity(index, ($event.target as HTMLInputElement).value)"
									/>
									<button type="button" class="plus" @click="incrementQuantity(index)">
										<Icon name="ic:baseline-plus" />
									</button>
								</div>
								<div class="cart_price">{{ item.price * item.quantity }} ₽</div>
								<div class="cart_delete" @click="removeItem(index)">
									<Icon name="lets-icons:close-round" size="24" />
								</div>
							</div>
						</NuxtLink>
					</li>
				</ul>
				<div class="empty-cart" v-if="carts.length <= 0">
					<empty />
				</div>
				<div class="cart_total" v-if="carts.length > 0">Сумма: {{ totalPrice }} ₽</div>
				<div class="cart_pay" v-if="carts.length > 0">
					<Button name="Перейти к оплате" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed } from "vue";
	import Button from "@/components/ui/Button.vue";
	import { useCartStoreRefs } from "~/stores/useCartStore";
	import Empty from "~/components/shared/Empty.vue";

	const { carts } = useCartStoreRefs();

	const incrementQuantity = (index: number) => {
		carts.value[index].quantity++;
	};

	const translateColor = (color: string): string => {
		const colorTranslations: Record<string, string> = {
			white: "Белый",
			red: "Красный",
			blue: "Синий",
		};

		return colorTranslations[color.toLowerCase()] || color;
	};

	const decrementQuantity = (index: number) => {
		if (carts.value[index].quantity > 1) {
			carts.value[index].quantity--;
		}
	};

	const updateQuantity = (index: number, value: string) => {
		const quantity = parseInt(value, 10);
		if (!isNaN(quantity) && quantity > 0) {
			carts.value[index].quantity = quantity;
		}
	};

	const removeItem = (index: number) => {
		carts.value.splice(index, 1);
	};

	const totalPrice = computed(() => {
		return carts.value.reduce(
			(total: any, item: any) => total + item.price * item.quantity,
			0
		);
	});

	useHead({
		title: "Заказ",
	});
</script>

<style scoped lang="scss">
	.cart__main {
		h2 {
			font-size: 3rem;
			font-family: $font_2;
			font-weight: 300;
			margin-bottom: 5rem;
			@include bp($point_2) {
				font-size: 1.4rem;
				margin-bottom: 3rem;
			}
		}

		:deep(.button button) {
			padding: 1.9rem 5rem;
		}
	}
	.cart__list {
		margin-bottom: 3.2rem;
		& > li {
			a {
				@include flex-space;
				border-bottom: 0.1rem solid #888888;
				padding: 2.7rem 3.2rem 2.7rem 0.7rem;
				position: relative;
				gap: 3rem;
				@include bp($point_2) {
					flex-direction: column;
					align-items: flex-start;
					gap: 0;
				}
				&:nth-child(1) {
					border-top: 0.1rem solid #888888;
				}
			}
		}
	}

	.cart_item__img {
		width: 12rem;
		height: 12rem;
		@include bp($point_2) {
			min-width: 8rem;
			width: 8rem;
			height: 8rem;
		}
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.cart_item__content {
		margin-right: 5rem;
		flex-grow: 1;
		@include bp($point_2) {
			margin: 0;
		}
		p {
			font-size: 2.5rem;
			margin-bottom: 1rem;
			@include bp($point_2) {
				font-size: 1.4rem;
				margin-bottom: 0.7rem;
			}
		}
		ul {
			li {
				font-size: 2rem;
				color: #888888;
				@include bp($point_2) {
					font-size: 1.2rem;
				}
				&:not(:last-child) {
					margin-bottom: 0.2rem;
				}
			}
		}
	}

	.cart_delete {
		cursor: pointer;
		transition: all 0.3s ease-in-out;
		width: 3rem;
		height: 3rem;
		@include flex-center;
		border: 0.1rem solid $black;
		border-radius: 100%;

		@include bp($point_2) {
			position: absolute;
			top: 1rem;
			right: 1rem;
			width: 2rem;
			height: 2rem;
			padding: 0.2rem;
			color: #888888;
			border-color: #888888;
		}
		&:hover {
			border-color: rgb(247, 49, 49);
			color: rgb(247, 49, 49);
		}
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		/* display: none; <- Crashes Chrome on hover */
		-webkit-appearance: none;
		margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
	}

	.cart_item__left {
		@include flex-start;
		gap: 3rem;
		@include bp($point_2) {
			gap: 1rem;
		}
	}
	.cart_item__right {
		@include flex-start;
		gap: 3rem;
		@include bp($point_2) {
			padding-left: 9rem;
		}
	}

	.cart_quantity {
		@include flex-center;
		// gap: 1.5rem;

		input {
			@include app;
			width: auto;
			pointer-events: none;
			user-select: none;
			width: 4rem;
			text-align: center;
			@include bp($point_2) {
				font-size: 1.4rem;
				width: 2.5rem;
			}
		}
		button {
			@include app;
			@include flex-center;
			border: 0.1rem solid $black;
			border-radius: 100%;
			width: 3rem;
			height: 3rem;
			cursor: pointer;
			transition: all 0.3s ease-in-out;
			color: $black;
			@include bp($point_2) {
				width: 2rem;
				height: 2rem;
				font-size: 1.2rem;
			}
			&:hover {
				background-color: $rose;
			}
		}
	}

	.cart_total {
		@include flex-end;
		font-size: 3rem;
		font-weight: 300;
		margin-bottom: 9rem;
		@include bp($point_2) {
			font-size: 2rem;
			margin-bottom: 3rem;
		}
	}

	.cart_pay {
		@include flex-center;
		:deep(.button button) {
			@include bp($point_2) {
				font-size: 1.2rem;
				padding: 1.1rem 3.7rem;
			}
		}
	}

	.empty-cart {
		@include flex-center;
	}

	.cart_price {
		@include bp($point_2) {
			font-size: 2rem;
		}
	}
</style>
