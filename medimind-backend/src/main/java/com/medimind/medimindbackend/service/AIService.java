package com.medimind.medimindbackend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import java.util.*;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final MedicineInfoService medicineInfoService;

    public AIService(MedicineInfoService medicineInfoService) {
        this.medicineInfoService = medicineInfoService;
    }

    @Value("${groq.api.key}")
    private String groqApiKey;

    public String getAIResponse(String userMessage) {

        try {

            RestTemplate restTemplate = new RestTemplate();

            String url =
                    "https://api.groq.com/openai/v1/chat/completions";

            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(MediaType.APPLICATION_JSON);

            headers.setBearerAuth(groqApiKey);

            Map<String, Object> body = new HashMap<>();

            body.put(
                    "model",
                    "llama-3.3-70b-versatile"
            );

            List<Map<String, String>> messages =
                    new ArrayList<>();

            messages.add(
                    Map.of(
                            "role", "user",
                            "content", userMessage
                    )
            );

            body.put("messages", messages);

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(body, headers);

            ResponseEntity<Map> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            request,
                            Map.class
                    );

            List choices =
                    (List) response.getBody()
                            .get("choices");

            Map choice =
                    (Map) choices.get(0);

            Map message =
                    (Map) choice.get("message");

            return message.get("content").toString();

        } catch (Exception e) {

            e.printStackTrace();

            return "AI Service Error";
        }
    }
    public String extractMedicinesFromText(String text) {

        String prompt =
                """
                Extract only medicine names
                from this prescription.
    
                Return only medicine names.
    
                Prescription:
                """
                        + text;

        return getAIResponse(prompt);
    }
}