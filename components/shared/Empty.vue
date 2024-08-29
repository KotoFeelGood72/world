<!-- @format -->

<template>
	<div class="empty">
		<h2>{{ isTitle }}</h2>
		<div ref="lottieContainer" class="lottie-container"></div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref } from "vue";
	import { useRoute } from "vue-router";
	import lottie from "lottie-web";

	const route = useRoute();

	const lottieContainer = ref(null);

	onMounted(() => {
		if (lottieContainer.value) {
			lottie.loadAnimation({
				container: lottieContainer.value,
				renderer: "svg",
				loop: true,
				autoplay: true,
				path: "/assets/img/empty.json",
			});
		}
	});

	const isTitle = computed(() => {
		switch (route.name) {
			case "favorite":
				return "Список избранного пуст";
			case "cart":
				return "Корзина пуста";
			case "contacts":
				return "Страница в разработке";
		}
	});
</script>

<style scoped lang="scss">
	.lottie-container {
		width: 40rem;
		height: 40rem;
		@include flex-center;
		margin-top: -5rem;
	}

	.empty {
		@include flex-center;
		flex-direction: column;
		h2 {
			font-size: 4rem;
			text-align: center;
			font-family: $font_2;
			font-weight: 300;
			@include bp($point_2) {
				font-size: 2rem;
			}
		}
	}
</style>
