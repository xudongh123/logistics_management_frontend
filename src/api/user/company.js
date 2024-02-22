import fetch from '@/api/fetch';

export function CompanyLogin(data) {
    return fetch({
        url: '/v1/user/company/loginex',
        method: 'post',
        data
    });
}

export function getInfo(params) {
    return fetch({
        url: '/v1/user/company/ex/info',
        method: 'get',
        params
    });
}

export function updateInfo(params) {
    return fetch({
        url: '/v1/user/company/info',
        method: 'put',
        params
    });
}

export function updatePassword(params) {
    return fetch({
        url: '/v1/user/company/password',
        method: 'put',
        params
    });
}
