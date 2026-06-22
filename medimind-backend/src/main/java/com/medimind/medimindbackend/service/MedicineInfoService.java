package com.medimind.medimindbackend.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MedicineInfoService {

    private final RestTemplate restTemplate = new RestTemplate();

    public String getMedicineInfo(String medicineName) {

        try {

            String url = "https://api.fda.gov/drug/label.json?search=" + medicineName + "&limit=1";

            String response =
                    restTemplate.getForObject(url, String.class);

            JSONObject jsonObject = new JSONObject(response);

            JSONArray results = jsonObject.getJSONArray("results");

            JSONObject medicine = results.getJSONObject(0);

            String purpose = "Not Available";
            String warnings = "Not Available";

            if (medicine.has("purpose")) {
                purpose = medicine.getJSONArray("purpose").getString(0);
            }

            if (medicine.has("warnings")) {
                warnings = medicine.getJSONArray("warnings").getString(0);
            }

            return """
💊 Medicine: %s

✅ Purpose:
%s

⚠️ Warnings:
%s

📌 Advice:
Always take medicine after consulting a doctor.
""".formatted(
                    medicineName,
                    purpose,
                    warnings
            );

        } catch (Exception e) {

            return "❌ No medicine information found.";

        }
    }
}