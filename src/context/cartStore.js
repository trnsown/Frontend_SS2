import { create } from "zustand";
import { persist } from "zustand/middleware"
const useStore = create(
    persist(
        (set, get) => ({
            products: [],
            addToCart: (product) => {
                const products = get().products;
                const index = products.findIndex((item) => item.id === product.id);
                if (index >= 0) {
                    const updatedCart = [...products];
                    updatedCart[index].quantity += product.quantity;
                    set({ products: updatedCart });
                } else {
                    set((state) => ({ products: [...state.products, product] }));
                }
            },
            removeFromCart: (productId) => {
                console.log(productId);
                const updatedCart = get().products.filter((item) => item.id !== productId);

                set({ products: updatedCart });
            },
            setItemQuantity: (productId, quantity) => {
                const products = get().products;
                const itemCart = products.find((item) => item.id === productId);
                console.log(itemCart);
                const updatedCart = [...products];
                itemCart.quantity = quantity;
                set({ products: updatedCart });
            },
            clearCart: () => {
                set({ products: [] });
            }
        }),
        {
            name: 'cart-store', // name for the store
            getStorage: () => sessionStorage, // storage engine
        }
    )
)

export default useStore;