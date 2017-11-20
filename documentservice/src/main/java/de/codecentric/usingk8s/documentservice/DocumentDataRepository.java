/*
 * (c) Copyright 2017 codecentric AG
 */
package de.codecentric.usingk8s.documentservice;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.elasticsearch.repository.ElasticsearchCrudRepository;

import java.util.Collection;

/**
 * @author P.J. Meisch (peter-josef.meisch@codecentric.de)
 */
public interface DocumentDataRepository extends ElasticsearchCrudRepository<DocumentData, String> {
    @NotNull
    Collection<DocumentData> findByTitleContainingOrContentContaining(String title, String content);
}
