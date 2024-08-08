<template>
  <div class="accordion">
    <div class="accordion-header" @click="toggle" :class="{ isOpen: isOpen }">
      <h3>{{ title }}</h3>
      <button @click.stop="close">
        <Icon name="tabler:plus" size="30" />
      </button>
    </div>
    <transition
      name="accordion"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div v-show="isOpen" class="accordion-content" ref="content">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";

const props = defineProps<{
  id: number;
  title: string;
  currentOpenId: number | null;
}>();
const emit = defineEmits(["update:currentOpenId"]);

const isOpen = ref(false);
const content = ref(null);

const toggle = async () => {
  isOpen.value = props.currentOpenId !== props.id;
  emit("update:currentOpenId", isOpen.value ? props.id : null);
  await nextTick();
};

const close = () => {
  isOpen.value = false;
  emit("update:currentOpenId", null);
};

const beforeEnter = (el) => {
  el.style.height = "0";
};

const enter = (el) => {
  el.style.height = el.scrollHeight + "px";
};

const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + "px";
};

const leave = (el) => {
  el.style.height = "0";
};

watch(
  () => props.currentOpenId,
  () => {
    isOpen.value = props.currentOpenId === props.id;
  }
);
</script>

<style scoped lang="scss">
.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.3s ease-in-out;
}

.accordion-enter,
.accordion-leave-to {
  height: 0;
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5ddd6;
  padding: 2.1rem 3rem;
  border: 0.1rem solid #000;
  cursor: pointer;
  font-size: 2.5rem;
  transition: all 0.3s ease-in-out;

  h3 {
    font-family: "Arial", sans-serif;
    font-weight: 300;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    transition: all 0.3s ease-in-out;
  }

  &.isOpen {
    background-color: #f5ddd6;

    button {
      transform: rotate(45deg);
    }
  }
}

.accordion-content {
  font-size: 2rem;
  padding: 3rem;
  overflow: hidden;

  p {
    padding: 1rem 0;
  }

  ul {
    list-style: disc !important;
    padding-left: 2.5rem;
  }

  ol {
    list-style: decimal !important;
    padding-left: 2.5rem;
  }

  ul > li,
  ol > li {
    padding: 0.5rem 0;
  }
}
</style>
