import { ADD_BUILDING, EDIT_BUILDING, DELETE_BUILDING, SHOW, ACTIVE } from "./constants";

const initialState = {
    clients: {
        Client1: [{ name: 'building1', location: 'Tunisia' }],
        Client2: [{ name: 'building1', location: 'Egypt' }, { name: 'building2', location: 'France' }],
        Client3: [{ name: 'building1', location: 'United States of America' }, { name: 'building2', location: 'United Arab Emirates' }, { name: 'building3', location: 'Saudi Arabia' }],
        Client4: [{ name: 'building1', location: 'Algeria' }, { name: 'building2', location: 'Spain' }, { name: 'building3', location: 'Italy' }, { name: 'building4', location: 'Egypt' }]
    },
    add: false,
    active: { building: '', active: false },
}
const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_BUILDING: return { ...state, clients: { ...state.clients, [payload[0]]: [...state.clients[payload[0]], payload[1]] } }
        case EDIT_BUILDING: return { ...state, clients: { ...state.clients, [payload[0]]: [...state.clients[payload[0]].map(el => el.name === payload[2].name?payload[1]:el)] } }
        case DELETE_BUILDING: return { ...state, clients: { ...state.clients, [payload[0]]: [...state.clients[payload[0]].filter(el => el.name !== payload[1].name)] } }
        case SHOW: return { ...state, add: payload }
        case ACTIVE: return { ...state, active: payload }
        default:
            return state
    }
}
export default reducer