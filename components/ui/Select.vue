<template>
  <div class="custom-select" ref="selectRef" @click="toggleDropdown">
    <div class="custom-select__selected">
      {{ selectedLabel }}
      <div class="icon_dropdown">
        <Icon name="akar-icons:chevron-down" />
      </div>
    </div>
    <ul v-if="isOpen" class="custom-select__dropdown">
      <li
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option.value)"
        class="custom-select__option"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

interface Option {
  value: string | number;
  label: string;
}

const props = defineProps<{
  modelValue: string | number;
  options: Option[];
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const isOpen = ref(false);
const selectedLabel = ref<string | number>("");
const selectRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (value: string | number) => {
  emits("update:modelValue", value);
  selectedLabel.value =
    props.options.find((option) => option.value === value)?.label || "";
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

// Watch for changes in modelValue to update the selectedLabel
watch(
  () => props.modelValue,
  (newValue) => {
    selectedLabel.value =
      props.options.find((option) => option.value === newValue)?.label || "";
  },
  { immediate: true }
);

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped lang="scss">
.custom-select {
  position: relative;
  min-width: 21rem;
  max-width: 30rem;
  cursor: pointer;
  user-select: none;
  @include bp($point_2) {

    display: inline-flex;
    flex-direction: column;
  }

  &__option {
    padding: 1rem;
    &:hover {
      background-color: #f1f1f1;
    }
  }
}

.custom-select__selected {
  border: 0.1rem solid $black;
  font-size: 2rem;
  padding: 0.5rem 1.4rem;
  @include flex-space;
  position: relative;
  @include bp($point_2) {
    font-size: 1.4rem;
  }
}

.icon_dropdown {
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  @include flex-center;
}

.custom-select__dropdown {
  border: 0.1rem solid $black;
  border-top: 0.1rem solid transparent;
  font-size: 1.8rem;
  background-color: #fff;
  z-index: 1000;
  max-height: 15rem;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
    @include bp($point_2) {
    font-size: 1.4rem;
  }
}
</style>
