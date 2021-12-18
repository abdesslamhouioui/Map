import { ADD_BUILDING, EDIT_BUILDING, DELETE_BUILDING, SHOW, ACTIVE } from "./constants";
export const addBuilding = (client, newBuilding) => {
    return { type: ADD_BUILDING, payload: [client, newBuilding] }
}
export const editBuilding = (client, newBuilding, building) => {
    return { type: EDIT_BUILDING, payload: [client, newBuilding, building] }
}
export const deleteBuilding = (client, building) => {
    return { type: DELETE_BUILDING, payload: [client, building] }
}
export const show = (add) => {
    return { type: SHOW, payload: add }
}
export const active = (active) => {
    return { type: ACTIVE, payload: active }
}