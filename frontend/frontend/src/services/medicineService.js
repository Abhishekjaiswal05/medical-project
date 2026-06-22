import api from "./api"
export const getMedicines = async () => {

   const email = localStorage.getItem("email")

   const response = await api.get(`/medicine/${email}`)

   return response.data
}

export const addMedicine = async (medicineData) => {
  const response = await api.post(
    "/medicine",
    medicineData
  )

  return response.data
}

export const deleteMedicine = async (id) => {
  const response = await api.delete(
    `/medicine/${id}`
  )

  return response.data
}

export const markMedicineTaken = async (id) => {
  const response = await api.put(
    `/medicine/${id}/taken`
  )

  return response.data
}