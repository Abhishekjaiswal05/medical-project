package com.medimind.medimindbackend.controller;

import com.medimind.medimindbackend.dto.SOSRequest;
import com.medimind.medimindbackend.model.EmergencyContact;
import com.medimind.medimindbackend.service.EmergencyContactService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergency")
@CrossOrigin("*")
public class EmergencyContactController {

    private final EmergencyContactService service;

    public EmergencyContactController(
            EmergencyContactService service
    ) {
        this.service = service;
    }

    @PostMapping("/contact")
    public EmergencyContact addContact(
            @RequestBody EmergencyContact contact
    ) {
        return service.saveContact(contact);
    }

    @GetMapping("/contact")
    public List<EmergencyContact> getContacts() {
        return service.getAllContacts();
    }

    @DeleteMapping("/contact/{id}")
    public void deleteContact(
            @PathVariable String id
    ) {
        service.deleteContact(id);
    }
    @PostMapping("/sos")
    public String sendSOS(
            @RequestBody SOSRequest request
    ) {

        service.sendSOS(

                request.getLatitude(),

                request.getLongitude()

        );

        return "SOS Sent";
    }
}