import useStore from "../context/cartStore";
function useCart() {
    const cart = useStore((state) => state.cart);
    const addToCart = useStore((state) => state.addToCart);
    const removeFromCart = useStore((state) => state.removeFromCart);
    const clearCart = useStore((state) => state.clearCart);

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };


    return { cart, handleAddToCart, handleRemoveFromCart };
}

export default useCart;