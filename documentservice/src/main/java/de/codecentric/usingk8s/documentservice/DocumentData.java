/*
 * (c) Copyright 2017 codecentric AG
 */
package de.codecentric.usingk8s.documentservice;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.Objects;

/**
 * The data store in the repository. It is named "..Data", because "Document" is used by the annotation.
 *
 * @author P.J. Meisch (peter-josef.meisch@codecentric.de)
 */
@Document(indexName = "documents")
public class DocumentData {
    /** the id. */
    @Id
    private String id;

    /** the doc's title */
    private String title;

    /** the doc's content */
    private String content;

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DocumentData that = (DocumentData) o;
        return Objects.equals(id, that.id);
    }

    public String getId() {

        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
