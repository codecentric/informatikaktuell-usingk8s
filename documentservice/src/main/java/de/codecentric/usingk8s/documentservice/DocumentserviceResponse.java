/*
 * (c) Copyright 2017 codecentric AG
 */
package de.codecentric.usingk8s.documentservice;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.StreamSupport;

/**
 * @author P.J. Meisch (peter-josef.meisch@codecentric.de)
 */
public class DocumentserviceResponse {
    private final List<DocumentData> documents = new ArrayList<>();
    private final String message;

    public DocumentserviceResponse(String message, @NotNull Boolean trim,
                                   @NotNull Iterable<DocumentData> documentDatas) {
        this.message = message;
        StreamSupport.stream(documentDatas.spliterator(), false)
                .peek(documentData -> trimDocumentDataContent(trim, documentData))
                .forEach(documents::add);

    }

    public DocumentserviceResponse(@NotNull String message, @NotNull Boolean trim, DocumentData... documentsArg) {
        this.message = message;
        if (documentsArg != null) {
            for (DocumentData documentData : documentsArg) {
                trimDocumentDataContent(trim, documentData);
            }
            Collections.addAll(documents, documentsArg);
        }
    }

    private void trimDocumentDataContent(@NotNull Boolean trim, DocumentData documentData) {
        final String content = documentData.getContent();
        if (trim && null != content && content.length() > 250) {
            documentData.setContent(content.substring(0, 250));
        }
    }

    public List<DocumentData> getDocuments() {
        return documents;
    }

    public String getMessage() {
        return message;
    }
}
