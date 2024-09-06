import { defineStore, storeToRefs } from "pinia";
import { useNuxtApp } from "#app";

export const useGlobalStore = defineStore("main", {
  state: () => ({
    cat: [] as any,
    attr: {} as any,
    products: [] as any,
    filteredProducts: [] as any, // Отфильтрованные продукты
    option: {} as any,
    newProducts: [] as any,
    load: false as boolean,
    categories: [] as any,
    contacts: null as any,
    showAllProducts: false as boolean,
  }),
  actions: {
    async changeLoad() {
      this.load = !this.load;
    },
    async getAbout() {
      const { $main } = useNuxtApp();
      try {
        const response = await $main.get("/pages/212?acf_format=standard");
        this.contacts = response.data.acf;
      } catch (error) {
      } finally {
        this.load = false;
      }
    },

    async getProducts() {
      try {
        const { $custom } = useNuxtApp();
        const response = await $custom.get("/all-products.json");
        this.products = response.data; // Загрузка всех продуктов
        this.filteredProducts = [...this.products]; // Инициализация с полным списком

        // Получаем три самых "новых" продукта, сортируя по дате создания
        this.newProducts = [...this.products]
          .sort(
            (a, b) =>
              new Date(b.date_created).getTime() -
              new Date(a.date_created).getTime()
          )
          .slice(0, 3); // Берем первые три
      } catch (error) {
        console.error("Ошибка при получении товаров:", error);
      }
    },

    getFilteredProducts(
      selectedCategories: string[],
      selectedSizes: string[],
      selectedColors: string[],
      searchQuery: string,
      orderBy: string,
      order: string
    ) {
      if (this.products) {
        let filteredProducts = [...this.products];

        // Фильтрация по категориям
        if (selectedCategories.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            selectedCategories.includes(product.category_id.toString())
          );
        }

        if (selectedColors.length > 0) {
          console.log("Selected Colors:", selectedColors); // Логгируем выбранные цвета
          filteredProducts = filteredProducts.filter((product) => {
            // Проверяем, что у продукта есть атрибуты и атрибут "pa_color"
            if (product.attributes && product.attributes.pa_color) {
              console.log("Product Colors:", product.attributes.pa_color); // Логгируем цвета продукта
              return selectedColors.some((color) =>
                product.attributes.pa_color.some(
                  (productColor: any) => productColor.id === parseInt(color)
                )
              );
            }
            return false; // Если нет атрибута "pa_color", продукт исключаем
          });
        }

        if (selectedSizes.length > 0) {
          console.log("Selected Sizes:", selectedSizes); // Логгируем выбранные размеры
          filteredProducts = filteredProducts.filter((product) => {
            // Проверяем, что у продукта есть атрибуты и атрибут "pa_size"
            if (product.attributes && product.attributes.pa_size) {
              console.log("Product Sizes:", product.attributes.pa_size); // Логгируем размеры продукта
              return selectedSizes.some((size) =>
                product.attributes.pa_size.some(
                  (productSize: any) => productSize.id === parseInt(size)
                )
              );
            }
            return false; // Если нет атрибута "pa_size", продукт исключаем
          });
        }

        // Фильтрация по поисковому запросу
        if (searchQuery) {
          filteredProducts = filteredProducts.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        switch (orderBy) {
          case "price":
            filteredProducts.sort((a, b) => {
              const priceA = parseFloat(a.price) || 0;
              const priceB = parseFloat(b.price) || 0;
              return order === "asc" ? priceA - priceB : priceB - priceA;
            });
            break;
          case "date":
            filteredProducts.sort((a, b) => {
              const dateA = new Date(a.date_created).getTime();
              const dateB = new Date(b.date_created).getTime();
              return order === "asc" ? dateA - dateB : dateB - dateA;
            });
            break;
          case "popularity":
            // Если у вас есть данные о популярности, например рейтинг
            filteredProducts.sort((a, b) => {
              const popularityA = a.popularity || 0;
              const popularityB = b.popularity || 0;
              return order === "asc"
                ? popularityA - popularityB
                : popularityB - popularityA;
            });
            break;
          default:
            break;
        }

        // Обновляем отфильтрованные продукты
        this.filteredProducts = filteredProducts;
      }
    },

    async getCat() {
      try {
        const { $custom } = useNuxtApp();
        const response = await $custom.get("/product-categories.json");

        // Фильтруем категории, исключая те, у которых количество товаров равно 0
        const filteredCategories = response.data.filter(
          (category: any) => category.count > 0
        );

        // Присваиваем отфильтрованные категории
        this.cat = filteredCategories;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    async getOption() {
      try {
        const { $custom } = useNuxtApp();
        const response = await $custom.get("/options.json");
        this.option = response.data;
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    },

    async getAttr() {
      try {
        const { $custom } = useNuxtApp();
        const response = await $custom.get("/all-product-attributes.json");
        console.log(response.data);
        this.attr = response.data;
      } catch (error) {
        console.error("Error fetching attributes:", error);
      }
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});

export const useGlobalStoreRefs = () => storeToRefs(useGlobalStore());
