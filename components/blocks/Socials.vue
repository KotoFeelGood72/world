<!-- @format -->

<template>
	<section class="socials" v-if="main.options && main.options.social_title">
		<div class="container">
			<div class="socials_main">
				<h5>{{ main.options.social_title }}</h5>
				<ul class="socials__grid">
					<li v-for="(item, i) in main.options.social_list" :key="'socials-item' + i">
						<a target="_blank" :href="item.ssylka">
							<img :src="item.img" />
						</a>
					</li>
				</ul>
				<div class="social_all">
					<Button name="ПЕРЕЙТИ" @click="openVk('https://vk.com/feed')" />
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { useGlobalStoreRefs } from "~/stores/useGlobalStore";
	import Button from "@/components/ui/Button.vue";

	const { main } = useGlobalStoreRefs();

	function openVk(link: string) {
		window.open(link, "_blank");
	}
</script>

<style scoped lang="scss">
	.socials_main {
		text-align: center;
		h5 {
			font-size: 4rem;
			font-family: $font_2;
			font-weight: 400;
			max-width: 70rem;
			margin: 0 auto 6rem auto;
			text-transform: uppercase;
			line-height: 100%;
			@include bp($point_2) {
				font-size: 2rem;
				margin-bottom: 2.8rem;
			}
		}
		:deep(.button button) {
			@include bp($point_2) {
				font-size: 1.2rem;
				padding: 1.1rem 6.4rem;
			}
		}
	}

	.socials__grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
		grid-gap: 4rem;
		margin-bottom: 4.5rem;
		@include bp($point_2) {
			grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
			grid-gap: 1.6rem;
			margin-bottom: 3.5rem;
		}

		li {
			overflow: hidden;
			position: relative;
			&:hover {
				&:before {
					opacity: 1;
					visibility: visible;
				}
			}
			&:before {
				position: absolute;
				top: 0;
				left: 0;
				content: "";
				width: 100%;
				height: 100%;
				background-color: #ffffff23;
				backdrop-filter: blur(0.5rem);
				pointer-events: none;
				opacity: 0;
				visibility: hidden;
				transition: all 0.5s ease-in-out;
			}
		}
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: all 0.3s ease-in-out;
		}
	}

	.social_all {
		@include flex-center;
	}
</style>
