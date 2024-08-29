<!-- @format -->

<template>
	<footer class="footer" v-if="main.options && contacts">
		<div class="container">
			<div class="footer_main">
				<div class="footer_col__info">
					<div class="footer_logo">
						<NuxtLink to="/">
							<img src="@/assets/img/footer-logo.png" alt="" />
						</NuxtLink>
					</div>
					<ul>
						<li>{{ main.options.global_phone }}</li>
						<li>{{ main.options.global_email }}</li>
						<li>{{ main.options.adress }}</li>
						<li>{{ main.options.legal_info }}</li>
					</ul>
				</div>
				<div class="footer_col__nav">
					<div class="footer_catalog">
						<p>Каталог</p>
						<ul>
							<li>
								<NuxtLink
									:to="{ name: 'shop', query: { orderby: 'date', order: 'desc' } }"
									:class="{ 'custom-active': isNewArrivalsActive }"
									activeClass="nav-links"
									exactActiveClass="nav-links"
								>
									Новинки
								</NuxtLink>
							</li>
							<li>
								<NuxtLink
									:to="{ name: 'shop', query: { orderby: 'popularity', order: 'desc' } }"
									:class="{ 'custom-active': isBestsellersActive }"
									activeClass="nav-links"
									exactActiveClass="nav-links"
								>
									Бестселлеры
								</NuxtLink>
							</li>
							<li>
								<NuxtLink to="/categories">Категории</NuxtLink>
							</li>
						</ul>
					</div>
					<div class="footer_client">
						<p>Клиентам</p>
						<ul>
							<li>
								<NuxtLink to="/about">О бренде</NuxtLink>
							</li>
							<li>
								<NuxtLink to="/delivery">Доставка и возврат</NuxtLink>
							</li>
							<li>
								<NuxtLink to="/contacts">Контакты</NuxtLink>
							</li>
						</ul>
					</div>
				</div>
				<ul class="footer_company__info">
					<li>{{ main.options.global_phone }}</li>
					<li>{{ main.options.global_email }}</li>
					<li>{{ main.options.adress }}</li>
					<li>{{ main.options.legal_info }}</li>
				</ul>
			</div>
			<div class="footer_bottom">
				<ul>
					<li v-for="(item, i) in contacts.sociality" :key="'sociality-item-' + i">
						<a :href="item.link" target="_blank">
							<img :src="item.img" alt="" />
						</a>
					</li>
				</ul>
				<div class="footer_brand">
					<p>
						Разработка и дизайн
						<a href="https://special4u.ru/?utm_source=asik" target="_blank"
							>Special4You</a
						>
					</p>
					<img src="/assets/img/footer-logo.svg" alt="" />
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
	import { computed } from "vue";
	import { useRoute } from "vue-router";
	import { useGlobalStoreRefs } from "~/stores/useGlobalStore";

	const { main } = useGlobalStoreRefs();
	const route = useRoute();

	// Функция для проверки, совпадает ли текущий маршрут и query параметры
	const isActiveRoute = (expectedQuery: any) => {
		return (
			route.name === "shop" &&
			JSON.stringify(route.query) === JSON.stringify(expectedQuery)
		);
	};

	// Вычисляемые свойства для проверки активного состояния ссылок
	const isNewArrivalsActive = computed(() =>
		isActiveRoute({ orderby: "date", order: "desc" })
	);
	const isBestsellersActive = computed(() =>
		isActiveRoute({ orderby: "popularity", order: "desc" })
	);

	const contacts = ref<any>(null);

	async function getAbout() {
		const { $main } = useNuxtApp();
		try {
			const response = await $main.get("/pages/212?acf_format=standard");
			contacts.value = response.data.acf;
		} catch (error) {
		} finally {
		}
	}

	onMounted(async () => {
		await getAbout();
	});
</script>

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
		margin-bottom: 3.1rem;
		@include bp($point_2) {
			flex-direction: column;
			gap: 0;
		}
	}

	.footer_logo {
		margin-bottom: 3.4rem;
		max-width: 13.1rem;
		@include flex-center;
		a {
			@include flex-center;
			width: 100%;
			height: 100%;
		}
		@include bp($point_2) {
			margin-bottom: 0;
			@include flex-center;
			margin: 0 auto;
			max-width: 8.3rem;
		}

		img {
			@include flex-center;
			width: 100%;
			height: 100%;
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

	.footer_bottom {
		@include flex-space;
		gap: 4rem;
		@include bp($point_2) {
			flex-direction: column;
			align-items: flex-start;
		}
		ul {
			@include flex-start;
			gap: 1.5rem;
			li {
				@include bp($point_2) {
					width: 3.3rem;
					height: 3.3rem;
				}
				a {
					@include flex-center;
					width: 100%;
					height: 100%;
				}
				img {
					@include flex-center;
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.footer_brand {
		@include flex-start;
		gap: 1rem;
		text-align: right;
		a {
			text-decoration: underline;
		}
		p {
			max-width: 17rem;
			@include bp($point_2) {
				order: 2;
				text-align: left;
			}
		}
	}
</style>
