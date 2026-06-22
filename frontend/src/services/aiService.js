import api from "./api"

export const sendMessageToAI = async (message) => {

  try {

    const response = await api.post("/ai/chat", {
      message
    })

    return response.data

  } catch (error) {

    console.error(error)

    throw error
  }
}
export const extractMedicinesFromImage = async (imageBase64) => {

  try {

    const response = await api.post(
      "/ai/extract-medicines",
      {
        imageBase64
      }
    )

    return response.data

  } catch (error) {

    console.error(error)

    throw error
  }
}