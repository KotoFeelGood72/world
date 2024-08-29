<!-- @format -->

<template>
	<div class="search-modal" @click="handleClickOutside">
		<div class="searchInput__w">
			<div class="searchInput">
				<input
					type="search"
					name="global-search"
					id="global-search"
					placeholder="Поиск товара..."
					v-model="searchQuery"
					@keyup.enter="searchProducts"
				/>
				<div class="searcInput_icon__search">
					<Icon name="guidance:search" size="20" @click="searchProducts()" />
				</div>
				<div class="searcInput__icon">
					<Icon
						name="line-md:menu-to-close-transition"
						size="25"
						v-if="searchQuery"
						@click="clearSearch"
					/>
				</div>
			</div>
			<div class="close-modal" @click="closeModal('search')">
				<Icon name="iwwa:close" size="40" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, onUnmounted } from "vue";
	import { useModalStore } from "~/stores/useModalStore";
	import { useRouter, useRoute } from "vue-router";

	const { closeModal } = useModalStore();
	const router = useRouter();
	const route = useRoute();
	const searchQuery = ref("");

	const clearSearch = () => {
		searchQuery.value = "";
	};

	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as HTMLElement;

		// Если клик вне области search-modal (вне модального окна)
		if (!document.querySelector(".search-modal")?.contains(target)) {
			clearSearch();
			closeModal("search");
		}
	};
	const handleScroll = () => {
		if (window.scrollY >= window.innerHeight) {
			closeModal("search");
		}
	};

	const searchProducts = () => {
		if (searchQuery.value.trim()) {
			// Получаем текущие параметры из route.query
			const queryParams = { ...route.query };

			// Обновляем или добавляем параметр search
			queryParams.search = searchQuery.value;

			// Если мы находимся на странице shop, обновляем параметры
			if (route.path === "/shop") {
				router.push({ path: "/shop", query: queryParams });
			} else {
				// Иначе переходим на страницу /shop с параметрами
				router.push({ path: "/shop", query: { search: queryParams.search } });
			}
			closeModal("search");
			clearSearch();
		}
	};

	onMounted(() => {
		document.addEventListener("click", handleClickOutside);
		window.addEventListener("scroll", handleScroll);
	});

	onUnmounted(() => {
		document.removeEventListener("click", handleClickOutside);
		window.removeEventListener("scroll", handleScroll);
	});
</script>

<style scoped lang="scss">
	.search-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 15rem;
		background-color: $white;
		border-bottom: 0.1rem solid #cfcfcf;
		@include flex-center;
		z-index: 101;
	}

	.searchInput__w {
		@include flex-center;
		gap: 5rem;
		max-width: 80rem;
		width: 100%;
	}

	.searchInput {
		position: relative;
		flex-grow: 1;
		input {
			@include app;
			padding: 2rem 3rem 2rem 5rem;
			border: 0.1rem solid #cfcfcf;
			border-radius: 0.3rem;
			width: 100%;
			transition: all 0.3s ease-in-out;
			font-family: $font_2;
			font-size: 1.8rem;
			z-index: 1;
			&:focus {
				border-color: $black;
			}
		}
	}

	.searcInput__icon {
		@include flex-center;
		width: 5rem;
		height: 5rem;
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
		cursor: pointer;
		&:hover {
			span {
				color: $black;
			}
		}
		span {
			color: #979595;
			transition: all 0.3s ease-in-out;
		}
	}

	.close-modal {
		color: #979595;
		cursor: pointer;
		transition: all 0.3s ease-in-out;
		@include flex-center;
		&:hover {
			color: rgb(247, 60, 60);
		}
	}

	.searcInput_icon__search {
		position: absolute;
		top: 50%;
		left: 2rem;
		transform: translateY(-50%);
		@include flex-center;
		color: #979595;
		z-index: 99;
		cursor: pointer;
		transition: all 0.3s ease-in-out;
		&:hover {
			color: $black;
		}
	}
</style>
