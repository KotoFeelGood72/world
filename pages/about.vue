<!-- @format -->

<template>
	<div class="about" v-if="about">
		<div class="container">
			<div class="about_main mb-18">
				<h1>{{ about.hero_title }}</h1>
				<ul class="aboutBlock__list">
					<li
						class="aboutBlock_item"
						v-for="(item, i) in about.block_imgs"
						:key="'about-item-' + i"
					>
						<div class="aboutBlock_item__img">
							<img :src="item.img.url" />
						</div>
						<div class="aboutBlock_content">
							<h2 v-if="item.title">{{ item.title }}</h2>
							<div v-html="item.txt"></div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<Submission class="mb-18" />
		<Socials class="mb-18" />
	</div>
</template>

<script setup lang="ts">
	import Socials from "@/components/blocks/Socials.vue";
	import Submission from "@/components/ui/Submission.vue";
	import { useGlobalStore } from "~/stores/useGlobalStore";
	useHead({
		title: "О бренде",
	});

	const { changeLoad } = useGlobalStore();
	const about = ref<any>(null);

	async function getAbout() {
		try {
			const { $main } = useNuxtApp();
			const response = await $main.get("/pages/190?acf_format=standard");
			about.value = response.data.acf;
		} catch (error) {
		} finally {
			changeLoad();
		}
	}

	onMounted(async () => {
		await getAbout();
	});
</script>

<style scoped lang="scss">
	.about_main {
		h1 {
			font-size: 4rem;
			font-family: $font_2;
			font-weight: 300;
			text-align: center;
			max-width: 80rem;
			margin: 0 auto 8rem auto;
		}
	}

	.aboutBlock__list {
		:deep(h2) {
			font-size: 3rem;
			font-family: $font_2;
			font-weight: 300;
			padding: 2rem 0;
			margin-bottom: -1rem;
		}
		:deep(h3) {
			font-size: 3rem;
			font-family: $font_2;
			font-weight: 300;
			padding: 2rem 0 1rem 0;
		}
		:deep(p) {
			padding: 1rem 0;
			font-size: 2rem;
			@include bp($point_2) {
				font-size: 1.4rem;
			}
		}
		:deep(li) {
			@include flex-start;
			align-items: flex-start;
			gap: 10rem;
			@include bp($point_2) {
				gap: 4rem;
				flex-direction: column !important;
			}
			&:not(:last-child) {
				margin-bottom: 14rem;
				@include bp($point_2) {
					margin-bottom: 6rem;
				}
			}

			&:nth-child(even) {
				flex-direction: row-reverse;
			}
		}
	}

	.aboutBlock_content {
		margin-top: -3rem;
	}

	.aboutBlock_item__img {
		@include bp($point_2) {
			width: 100%;
			height: 100%;
		}
		img {
			@include bp($point_2) {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
