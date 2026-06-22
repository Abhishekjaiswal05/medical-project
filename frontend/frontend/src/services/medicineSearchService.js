import axios from "axios"

export const searchMedicines = async (query) => {

  if (!query) return []

  try {

    const response = await axios.get(
      `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${query}*&limit=10`
    )

    return response.data.results || []

  } catch (error) {

    console.log(error)

    return []
  }
}