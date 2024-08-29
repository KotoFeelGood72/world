<!-- @format -->

<template>
	<div ref="filterComponent" :class="[{ isOpen: showOptions }, 'filter-component']">
		<div class="filter-header" @click="toggleOptions">
			<h3>{{ title }}</h3>
			<button><Icon name="fluent:chevron-down-48-filled" /></button>
			<span v-if="selectedOptions.length > 0"> ({{ selectedOptions.length }}) </span>
		</div>
		<div v-if="showOptions" class="filter-options">
			<label
				v-for="option in options"
				:key="'checkbox-' + option"
				:class="{ 'selected-option': selectedOptions.includes(option) }"
				class="custom-checkbox"
			>
				<input
					type="checkbox"
					:value="option.id"
					v-model="selectedOptions"
					@change="emitMultipleSelection"
				/>
				<span class="checkmark"></span>
				<p>
					{{ option.name }}
				</p>
			</label>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, defineProps, defineEmits, onMounted, onBeforeUnmount, watch } from "vue";

	const props = defineProps<{
		title?: string;
		options?: any;
		modelValue: any[];
	}>();
	const emit = defineEmits(["update:modelValue"]);

	const showOptions = ref(false);
	const selectedOptions = ref<any[]>(props.modelValue);
	const filterComponent = ref<HTMLElement | null>(null);

	const toggleOptions = () => {
		showOptions.value = !showOptions.value;
	};

	const emitMultipleSelection = () => {
		emit("update:modelValue", selectedOptions.value);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (filterComponent.value && !filterComponent.value.contains(event.target as Node)) {
			showOptions.value = false;
		}
	};

	const handleScroll = () => {
		showOptions.value = false;
	};

	onMounted(() => {
		document.addEventListener("click", handleClickOutside);
		window.addEventListener("scroll", handleScroll);
	});

	onBeforeUnmount(() => {
		document.removeEventListener("click", handleClickOutside);
		window.removeEventListener("scroll", handleScroll);
	});

	watch(
		() => props.modelValue,
		(newValue) => {
			selectedOptions.value = newValue;
		}
	);
</script>

<style scoped lang="scss">
	.filter-component {
		position: relative;
		display: inline-flex;

		@include bp($point_2) {
			width: 100%;
			padding: 1rem 0;
			flex-direction: column;
			align-items: flex-start;
		}
		&.isOpen {
			.filter-header button {
				transform: rotate(180deg);
				@include bp($point_2) {
					transform: rotate(0);
				}
			}
		}
	}

	.filter-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		font-size: 2rem;
		gap: 1rem;
		transition: all 0.3s ease-in-out;
		&:hover {
			color: #888888;
		}

		@include bp($point_2) {
			font-size: 1.4rem;
			width: 100%;
		}

		button {
			@include bp($point_2) {
				font-size: 2.2rem;
				transform: rotate(-90deg);
			}
		}

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			pointer-events: none;
		}
	}

	.filter-options {
		margin-top: 1rem;
	}

	.custom-checkbox {
		display: block;
		position: relative;
		padding-left: 2.5rem;
		margin-bottom: 1.2rem;
		cursor: pointer;
		user-select: none;
	}

	.custom-checkbox input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
	}

	.checkmark {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
		height: 2rem;
		width: 2rem;
		border: 0.1rem solid $black;
	}

	.custom-checkbox input:checked ~ .checkmark {
		background-color: $rose;
	}

	.custom-checkbox .checkmark:after {
		position: absolute;
		top: 65%;
		left: 48%;
		transform: translate(-50%, -50%);
		content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1rem' height='1rem' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M20.985 7.378L10.38 17.985l-6.364-6.364l1.414-1.414l4.95 4.95l9.192-9.193z'/%3E%3C/svg%3E");
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		visibility: hidden;
		transition: all 0.3s ease-in-out;
	}

	.custom-checkbox input:checked ~ .checkmark:after {
		opacity: 1;
		visibility: visible;
	}

	.filter-options {
		position: absolute;
		top: 100%;
		left: 0;
		border: 0.1rem solid $black;
		padding: 2rem 1rem 1rem 1rem;
		font-size: 1.6rem;
		min-width: 24rem;
		background-color: $white;
		z-index: 99;
		label {
			transition: all 0.3s ease-in-out;
			&:hover {
				color: #888888;
			}
		}
		@include bp($point_2) {
			position: static;
			border: none;
			padding: 0;
			font-size: 1.4rem;
		}
	}

	.selected-option {
		p {
			border-bottom: 0.1rem solid $black;
			display: inline-flex;
		}
	}

	h3 {
		font-family: $font_1;
		font-weight: 300;
		@include bp($point_2) {
			flex-grow: 1;
		}
	}
</style>
