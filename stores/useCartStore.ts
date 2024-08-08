import { defineStore, storeToRefs } from 'pinia';
import type { ProductType } from '~/types/ProductTypes';



interface CartState {
  carts: ProductType[];
}

export const useCartStore = defineStore('carts', {
  state: (): CartState => ({
    carts: [],
  }),
  actions: {
    addCart(item: ProductType) {
      if (!this.carts.find(cart => cart.id === item.id)) {
        this.carts.push(item);
      }
    },
    removeCart(item: ProductType) {
      this.carts = this.carts.filter(cart => cart.id !== item.id);
    },
  },
  persist: true,
});

export const useCartStoreRefs = () => storeToRefs(useCartStore());
