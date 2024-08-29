<!-- @format -->

<template>
	<div class="contacts" v-if="contacts">
		<div class="container">
			<div class="contacts_main mb-18">
				<div class="contacts__info">
					<p>
						Если у вас возникли вопросы, вы можете связаться с нами любым удобным способом
					</p>
					<ul class="contacts_list">
						<li class="contacts_item">
							<p>Телефон</p>
							<a :href="'tel:' + contacts.phone" target="_blank">{{ contacts.phone }}</a>
						</li>
						<li class="contacts_item">
							<p>Электронная почта</p>
							<a :href="'mailto:' + contacts.email" target="_blank">{{
								contacts.email
							}}</a>
						</li>
						<li class="contacts_item">
							<p>Юридическая информация</p>
							<span>{{ contacts.legal_info }}</span>
						</li>
					</ul>
					<div class="social__list">
						<p>Мы в соц.сетях</p>
						<ul>
							<li v-for="(item, i) in contacts.sociality" :key="'sociality-item-' + i">
								<a :href="item.link" target="_blank">
									<img :src="item.img" alt="" />
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="contacts__img">
					<img :src="contacts.img" />
				</div>
			</div>
		</div>
		<Submission class="mb-18" />
		<Socials class="mb-18" />
	</div>
</template>

<script setup lang="ts">
	import Socials from "@/components/blocks/Socials.vue";
	import Submission from "@/components/ui/Submission.vue";
	import { useGlobalStore, useGlobalStoreRefs } from "~/stores/useGlobalStore";
	useHead({
		title: "Контакты",
	});

	const { changeLoad } = useGlobalStore();
	const { contacts } = useGlobalStoreRefs();
	// const contacts = ref<any>(null);

	// async function getAbout() {
	// 	try {
	// 		const { $main } = useNuxtApp();
	// 		const response = await $main.get("/pages/212?acf_format=standard");
	// 		contacts.value = response.data.acf;
	// 	} catch (error) {
	// 	} finally {
	// 		changeLoad();
	// 	}
	// }

	// onMounted(async () => {
	// 	await getAbout();
	// });
</script>

<style scoped lang="scss">
	.contacts_main {
		@include flex-start;
		align-items: flex-start;
		gap: 20.9rem;

		@include bp($point_2) {
			flex-direction: column;
			gap: 4rem;
		}
	}

	.contacts__info {
		& > p {
			font-size: 2rem;
			margin-bottom: 2.9rem;
			@include bp($point_2) {
				font-size: 1.4rem;
				max-width: 30rem;
			}
		}
	}

	.contacts_item {
		p {
			font-size: 2rem;
			color: #888888;
			margin-bottom: 1.5rem;
			@include bp($point_2) {
				font-size: 1.4rem;
			}
		}
		a,
		span {
			font-size: 3rem;
			line-height: 3.6rem;
			@include bp($point_2) {
				line-height: 100%;
				font-size: 1.4rem;
			}
		}
	}

	.contacts_list {
		margin-bottom: 2.5rem;
		li {
			max-width: 48.3rem;
			@include bp($point_2) {
				max-width: 30rem;
			}
			&:not(:last-child) {
				margin-bottom: 2.5rem;
				@include bp($point_2) {
					margin-bottom: 1.5rem;
				}
			}
		}
	}

	.social__list {
		p {
			font-size: 2rem;
			color: #888888;
			margin-bottom: 1.6rem;
		}

		ul {
			@include flex-start;
			gap: 1.5rem;
			li {
				width: 4.5rem;
				height: 4.5rem;
				@include flex-center;
				transition: all 0.3s ease-in-out;
				&:hover {
					opacity: 0.6;
				}
				a {
					@include flex-center;
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.contacts__img {
		display: flex;
		max-width: 36.3rem;
		width: 100%;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
