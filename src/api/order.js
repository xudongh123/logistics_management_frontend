import fetch from '@/api/fetch';

export function getOrderListAll(params) {
  return fetch({
    url: '/v1/order/page/all',
    method: 'get',
    params
  });
}

export function getOrderList(params) {
    return fetch({
        url: '/v1/order/page',
        method: 'get',
        params
    });
}

export function getOrderListByCustomer(params) {
    return fetch({
        url: '/v1/order/page/customer',
        method: 'get',
        params
    });
}

export function getOrder(id) {
    return fetch({
        url: '/v1/order/'+id,
        method: 'get'
    });
}

export function deleteOrder(id) {
    return fetch({
        url: '/v1/order/'+id,
        method: 'delete'
    });
}


export function addCustomerOrder(params) {
    return fetch({
        url: '/v1/order/customer',
        method: 'post',
        params
    });
}

export function deleteCustomerOrder(id){
    return fetch({
        url: '/v1/order/customer/'+id,
        method: 'delete',
    });
}

//订单处理
export function addTakingOrder(params) {
    return fetch({
        url: '/v1/order/taking',
        method: 'post',
        params
    });
}

export function refuseCustomerOrder(data) {
    return fetch({
        url: '/v1/order/customer/refuse',
        method: 'post',
        data
    });
}


//订单签收
export function addSignOrder(data) {
    return fetch({
        url: '/v1/order/sign',
        method: 'post',
        data
    });
}

//修改合同
export function editContractOrder(id,params) {
    return fetch({
        url: '/v1/order/contract/'+id,
        method: 'put',
        params
    });
}

