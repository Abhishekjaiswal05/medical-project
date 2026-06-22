package com.medimind.medimindbackend.repository;

import com.medimind.medimindbackend.model.EmergencyContact;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmergencyContactRepository
        extends MongoRepository<EmergencyContact, String> {
}