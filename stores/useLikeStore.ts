import { defineStore, storeToRefs } from 'pinia';

import type { ProductType } from '~/types/ProductTypes';

interface LikeState {
  likes: ProductType[];
}

export const useLikeStore = defineStore('likes', {
  state: (): LikeState => ({
    likes: [],
  }),
  actions: {
    addLike(item: ProductType) {
      if (!this.likes.find(like => like.id === item.id)) {
        this.likes.push(item);
      }
    },
    removeLike(item: ProductType) {
      this.likes = this.likes.filter(like => like.id !== item.id);
    },
  },
 persist: true,
});

export const useLikeStoreRefs = () => storeToRefs(useLikeStore());
