import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
})


export class BaseService {
    constructor(private url:string){
        this.url = url
    }

    public findAll(){
        return api.get(this.url)
    }

    public findById(data:any){
        return api.get(`${this.url}/${data.id}`)
    }

    public create(data:any){
        return api.post(`${this.url}`, data)
    }

    public update(data:any){
       return api.put(`${this.url}/${data.id}`, data)
    }

    public delete(data:any){
       return  api.delete(`${this.url}/${data.id}`)
    }

    public updateStaus(data:any){
        return api.put(`${this.url}/${data.id}/status`, data.status)
    }
}
