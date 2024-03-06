import fetch from '@/api/fetch';

export function getOrderList(params) {
    return fetch({
        url: '/order/list',
        method: 'get',
        params
    });
}

export function getOrder(id) {
    return fetch({
        url: '/order/'+id,
        method: 'get'
    });
}

export function deleteOrder(id) {
    return fetch({
        url: '/v1/order/'+id,
        method: 'delete'
    });
}

export function takingOrder(data) {
    return fetch({
        url: "/order/taking",
        method: "post",
        data,
    });
}

export function refuseOrder(data) {
    return fetch({
        url: "/order/refuse",
        method: "post",
        data,
    });
}

export function addOrder(data) {
    return fetch({
        url: '/order/add',
        method: 'post',
        data
    });
}

//订单签收
export function addSignOrder(data) {
    return fetch({
        url: '/order/sign',
        method: 'post',
        data
    });
}

export function getOrderCount(params) {
    return fetch({
        url: '/order/count',
        method: 'get',
        params
    });
}

export function getOrderCount7Day(params) {
    return fetch({
        url: '/order/count/7day',
        method: 'get',
        params
    });
}

