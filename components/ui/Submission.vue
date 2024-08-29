<!-- @format -->

<template>
	<div class="submission">
		<div class="container">
			<div class="submission__main">
				<h5>Подписка на рассылку</h5>
				<div class="submission_form__w">
					<p>Обещаем, что будем отправлять только самые интересные сообщения</p>
					<div class="submission_form">
						<div class="submission__input">
							<input
								type="email"
								v-model="email"
								placeholder="e-mail"
								@keyup.enter="openSubmission"
							/>
						</div>
						<Button name="ПОДПИСАТЬСЯ" @click="openSubmission" :isLoading="isLoading" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import Button from "@/components/ui/Button.vue";
	import { useToast } from "vue-toastification";
	import { useNuxtApp } from "#app";

	const email = ref("");
	const lastSubmissionTime = ref<number | null>(null);
	const isLoading = ref(false);
	const toast = useToast();

	async function openSubmission() {
		const now = Date.now();

		if (lastSubmissionTime.value && now - lastSubmissionTime.value < 120000) {
			const remainingTime = Math.ceil((120000 - (now - lastSubmissionTime.value)) / 1000);
			toast.error(`Подождите ${remainingTime} секунд перед повторной отправкой.`);
			return;
		}

		if (!validateEmail(email.value)) {
			toast.error("Пожалуйста, введите корректный email.");
			return;
		}

		const { $domain } = useNuxtApp();

		isLoading.value = true;
		try {
			const response = await $domain.post("/wp-json/subscribe/v1/add/", {
				email: email.value,
			});

			if (response.data && response.data.success) {
				toast.success("Вы успешно подписались");
				email.value = "";
				lastSubmissionTime.value = now;
			} else {
				throw new Error(
					response.data?.message || "Не удалось подписаться. Попробуйте еще раз."
				);
			}
		} catch (err) {
			toast.error("Ошибка отправки");
		} finally {
			isLoading.value = false;
		}
	}

	function validateEmail(email: string) {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
		return re.test(String(email).toLowerCase());
	}
</script>

<style scoped lang="scss">
	.submission__main {
		h5 {
			font-size: 4rem;
			text-transform: uppercase;
			font-family: $font_2;
			font-weight: 300;
			text-align: center;
			margin-bottom: 6rem;
			@include bp($point_2) {
				font-size: 2rem;
				margin-bottom: 1.5rem;
			}
		}
	}
	.submission_form__w {
		@include flex-center;
		gap: 2rem 9rem;
		align-items: flex-start;
		@include bp($point_2) {
			flex-direction: column;
			text-align: center;
			gap: 3rem;
			width: 100%;
		}
		p {
			font-size: 2.5rem;
			max-width: 47.5rem;
			@include bp($point_2) {
				font-size: 1.4rem;
				max-width: 100%;
			}
		}
	}

	.submission_form {
		flex-grow: 1;
		@include bp($point_2) {
			width: 100%;
		}
		:deep(.button button) {
			@include bp($point_2) {
				font-size: 1.2rem;
				padding: 1.1rem 4.8rem;
			}
		}
	}
	.submission__input {
		margin-bottom: 4rem;
		width: 100%;
		@include bp($point_2) {
			margin-bottom: 2rem;
			max-width: 28.4rem;
		}
		input {
			width: 100%;
			@include app;
			font-size: 3rem;
			border: 0.1rem solid $black;
			padding: 1.4rem 4rem;
			@include bp($point_2) {
				font-size: 1.2rem;
				padding: 0.7rem 1.6rem;
			}
			&::-webkit-input-placeholder {
				color: #cccccc;
				opacity: 1;
			}
		}
	}

	.submission_form {
		@include flex-center;
		flex-direction: column;
	}
</style>
