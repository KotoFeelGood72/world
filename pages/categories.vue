<!-- @format -->

<template>
	<div class="shop">
		<ListView class="mb-18" link="/categories">
			<CategoryCard
				v-for="(item, i) in categories"
				:key="'category-item-' + i"
				:data="item"
			/>
		</ListView>
		<Submission class="mb-18" />
		<Socials class="mb-18" />
	</div>
</template>

<script setup lang="ts">
	import ListView from "@/components/list/ListView.vue";
	import CategoryCard from "@/components/card/CategoryCard.vue";
	import Submission from "@/components/ui/Submission.vue";
	import Socials from "@/components/blocks/Socials.vue";
	import { useGlobalStore, useGlobalStoreRefs } from "~/stores/useGlobalStore";
	useHead({
		title: "Категории",
	});

	const { categories, main } = useGlobalStoreRefs();
	const { getCategories } = useGlobalStore();

	onMounted(() => {
		getCategories();
	});
</script>

<style scoped lang="scss"></style>
