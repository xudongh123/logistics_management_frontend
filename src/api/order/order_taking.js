import fetch from "@/api/fetch";

//订单处理
export function addTakingOrder(data) {
    return fetch({
        url: "/v1/order/taking",
        method: "post",
        data,
    });
}

export function refuseCustomerOrder(data) {
    return fetch({
        url: "/v1/order/customer/refuse",
        method: "post",
        data,
    });
}
