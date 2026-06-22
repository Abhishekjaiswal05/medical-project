import { UploadCloud } from "lucide-react";
import { useState } from "react";



export default function PrescriptionUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState("");

    const [loading, setLoading] = useState(false);
    const [medicineList, setMedicineList] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const extractTextFromImage = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
        "apikey",
        "K83867123888957"
    );

    formData.append(
        "language",
        "eng"
    );

    const response = await fetch(
        "https://api.ocr.space/parse/image",
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    return data.ParsedResults[0].ParsedText;
};



    const handleExtractMedicines = async () => {

        try {

            setLoading(true);
const extractedText =
    await extractTextFromImage(
        selectedFile
    );

console.log(
    "OCR TEXT:",
    extractedText
);

            const response = await fetch(
                "http://localhost:8080/api/ai/extract-medicines",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        prescriptionText:
                            extractedText
                    })
                }
            );

            const medicines =
                await response.text();

            setMedicineList(medicines);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-white p-8">
            <h1 className="text-4xl font-bold text-cyan-400 mb-8">
                Prescription Upload
            </h1>

            <div className="bg-[#1B2448] p-8 rounded-3xl shadow-xl">

                <label className="block mb-4 text-xl font-semibold text-cyan-300">
                    Upload Prescription
                </label>

                <div className="border-2 border-dashed border-cyan-400 rounded-3xl p-12 text-center bg-[#111B44] hover:border-cyan-300 transition">

                    <UploadCloud
                        size={60}
                        className="mx-auto text-cyan-400 mb-4"
                    />

                    <p className="text-2xl font-semibold mb-3">
                        Drag & Drop Prescription Here
                    </p>

                    <p className="text-gray-400 mb-6">
                        JPG, PNG, JPEG Supported
                    </p>

                    <label
                        htmlFor="prescription-upload"
                        className="
            inline-block
            bg-cyan-500
            hover:bg-cyan-600
            px-8
            py-4
            rounded-full
            font-bold
            cursor-pointer
            transition
        "
                    >
                        Upload Prescription
                    </label>

                    <input
                        id="prescription-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                {preview && (
                    <div className="mt-10 flex justify-center">
                        <img
                            src={preview}
                            alt="Prescription Preview"
                            className="
                rounded-3xl
                max-h-[500px]
                border-4
                border-cyan-400
                shadow-2xl
            "
                        />
                    </div>
                )}

                {selectedFile && (
                    <div className="flex justify-center">
                        <button
                            onClick={handleExtractMedicines}
                            className="
            mt-8
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            hover:scale-105
            transition
            px-10
            py-4
            rounded-2xl
            font-bold
            text-lg
            shadow-xl
        "
                        >
                            Extract Medicines
                        </button>
                    </div>
                )}
                {medicineList && (

                    <div className="mt-10 bg-[#111B44] p-6 rounded-3xl">

                        <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                            Medicines Found
                        </h2>

                        <pre className="whitespace-pre-wrap text-gray-200">
                            {medicineList}
                        </pre>

                    </div>

                )}
            </div>
        </div>
    );
}