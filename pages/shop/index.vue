<!-- @format -->

<template>
	<div class="products" @click="handleClickOutside">
		<div class="products-filter">
			<div class="container">
				<div class="filters">
					<div class="filter-trigger" @click.stop="toggleFilterMobile">
						<div class="filter_trigger__icon">
							<Icon name="custom:filter" />
						</div>
						<p>Фильтры</p>
					</div>
					<div
						:class="[{ active: isFilterMobile }, 'products_filer__main']"
						ref="filterMain"
					>
						<div class="filter__dropdown">
							<Dropdown
								v-if="dropcat"
								class="category_drop"
								v-model="selectedCategory"
								title="Категории"
								:options="categories"
							/>

							<Dropdown
								:key="attributesWithTerms[0]?.id"
								class="size_drop"
								:title="attributesWithTerms[0]?.name"
								v-model="selectedColor"
								:options="attributesWithTerms[0]?.terms"
							/>
							<Dropdown
								:key="attributesWithTerms[1]?.id"
								class="size_drop"
								:title="attributesWithTerms[1]?.name"
								v-model="selectedSize"
								:options="attributesWithTerms[1]?.terms"
							/>
						</div>
						<div class="filter__sorts">
							<div class="search">
								<input
									type="search"
									placeholder="Поиск"
									v-model="searchQuery"
									@input="updateQueryParams"
								/>
								<span v-if="searchQuery" @click="clearSearch">
									<Icon name="carbon:close" size="25" />
								</span>
								<span v-else>
									<Icon name="carbon:search" size="22" />
								</span>
							</div>

							<SingleDropdown
								v-model="selectedSort"
								:options="[
									'Порядок: по умолчанию',
									'Порядок: по популярности',
									'Порядок: сперва новые',
									'Порядок: сперва старые',
									'Цена: по возрастанию',
									'Цена: по убыванию',
								]"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="products_main">
			<ListView class="mb-18" @onClickBtn="showMore" :btn="!allProductsLoaded">
				<ProductsCard
					v-for="(item, i) in products.slice(0, visibleProducts)"
					:key="'products-all-item-' + i"
					:data="item"
				/>
			</ListView>
		</div>
		<Reviews class="mb-18" />
		<Submission class="mb-18" />
		<Socials class="mb-18" />
	</div>
</template>

