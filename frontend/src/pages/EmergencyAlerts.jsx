import DashboardLayout from "../layouts/DashboardLayout"
import { useState, useEffect } from "react"

import {
    addContact,
    getContacts,
    deleteContact
}
    from "../services/emergencyService"
import api from "../services/api"

export default function EmergencyAlerts() {
    const [showModal, setShowModal] = useState(false)

    const [contact, setContact] = useState({
        name: "",
        phone: "",
        relation: "",
        email: ""
    })
    const [contacts, setContacts] = useState([])
    const fetchContacts = async () => {

        try {

            const data =
                await getContacts();

            setContacts(data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchContacts();

    }, []);

    const handleSaveContact = async () => {

        try {

            await addContact(contact);

            await fetchContacts();

            setContact({
                name: "",
                phone: "",
                relation: "",
                email: ""
            });

            setShowModal(false);

        } catch (error) {

            console.log(error);

        }

    };

    const handleDeleteContact =
        async (id) => {

            try {

                await deleteContact(id);

                await fetchContacts();

            } catch (error) {

                console.log(error);

            }

        };

   const handleSOS = async () => {

    navigator.geolocation.getCurrentPosition(

        async (position) => {

            const latitude =
                position.coords.latitude

            const longitude =
                position.coords.longitude

            try {

                await api.post(
                    "/emergency/sos",
                    {
                        latitude,
                        longitude
                    }
                )

                alert(
                    "🚨 SOS Sent Successfully"
                )

            } catch(error) {

                console.log(error)

            }

        }

    )

}
    return (

        <DashboardLayout>

            <div className="space-y-8">

                {/* PAGE TITLE */}

                <div>

                    <h1 className="text-4xl font-bold text-white">
                        🚨 Emergency Alerts
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Quickly notify emergency contacts in critical situations.
                    </p>

                </div>

                {/* SOS BUTTON */}

                <div className="
                bg-[#111827]
                rounded-3xl
                p-10
                text-center
                ">

                    <button
                        onClick={handleSOS}
                        className="
bg-red-600
hover:bg-red-700
text-white
text-2xl
font-bold
px-12
py-6
rounded-2xl
transition
"
                    >
                        🚨 SEND SOS ALERT
                    </button>

                    <p className="text-gray-400 mt-4">
                        Instantly notify your emergency contacts.
                    </p>

                </div>

                {/* CONTACTS */}

                <div className="
                bg-[#111827]
                rounded-3xl
                p-8
                ">

                    <div className="flex justify-between items-center">

                        <h2 className="text-2xl text-white font-bold">
                            Emergency Contacts
                        </h2>

                        <button
                            onClick={() => setShowModal(true)}
                            className="
    bg-blue-600
    hover:bg-blue-700
    text-white
    px-5
    py-3
    rounded-xl
    "
                        >
                            + Add Contact
                        </button>

                    </div>

                    <div className="mt-6 space-y-4">

                        {
                            contacts.map((item, index) => (

                                <div
                                    key={index}
                                    className="
bg-[#1B2448]
rounded-2xl
p-5
flex
justify-between
items-center
"
                                >

                                    <div>

                                        <h3 className="text-white font-bold">
                                            {item.name}
                                        </h3>

                                        <p className="text-gray-400">
                                            {item.phone}
                                        </p>

                                        <p className="text-blue-400 text-sm">
                                            {item.relation}
                                        </p>

                                    </div>

                                    <a
                                        href={`tel:${item.phone}`}
                                        className="
bg-green-600
px-5
py-2
rounded-lg
text-white
"
                                    >
                                        📞 Call
                                    </a>
                                    <button
                                        onClick={() =>
                                            handleDeleteContact(
                                                item._id || item.id
                                            )
                                        }
                                        className="
bg-red-600
px-5
py-2
rounded-lg
text-white
"
                                    >
                                        🗑 Delete
                                    </button>


                                </div>

                            ))
                        }

                    </div>
                </div>

            </div>
            {
                showModal && (

                    <div
                        className="
fixed
inset-0
bg-black/60
flex
items-center
justify-center
z-50
"
                    >

                        <div
                            className="
bg-[#111827]
p-8
rounded-3xl
w-[450px]
"
                        >

                            <h2
                                className="
text-white
text-2xl
font-bold
mb-6
"
                            >
                                Add Emergency Contact
                            </h2>

                            <input
                                value={contact.name}
                                onChange={(e) =>
                                    setContact({
                                        ...contact,
                                        name: e.target.value
                                    })
                                }
                                placeholder="Name"
                                className="
w-full
p-3
rounded-xl
mb-4
bg-[#1B2448]
text-white
"
                            />

                            <input
                                value={contact.phone}
                                onChange={(e) =>
                                    setContact({
                                        ...contact,
                                        phone: e.target.value
                                    })
                                }
                                placeholder="Phone Number"
                                className="
w-full
p-3
rounded-xl
mb-4
bg-[#1B2448]
text-white
"
                            />
                            <input
                                value={contact.relation}
                                onChange={(e) =>
                                    setContact({
                                        ...contact,
                                        relation: e.target.value
                                    })
                                }
                                placeholder="Relation"
                                className="
w-full
p-3
rounded-xl
mb-4
bg-[#1B2448]
text-white
"
                            />

                            <input
                                value={contact.email}
                                onChange={(e) =>
                                    setContact({
                                        ...contact,
                                        email: e.target.value
                                    })
                                }
                                placeholder="Email"
                                className="
    w-full
    p-3
    rounded-xl
    mb-4
    bg-[#1B2448]
    text-white
    "
                            />

                            <div className="flex gap-4">

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="
flex-1
bg-gray-700
py-3
rounded-xl
text-white
"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSaveContact}
                                    className="
    flex-1
    bg-blue-600
    py-3
    rounded-xl
    text-white
    "
                                >
                                    Save
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </DashboardLayout>

    )
}
