import API from "../config/axiosConfig";


export const getEvent = (id) => {
    id = id || '';
    return API.get(`events/${id}`)
}

export const add = (body) => {
    return API.post(`events`,body)
}
export const  updateEvent= (id,body)=>{
    return API.put(`events/${id}`,body)
}

export  const remove = (id)=>{
    return API.delete(`events/${id}`)
}