import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const deleteType = async (id) => {
    let str = `api/type/${id}`
    console.log(str)
    const {data} = await $authHost.post(`api/type/${id}`)
    return data
}

export const deleteBrand = async (id) => {
    let str = `api/brand/${id}`
    const {data} = await $authHost.post(str)
    return data
}

export const deleteDevice = async (id) => {
    let str = `api/device/del/${id}`
    console.log(str)
    const {data} = await $authHost.post(str)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit) => {
    const { data } = await $host.get('api/device', {
        params: { typeId, brandId, page, limit }
    });
    return data;
};

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}
