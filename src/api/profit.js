import fetch from '@/api/fetch';

export function getProfitList(params) {
    return fetch({
        url: '/profit/list',
        method: 'get',
        params
    });
}

export function addReceive(id, data) {
    return fetch({
        url: '/profit/receive/' + id,
        method: 'post',
        data
    });
}
export function addPay(id, data) {
    return fetch({
        url: '/v1/profit/pay/' + id,
        method: 'post',
        data
    });
}

export function getPayCard(id,params) {
    return fetch({
        url: '/v1/profit/pay/card/' + id,
        method: 'get',
        params
    });
}

export function addPayCard(id,params) {
    return fetch({
        url: '/v1/profit/pay/card/' + id,
        method: 'put',
        params
    });
}
