<!-- @format -->

<template>
	<div :class="[{ active: active }, 'button']">
		<button type="button">
			<p>{{ name }}</p>
			<div class="isload__icon" v-if="isLoading">
				<Icon name="line-md:loading-twotone-loop" size="23" />
			</div>
		</button>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		name: string;
		active?: boolean;
		isLoading?: boolean;
	}>();
</script>

<style scoped lang="scss">
	.button {
		&.active {
			button {
				background-color: $black;
				color: $white;
				pointer-events: none;
				cursor: not-allowed;
			}
		}
		button {
			@include flex-center;
			@include app;
			gap: 1rem;
			font-size: 2rem;
			padding: 1.8rem 10rem;
			text-transform: uppercase;
			border: 0.2rem solid $black;
			background-color: $white;
			cursor: pointer;
			transition: all 0.3s ease-in-out;
			color: $black;
			@include bp($point_2) {
				padding: 1.4rem 6rem;
				border-width: 0.1rem;
			}
			&:hover {
				background-color: $black;
				color: $white;
			}
		}
	}

	.isload__icon {
		@include flex-center;
	}
</style>
