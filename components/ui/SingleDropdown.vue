<template>
  <div ref="dropdownComponent" :class="[{ isOpen: showOptions }, 'dropdown-component']">
    <div class="dropdown-header" @click="toggleOptions">
      <h3>{{ modelValue }}</h3>
      <button><Icon name="fluent:chevron-down-48-filled" /></button>
    </div>
    <div v-if="showOptions" class="dropdown-options">
      <label
        v-for="option in options"
        :key="'option-' + option"
        :class="['dropdown-option', { 'active-option': option === modelValue }]"
        @click="selectOption(option)"
      >
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, onBeforeUnmount } from "vue";

interface Props {
  options: string[];
  modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const showOptions = ref(false);
const dropdownComponent = ref<HTMLElement | null>(null);

const toggleOptions = () => {
  showOptions.value = !showOptions.value;
};

const selectOption = (option: string) => {
  emit("update:modelValue", option);
  showOptions.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    dropdownComponent.value &&
    !dropdownComponent.value.contains(event.target as Node)
  ) {
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
</script>

<style scoped lang="scss">
.dropdown-component {
  position: relative;
  display: inline-flex;
  @include bp($point_2) {
    flex-direction: column;
    padding: 1rem 0;
    width: 100%;
  }

  &.isOpen {
    .dropdown-header button {
      transform: rotate(180deg);
      @include bp($point_2) {
        transform: rotate(0);
      }
    }
  }
}

.dropdown-header {
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

.dropdown-options {
  margin-top: 10px;
  position: absolute;
  top: 100%;
  left: 0;
  border: 0.1rem solid #000;
  padding: 2rem 1rem 1rem 1rem;
  font-size: 1.6rem;
  min-width: 23rem;
  background-color: #fff;
  z-index: 99;
  @include bp($point_2) {
    position: static;
    border: none;
    padding: 0;
    font-size: 1.4rem;
  }
}

.dropdown-option {
  display: block;
  cursor: pointer;
  margin-bottom: 1.2rem;
  user-select: none;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #888888;
  }
  &.active-option {
    border-bottom: 0.1rem solid $black;
    display: inline-flex;
  }
  @include bp($point_2) {
    margin-bottom: 0.5rem;
  }
}

h3 {
  font-family: $font_1;
  font-weight: 300;
}
</style>