<script setup lang="ts">
	import { ref, watch, onMounted, onUnmounted, computed } from "vue";
	import ListView from "@/components/list/ListView.vue";
	import ProductsCard from "@/components/card/ProductsCard.vue";
	import Reviews from "@/components/blocks/Reviews.vue";
	import Submission from "@/components/ui/Submission.vue";
	import Socials from "@/components/blocks/Socials.vue";
	import { useGlobalStore, useGlobalStoreRefs } from "~/stores/useGlobalStore";
	import { useProductStore, useProductStoreRefs } from "~/stores/useProductsStore";
	import Dropdown from "~/components/ui/Dropdown.vue";
	import SingleDropdown from "~/components/ui/SingleDropdown.vue";
	import { useRouter, useRoute } from "vue-router";

	withDefaults(
		defineProps<{
			dropcat?: boolean;
		}>(),
		{
			dropcat: true,
		}
	);

	const selectedSort = ref<any>("Порядок: сперва новые");
	const selectedCategory = ref<string[]>([]);
	const selectedSize = ref<string[]>([]);
	const selectedColor = ref<string[]>([]);
	const isFilterMobile = ref<boolean>(false);
	const searchQuery = ref<string>("");
	const visibleProducts = ref<number>(12);
	const router = useRouter();
	const route = useRoute();
	const { fetchAttr, getFilteredProducts } = useProductStore();
	const { products, attributesWithTerms } = useProductStoreRefs();
	const { getCategories, changeLoad } = useGlobalStore();
	const { load, categories, showAllProducts } = useGlobalStoreRefs();

	const filterMain = ref<any>(null);

	const showMore = () => {
		visibleProducts.value += 12;
		showAllProducts.value = true;
		console.log("Good");
	};

	const allProductsLoaded = computed(() => {
		return visibleProducts.value >= products.value.length;
	});
	const toggleFilterMobile = () => {
		isFilterMobile.value = !isFilterMobile.value;
	};

	const handleClickOutside = (event: Event) => {
		if (filterMain.value && !filterMain.value.contains(event.target as Node)) {
			isFilterMobile.value = false;
		}
	};

	const handleScroll = () => {
		isFilterMobile.value = false;
	};

	const clearSearch = () => {
		searchQuery.value = "";
		updateQueryParams();
	};

	const updateQueryParams = () => {
		const query: Record<string, string> = {};

		let sortOption = selectedSort.value;
		let orderby, order;

		switch (sortOption) {
			case "Порядок: сперва новые":
				orderby = "date";
				order = "desc";
				break;
			case "Порядок: сперва старые":
				orderby = "date";
				order = "asc";
				break;
			case "Цена: по возрастанию":
				orderby = "price";
				order = "asc";
				break;
			case "Цена: по убыванию":
				orderby = "price";
				order = "desc";
				break;
			case "Порядок: по популярности":
				orderby = "popularity";
				order = "desc";
				break;
			default:
				orderby = "menu_order";
				order = "asc";
		}

		if (selectedCategory.value.length > 0) {
			query.category = selectedCategory.value.join(",");
		}
		if (selectedSize.value.length > 0) {
			query.size = String(selectedSize.value);
		}
		if (selectedColor.value.length > 0) {
			query.color = String(selectedColor.value);
		}
		if (sortOption) {
			query.orderby = orderby;
			query.order = order;
		}
		if (searchQuery.value) {
			query.search = searchQuery.value;
		}

		// Передаем категории и другие параметры в getFilteredProducts
		getFilteredProducts(
			selectedCategory.value, // категории передаются здесь
			selectedSize.value,
			selectedColor.value,
			searchQuery.value,
			orderby,
			order,
			route.params.categoryId // параметр категории из URL
		);

		router.push({ query });
	};

	watch(
		() => route.query,
		(newQueryParams) => {
			updateFiltersFromQuery(newQueryParams);
		}
	);

	const updateFiltersFromQuery = (queryParams: Record<string, any>) => {
		searchQuery.value = (queryParams.search as string) || "";

		const orderby = (queryParams.orderby as string) || "menu_order";
		const order = (queryParams.order as string) || "asc";

		switch (orderby) {
			case "date":
				selectedSort.value =
					order === "desc" ? "Порядок: сперва новые" : "Порядок: сперва старые";
				break;
			case "price":
				selectedSort.value =
					order === "asc" ? "Цена: по возрастанию" : "Цена: по убыванию";
				break;
			case "popularity":
				selectedSort.value = "Порядок: по популярности";
				break;
			default:
				selectedSort.value = "Порядок: по умолчанию";
		}

		selectedCategory.value = (typeof queryParams.category === "string"
			? queryParams.category
			: ""
		)
			.split(",")
			.filter(Boolean);
		selectedSize.value = (typeof queryParams.size === "string" ? queryParams.size : "")
			.split(",")
			.filter(Boolean);
		selectedColor.value = (typeof queryParams.color === "string" ? queryParams.color : "")
			.split(",")
			.filter(Boolean);

		// Обновляем фильтрованные продукты
		getFilteredProducts(
			selectedCategory.value,
			selectedSize.value,
			selectedColor.value,
			searchQuery.value,
			orderby,
			order,
			route.params.categoryId
		);
	};

	// Watch для изменения заголовка страницы и обновления запросов при изменении сортировки
	watch(selectedSort, (newSort) => {
		// Обновляем заголовок страницы
		let title = "Каталог"; // Заголовок по умолчанию

		if (newSort.includes("сперва новые")) {
			title = "Новинки";
		} else if (newSort.includes("популярности")) {
			title = "Бестселлеры";
		}

		useHead({
			title: title,
		});

		// Обновляем запросы
		updateQueryParams();
	});

	async function falseLoad() {
		load.value = false;
	}

	onMounted(async () => {
		document.addEventListener("click", handleClickOutside);
		window.addEventListener("scroll", handleScroll);

		// Инициализация с текущими параметрами
		updateFiltersFromQuery(route.query);

		await fetchAttr();
		await getCategories();
		await falseLoad();
	});

	onUnmounted(async () => {
		document.removeEventListener("click", handleClickOutside);
		window.removeEventListener("scroll", handleScroll);
	});
</script>

<style lang="scss">
	.filter__dropdown,
	.filter__sorts {
		@include flex-start;
		gap: 3rem;
		@include bp($point_2) {
			width: 100%;
		}
	}

	.filter__sorts {
		@include bp($point_2) {
			order: 0;
		}
	}

	.filter__dropdown {
		@include bp($point_2) {
			flex-direction: column;
			align-items: flex-start;
			order: 1;
			gap: 0;
		}
	}

	.products_filer__main {
		@include flex-space;

		@include bp($point_2) {
			display: none;
			border: 0.1rem solid $black;
			padding: 0.5rem 1.5rem 2.6rem 1.5rem;
			position: absolute;
			z-index: 99;
			background-color: $white;
			width: 100%;
		}

		&.active {
			@include bp($point_2) {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
			}
		}
	}

	.search {
		border: 0.1rem solid $black;
		position: relative;
		max-width: 20rem;

		@include bp($point_2) {
			display: none;
		}
		input {
			@include app;
			font-size: 2rem;
			padding: 0;
			min-height: 3.4rem;
			padding: 0.5rem 1rem;
		}

		span {
			@include flex-center;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 1rem;
			cursor: pointer;
			transition: all 0.3s ease-in-out;
			&:hover {
				color: $black;
			}
		}
	}

	.products_filer__main {
		margin-bottom: 10rem;
	}

	.filter-trigger {
		display: none;
		@include bp($point_2) {
			@include flex-start;
			gap: 1rem;
			margin-bottom: 1.7rem;
		}
	}

	.filter_trigger__icon {
		@include flex-center;
	}

	.category_drop {
		@include bp($point_2) {
			border-top: 0.1rem solid #888888;
			border-bottom: 0.1rem solid #888888;
		}
	}
	.size_drop {
		@include bp($point_2) {
			border-bottom: 0.1rem solid #888888;
		}
	}

	.filters {
		position: relative;
		z-index: 99;
	}

	input[type="search"]::-webkit-search-cancel-button {
		-webkit-appearance: none;
		appearance: none;
	}
</style>
