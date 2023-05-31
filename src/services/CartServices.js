import { http } from "../helpers/request"
import { GetProductByID } from "./Services";
import { ShowAlertToast, ShowSuccessToast } from "./ToastService";

export const AddProductToCart = async (id, quantity) => {
    if (localStorage.getItem("user_id") === null || localStorage.getItem("user_id") === undefined) {
        ShowAlertToast("Please login!")
        return null;
    }
    const { data } = await http.post(`/cart/modify_add_single?user_id=${localStorage.getItem("user_id")}&product_id=${id}&quantity=${quantity}`);
    console.log(data);
    return data;
}
export const GetCurrentCartLine = async () => {
    if (localStorage.getItem("user_id") === null || localStorage.getItem("user_id") === undefined) {
        ShowAlertToast("Please login!")
        return null;
    }
    const { data } = await http.get(`/cart/get_current?user_id=${localStorage.getItem("user_id")}`);
    return data;
}
export const GetProductsByCartID = async (cart_id) => {
    if (localStorage.getItem("user_id") === null || localStorage.getItem("user_id") === undefined) {
        ShowAlertToast("Please login!")
        return null;
    }
    const { data } = await http.get(`/cart_lines/get?cart_id=${cart_id}`);
    var temp_array = [];
    for (var i = 0; i < data.data.length; i++) {
        var productResponse = await GetProductByID(data.data[i].product_id);
        temp_array.push(productResponse.response.data);
    }
    return temp_array;
}
export const GetCartLinesByCartID = async (cart_id) => {
    if (localStorage.getItem("user_id") === null || localStorage.getItem("user_id") === undefined) {
        ShowAlertToast("Please login!")
        return null;
    }
    const { data } = await http.get(`/cart_lines/get?cart_id=${cart_id}`);
    return data;
}
export const ModifyProductOfCart = async (product_id, quantity) => {
    var user_id = localStorage.getItem("user_id");
    if (user_id === null || user_id === undefined) {
        ShowAlertToast("Please login!")
        return null;
    }
    const { data } = await http.post(`/cart/modify?user_id=${user_id}&product_id=${product_id}&quantity=${quantity}`);
    console.log(`status ${data.status_code} quantity ${quantity}`)
    if (data.status_code === 202) {
        ShowSuccessToast("Product removed from cart");
    }
    return data;
}
export const ClearCart = async (cart_id) => {
    var user_id = localStorage.getItem("user_id");
    if (user_id === null || user_id === undefined) {
        ShowAlertToast("Please login!")
        return null;
    }
    const { data } = await http.delete(`/cart/clear?cart_id=${cart_id}`);
    console.log(data);
    if (data.status_code === 200) {
        ShowSuccessToast("Cart Cleared!");
    }
    return data;
}
export const MakeOrder = async (cart) => {
    var user_id = localStorage.getItem("user_id");
    if (user_id === null || user_id === undefined) {
        ShowAlertToast("Please login!")
        return null;
    }
    const { data } = await http.post(`/cart/order_without_pay?cart_id=${cart.cart_id}`, {
        cart_id: cart.cart_id,
        phoneNumber: cart.phoneNumber,
        address: cart.address
    });
    console.log(data);
    if (data.status_code === 200) {
        ShowSuccessToast("Order Sent!");
    } else {
        ShowAlertToast("Something wrong!");
    }
    return data;
}
export const GetCartsForUser = async () => {
    var user_id = localStorage.getItem("user_id");
    if (user_id === null || user_id === undefined) {
        ShowAlertToast("Please login!")
        return null;
    }
    const { data } = await http.get(`/cart?user_id=${user_id}`);

    return data;
}