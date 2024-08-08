<template>
  <section class="bread">
    <div class="container">
      <nav class="breadcrumb">
        <ul>
          <li
            v-for="(breadcrumb, index) in mergedBreadcrumbs"
            :key="index"
            :class="{ active: index === mergedBreadcrumbs.length - 1 }"
          >
            <template v-if="index !== mergedBreadcrumbs.length - 1">
              <NuxtLink :to="breadcrumb.path">{{ breadcrumb.title }}</NuxtLink>
            </template>
            <template v-else>
              <span>{{ breadcrumb.title }}</span>
            </template>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  breadcrumbs: {
    type: Array,
    default: () => [],
  },
});

const mergedBreadcrumbs = computed(() => {
  return [{ path: "/", title: "Главная" }, ...props.breadcrumbs];
});
</script>

<style scoped lang="scss">
.breadcrumb {
  margin-top: 6rem;
  margin-bottom: 6rem;
  @include bp($point_2) {
    margin: 0;
    padding: 3rem 0;
  }
  ul {
    @include flex-start;
    @include bp($point_2) {
      flex-wrap: wrap;
    }
  }

  li {
    font-size: 4rem;
    font-family: $font_2;
    font-weight: 300;
    @include bp($point_2) {
      font-size: 2rem;
    }

    a,
    span {
      font-size: 4rem;
      font-family: $font_2;
      font-weight: 300;
      @include bp($point_2) {
        font-size: 2rem;
      }
    }

    &:not(:last-child)::after {
      content: "/";
    }

    &.active {
      color: #888888;
    }

    a {
      color: $black;
      &:hover {
        opacity: 0.6;
      }
    }
  }
}
</style>
