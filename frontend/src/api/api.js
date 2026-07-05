import axios from "axios";

const api = axios.create({
  baseURL: "/api"
});

export const fetchFilters = () => api.get("/filters").then((res) => res.data);
export const fetchStats = (params) => api.get("/stats", { params }).then((res) => res.data);
export const fetchCharts = (params) => api.get("/charts", { params }).then((res) => res.data);
export const fetchInsights = (params) => api.get("/insights", { params }).then((res) => res.data);

export default api;