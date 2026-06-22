import api from "./api"

export const getDashboardData = async () => {

  try {

    const email = localStorage.getItem("email")

    const response =
      await api.get(`/medicine/${email}`)

    return response.data

  } catch (error) {

    console.log("Dashboard API Error:", error)

    return []
  }
}