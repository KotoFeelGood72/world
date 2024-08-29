<!-- @format -->

<template>
	<nav class="nav">
		<ul>
			<li v-for="(item, index) in nav" :key="index" class="nav-item">
				<NuxtLink :to="item.link" :class="getActiveClass(item.link)">{{
					item.name
				}}</NuxtLink>
				<ul v-if="item.submenu && item.submenu.length" class="submenu">
					<li v-for="(subItem, subIndex) in item.submenu" :key="subIndex">
						<NuxtLink :to="subItem.link" :class="getActiveClass(subItem.link)">{{
							subItem.name
						}}</NuxtLink>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { useRoute } from "vue-router";

	const route = useRoute();

	const nav = ref([
		{
			name: "Каталог",
			link: "/shop",
			submenu: [
				{ name: "Все товары", link: "/shop/categories" },
				{ name: "Новинки", link: "/shop?orderby=date&order=desc" },
				{ name: "Бестселлеры", link: "/shop?orderby=popularity&order=desc" },
				{ name: "Аксессуары", link: "/shop/categories/accesories" },
				{ name: "Для новорожденных", link: "/shop/categories/kinder" },
				{ name: "Для животных", link: "/shop/categories/pets" },
			],
		},
		{
			name: "Доставка и возврат",
			link: "/delivery",
		},
		{
			name: "О бренде",
			link: "/about",
		},
		{
			name: "Контакты",
			link: "/contacts",
		},
	]);

	// Функция для проверки активного состояния
	const getActiveClass = (link: any) => {
		// Проверяем путь и параметры запроса
		if (link === "/shop?orderby=date&order=desc") {
			return route.path === "/shop" &&
				route.query.orderby === "date" &&
				route.query.order === "desc"
				? "custom-active"
				: "";
		}
		if (link === "/shop?orderby=popularity&order=desc") {
			return route.path === "/shop" &&
				route.query.orderby === "popularity" &&
				route.query.order === "desc"
				? "custom-active"
				: "";
		}
		// Для других ссылок можем добавить другие проверки при необходимости
		return route.path === link ? "custom-active" : "";
	};
</script>

<style scoped lang="scss">
	.nav {
		margin-bottom: -1.5rem;
		& > ul {
			@include flex-start;
			gap: 6.3rem;
			& > li {
				position: relative;
				padding-bottom: 1.5rem;
				& > a {
					transition: all 0.3s ease-in-out;
					border-bottom: 0.1rem solid transparent;
				}
				&:hover {
					& > a {
						border-bottom: 0.1rem solid $black;
					}
					.submenu {
						opacity: 1;
						visibility: visible;
						top: 100%;
					}
				}

				.submenu {
					border: 0.1rem solid $black;
					display: flex;
					position: absolute;
					top: 110%;
					flex-direction: column;
					background-color: $white;
					gap: 0.5rem;
					padding: 2rem;
					min-width: 21.4rem;
					opacity: 0;
					visibility: hidden;
					transition: all 0.3s ease-in-out;
				}
			}
		}
	}
</style>
