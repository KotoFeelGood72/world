<!-- @format -->

<template>
	<transition name="fade">
		<Loader v-if="load" />
	</transition>
	<main class="main" v-show="!load">
		<Header />
		<div class="content">
			<Breadcrumb v-if="isHome" :breadcrumbs="isBread" />
			<slot />
		</div>
		<Footer />
	</main>
</template>

<script setup lang="ts">
	import Header from "@/components/shared/Header.vue";
	import Footer from "@/components/shared/Footer.vue";
	import Breadcrumb from "@/components/ui/Breadcrumb.vue";
	import Loader from "~/components/shared/Loader.vue";
	import { useGlobalStoreRefs } from "../stores/useGlobalStore";
	import { useRoute } from "vue-router";

	const { load } = useGlobalStoreRefs();
	const route = useRoute();
	const isHome = computed(() => route.name != "index");

	const isBread = computed(() => {
		switch (route.name) {
			case "shop":
				return [{ path: "/shop", title: "Каталог" }];
			case "categories":
				return [{ path: "/categories", title: "Категории" }];
			case "shop-categories":
				return [{ path: "/shop", title: "Каталог" }];
			case "shop-categories-categoryId":
				return [
					{ path: "/shop/", title: `Каталог` },
					// { path: route.path, title: `Категория ${route.params.categoryId}` },
				];
			case "delivery":
				return [{ path: "/delivery", title: "Доставка и возврат" }];
			case "about":
				return [{ path: "/about", title: "О бренде" }];
			case "contacts":
				return [{ path: "/contacts", title: "Контакты" }];
			case "favorite":
				return [{ path: "/favorite", title: "Избранное" }];
			case "cart":
				return [{ path: "/cart", title: "Заказы" }];
			case "shop-categories-categoryId-products-slug":
				return [
					{ path: "/shop", title: "Каталог" },
					// { path: "/cart", title: "Категория" },
				];
			default:
				break;
		}
	});
</script>

<style scoped lang="scss">
	.content {
		padding-top: $header;
		min-height: 100vh;
		@include bp($point_2) {
			padding-top: 9.6rem;
		}
	}
</style>
