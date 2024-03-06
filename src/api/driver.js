import fetch from "@/api/fetch";

export function getDriverList(params) {
    return fetch({
        url: "/driver/list",
        method: "get",
        params,
    });
}

export function addDriver(params) {
    return fetch({
        url: "/driver/add",
        method: "post",
        params,
    });
}

export function deleteDriver(id) {
    return fetch({
        url: "/driver/delete" + id,
        method: "delete",
    });
}
