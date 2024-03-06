import fetch from '@/api/fetch';

export function getCarList(params) {
    return fetch({
        url: '/car/list',
        method: 'get',
        params
    });
}

export function addCar(data) {
    return fetch({
        url: '/car/add',
        method: 'post',
        data
    });
}

export function deleteCar(id) {
    return fetch({
        url: '/car/delete/'+id,
        method: 'delete'
    });
}
