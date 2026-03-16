import axios from "axios"

const API = axios.create({
    baseURL: "https://resume-analyz-jh7c.onrender.com"
})

export default API