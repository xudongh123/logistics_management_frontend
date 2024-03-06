import fetch from '@/api/fetch';

export function userList(params) {
    return fetch({
        url: '/user/list',
        method: 'get',
        params
    });
}

export function addUser(data) {
    return fetch({
        url: '/user/add',
        method: 'post',
        data
    });
}

export function deleteUser(token) {
    return fetch({
        url: '/user/delete/' + token,
        method: 'delete',
    });
}

export function login(data) {
    return fetch({
        url: '/login',
        method: 'post',
        data
    });
}

export function getInfo(params) {
    return fetch({
        url: '/user/info',
        method: 'get',
        params
    });
}

export function updateInfo(data) {
    return fetch({
        url: '/v1/user/info',
        method: 'post',
        data
    });
}

export function updatePassword(data) {
    return fetch({
        url: '/user/password',
        method: 'post',
        data
    });
}