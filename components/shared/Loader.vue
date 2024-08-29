<!-- @format -->

<template>
	<div class="loader">
		<Icon name="eos-icons:three-dots-loading" size="200" />
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
	.loader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		@include flex-center;
		background-color: $white;
		z-index: 1111;
		color: $rose;
	}
</style>
