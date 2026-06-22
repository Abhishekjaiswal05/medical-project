package com.medimind.medimindbackend.controller;

import com.medimind.medimindbackend.dto.ChatRequest;
import com.medimind.medimindbackend.dto.PrescriptionRequest;
import com.medimind.medimindbackend.service.AIService;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public String chat(@RequestBody ChatRequest request) {

        return aiService.getAIResponse(
                request.getMessage()
        );
    }
    @PostMapping("/extract-medicines")
    public String extractMedicines(
            @RequestBody PrescriptionRequest request
    ) {

        return aiService.extractMedicinesFromText(
                request.getPrescriptionText()
        );
    }

    @PostMapping("/extract-text")
    public String extractText(
            @RequestBody Map<String, String> request
    ) {

        return aiService.extractMedicinesFromText(
                request.get("text")
        );
    }
}