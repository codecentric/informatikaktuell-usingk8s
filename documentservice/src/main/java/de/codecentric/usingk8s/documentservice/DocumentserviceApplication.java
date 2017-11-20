package de.codecentric.usingk8s.documentservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@SpringBootApplication
@EnableElasticsearchRepositories
public class DocumentserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(DocumentserviceApplication.class, args);
    }
}
