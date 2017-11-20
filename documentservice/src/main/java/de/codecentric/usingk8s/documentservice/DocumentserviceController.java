/*
 * (c) Copyright 2017 codecentric AG
 */
package de.codecentric.usingk8s.documentservice;

import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.MessageFormat;
import java.util.Collection;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author P.J. Meisch (peter-josef.meisch@codecentric.de)
 */
@RestController
public class DocumentserviceController {

    private static final Logger LOGGER = LoggerFactory.getLogger(DocumentserviceController.class);

    private final DocumentDataRepository repository;
    private String hostName;

    @Value("${documentservice.data.directory}")
    private String dataDir;

    @Autowired
    public DocumentserviceController(DocumentDataRepository repository) {
        this.repository = repository;
        try {
            hostName = InetAddress.getLocalHost().getHostName();
        } catch (UnknownHostException e) {
            LOGGER.warn("cannot get hostname");
            hostName = "unknown host";
        }

    }

    @NotNull
    @PostMapping("/document")
    public ResponseEntity<DocumentserviceResponse> save(@NotNull @RequestBody DocumentData document,
                                                        @RequestParam(value = "via", required = false) String via) {
        final DocumentData savedDocument = repository.save(document);
        return new ResponseEntity<>(new DocumentserviceResponse(buildMessage(via), false, savedDocument),
                HttpStatus.OK);
    }

    @NotNull
    @GetMapping("/document/find/{id}")
    public ResponseEntity<DocumentserviceResponse> findById(@NotNull @PathVariable("id") String id,
                                                            @RequestParam(value = "via", required = false) String via) {
        return repository.findById(id)
                .map(document -> new ResponseEntity<>(new DocumentserviceResponse(buildMessage(via), false, document),
                        HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @NotNull
    @GetMapping("/document/search")
    public ResponseEntity<DocumentserviceResponse> search(@RequestParam("q") String s,
                                                          @RequestParam(value = "trim", required = false, defaultValue = "false") Boolean trim,
                                                          @RequestParam(value = "via", required = false) String via) {
        final Collection<DocumentData> documents = repository.findByTitleContainingOrContentContaining(s, s);
        return new ResponseEntity<>(new DocumentserviceResponse(buildMessage(via), trim, documents), HttpStatus.OK);
    }

    @NotNull
    @GetMapping("/documents")
    public ResponseEntity<DocumentserviceResponse> list(
            @RequestParam(value = "trim", required = false, defaultValue = "false") Boolean trim,
            @RequestParam(value = "via", required = false) String via) {
        final Iterable<DocumentData> documents = repository.findAll();
        return new ResponseEntity<>(new DocumentserviceResponse(buildMessage(via), trim, documents), HttpStatus.OK);
    }

    @NotNull
    @PostMapping("/documents/clear")
    public ResponseEntity<DocumentserviceResponse> clear(@RequestParam(value = "via", required = false) String via) {
        repository.deleteAll();
        return new ResponseEntity<>(new DocumentserviceResponse(buildMessage(via), false), HttpStatus.OK);
    }

    @NotNull
    @GetMapping("/documents/load")
    public ResponseEntity<String> load() {

        if (dataDir != null) {
            repository.deleteAll();
            LOGGER.info("trying to load data from {}", dataDir);
            try (Stream<Path> paths = Files.walk(Paths.get(dataDir))) {
                paths.filter(Files::isRegularFile)
                        .forEach(path -> {
                            try {
                                final String content =
                                        Files.readAllLines(path).stream().collect(Collectors.joining("\n"));

                                DocumentData document = new DocumentData();
                                document.setTitle(path.getFileName().toString());
                                document.setContent(content);

                                repository.save(document);
                            } catch (IOException e) {
                                LOGGER.warn(e.getClass().getCanonicalName() + ": " + e.getMessage());
                            }
                        });
            } catch (Exception e) {
                LOGGER.warn(e.getClass().getCanonicalName() + ": " + e.getMessage());
            }

        }

        String msg = MessageFormat.format("{0} Datensätze geladen.", repository.count());
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    @NotNull
    private String buildMessage(String via) {
        return MessageFormat.format("processed on {0} via {1}", hostName, via == null ? "unknown host" : via);
    }
}
