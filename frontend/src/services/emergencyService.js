import api from "./api";

export const addContact = async (contact) => {
    const response =
        await api.post(
            "/emergency/contact",
            contact
        );

    return response.data;
};

export const getContacts = async () => {
    const response =
        await api.get(
            "/emergency/contact"
        );

    return response.data;
};

export const deleteContact = async (id) => {
    await api.delete(
        `/emergency/contact/${id}`
    );
};