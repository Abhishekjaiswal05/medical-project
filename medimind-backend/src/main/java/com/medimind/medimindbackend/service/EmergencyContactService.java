package com.medimind.medimindbackend.service;

import com.medimind.medimindbackend.model.EmergencyContact;
import com.medimind.medimindbackend.repository.EmergencyContactRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class EmergencyContactService {



    private final EmergencyContactRepository repository;
    private final EmailService emailService;

    public EmergencyContactService(
            EmergencyContactRepository repository, EmailService emailService
    ) {
        this.repository = repository;
        this.emailService = emailService;
    }

    public EmergencyContact saveContact(
            EmergencyContact contact
    ) {
        return repository.save(contact);
    }

    public List<EmergencyContact> getAllContacts() {
        return repository.findAll();
    }

    public void deleteContact(String id) {
        repository.deleteById(id);
    }


    public void sendSOS(  Double latitude,
                          Double longitude) {
        String mapLink =
                "https://maps.google.com/?q="
                        + latitude
                        + ","
                        + longitude;

        List<EmergencyContact> contacts =
                repository.findAll();

        for (EmergencyContact contact : contacts) {

            emailService.sendEmail(

                    contact.getEmail(),

                    "🚨 URGENT SOS ALERT - IMMEDIATE ACTION REQUIRED",

                    """
  🚨🚨🚨 EMERGENCY SOS ALERT 🚨🚨🚨
  
  This is an automated emergency notification
  from MediMind AI.
  
  A registered user has activated
  the SOS Emergency Alert button.
  
  ⚠️ Immediate assistance may be required.
  
  Please take the following actions:
  
  ✅ Call the user immediately
  ✅ Contact nearby family members
  ✅ Verify the user's safety
  ✅ Arrange medical assistance if needed
  
  📍 User Location:
  Latitude : %s
  Longitude : %s
  
  🗺️ Google Maps:
  %s
  
  ⏰ Alert Time:
  %s
  
  PLEASE DO NOT IGNORE THIS ALERT.
  
  --------------------------------------------------
  
  MediMind Emergency Response System
  
  --------------------------------------------------
  """
                            .formatted(
                                    latitude,
                                    longitude,
                                    mapLink,
                                    LocalDateTime.now()
                            )

            );
        }
    }
}