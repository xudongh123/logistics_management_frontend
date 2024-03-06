import fetch from '@/api/fetch';

export function addCustomerOrder(data) {
    return fetch({
        url: '/v1/order/customer',
        method: 'post',
        data
    });
}

//根据客户Token列出所有的Order
export function getCustomerOrder(params) {
    return fetch({
        url: '/v1/order/page/customer',
        method: 'get',
        params
    });
}
