export default function PrescriptionUploadCard() {

    return (

        <div
            className="
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            p-8
            rounded-3xl
            text-white
            mt-10
        "
        >
            <h2 className="text-3xl font-bold">
                Upload Prescription
            </h2>

            <p className="mt-2">
                AI will automatically extract medicines
            </p>

            <button
                className="
                mt-5
                bg-white
                text-blue-600
                px-6
                py-3
                rounded-xl
                font-semibold
                "
            >
                Upload Prescription
            </button>
        </div>

    );
}