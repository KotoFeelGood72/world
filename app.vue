<!-- @format -->

<template>
	<div class="main">
		<transition name="fade">
			<NuxtLayout>
				<NuxtPage />
				<transition name="modal-slide-top">
					<Search v-show="modals.search" />
				</transition>
				<transition name="modal-slide">
					<ModalBurger v-show="modals.burger" />
				</transition>
			</NuxtLayout>
		</transition>
	</div>
</template>

<script lang="ts" setup>
	// import Loader from "./components/shared/Loader.vue";
	import Search from "~/components/shared/Search.vue";
	import ModalBurger from "./components/shared/ModalBurger.vue";
	import { useModalStoreRefs } from "./stores/useModalStore";
	import { useGlobalStore, useGlobalStoreRefs } from "./stores/useGlobalStore";

	const { modals } = useModalStoreRefs();
	const { getOptions } = useGlobalStore();

	onMounted(async () => {
		await getOptions();
	});
</script>

<style lang="scss">
	.fixed {
		overflow: hidden;
		@include bp($point_5, $direction: min) {
			padding-right: 1.7rem;
		}
	}

	:root {
		--full-screen: calc(var(--vh, 1vh) * 100);
	}

	html {
		height: 100%;
		font: 400 calc(100vw / 1920 * 10) / 1.33 $font_1;
		@include bp(1440px) {
			font: 400 calc(100vw / 1440 * 10) / 1.33 $font_1;
		}
		@include bp(1280px) {
			font: 400 calc(100vw / 1440 * 11) / 1.33 $font_1;
		}

		@include bp($point_2) {
			font-size: 10px;
		}
	}

	body {
		position: relative;
		display: flex;

		height: 100%;
		font-size: $font_size_base;

		color: $color_text_base;
		-webkit-text-size-adjust: none;

		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		background: $body_bg;

		overflow-x: hidden;

		@supports (display: grid) {
			display: block;
		}
	}

	a {
		text-decoration: none;
		transition: all 0.3s ease;

		&:hover,
		&:focus {
			text-decoration: none;
			transition: all 0.3s ease;
		}
	}

	.page-enter-active,
	.page-leave-active {
		transition: all 0.3s ease-in-out;
	}
	.page-enter-from,
	.page-leave-to {
		opacity: 0;
	}

	.modal-slide-enter-active,
	.modal-slide-leave-active {
		transition: transform 0.3s ease;
	}
	.modal-slide-enter-from {
		transform: translateX(100%);
	}
	.modal-slide-leave-to {
		transform: translateX(100%);
	}

	.modal-slide-top-enter-active,
	.modal-slide-top-leave-active {
		transition: transform 0.3s ease;
	}
	.modal-slide-top-enter-from {
		transform: translateY(-100%);
	}
	.modal-slide-top-leave-to {
		transform: translateY(-100%);
	}

	// Добавляем анимацию fade
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
