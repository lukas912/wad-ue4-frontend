import axios from "axios";

class DataService {
    static url = "http://localhost:8080";

    getTasks() {
        return axios.create({
            baseURL: DataService.url,
            headers: {
                "Content-type": "application/json"
            }
        }).get(`/tasks`)
    }

    getTasksSorted(sort) {
        return axios.create({
            baseURL: DataService.url,
            headers: {
                "Content-type": "application/json"
            }
        }).get(`/tasks?sort=${sort}`)
    }

    getTasksFiltered(filter) {
        return axios.create({
            baseURL: DataService.url,
            headers: {
                "Content-type": "application/json"
            }
        }).get(`/tasks?filter=${filter}`)
    }

    getTasksSortedAndFiltered(sort, filter) {
        return axios.create({
            baseURL: DataService.url,
            headers: {
                "Content-type": "application/json"
            }
        }).get(`/tasks?sort=${sort}&filter=${filter}`)
    }

    getTaskById(id) {
        return axios.create({
            baseURL: DataService.url,
            headers: {
                "Content-type": "application/json"
            }
        }).get(`/task/${id}`)
    }

    createTask(json) {
        return axios.create({
            baseURL: DataService.url,
            headers: {
                "Content-type": "application/json"
            }
        }).post(`/task`, json)
    }

    editTask(json) {
        return axios.create({
            baseURL: DataService.url,
            headers: {
                "Content-type": "application/json"
            }
        }).put(`/task`, json)
    }

    deleteTask(id) {
        return axios.create({
            baseURL: DataService.url,
            headers: {
                "Content-type": "application/json"
            }
        }).post(`/task/${id}`)
    }
}

export default new DataService();