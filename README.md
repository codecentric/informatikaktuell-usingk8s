# Kubernetes - wie benutzt man es?

Dieses Repository enthält alle Quellen zum Artikel

"Kubernetes - wie benutzt man es" in "informatik-aktuell".

die folgenden Abschnitte beschreiben die einzelnen verwendeten Unterverzeichnisse. In den jeweiligen Unterverzeichnissen befinden sich detailliertere readme.md Dateien.

## kubernetes

enthält alle Kubernetes Konfigurationsdateien, die notwendig sind, um die Beispiele aus dem Artikel nachzuvollziehen.

## documentservice

Enthält den Quellcode der Spring Boot Anwendung zum Speichern, Suchen und Lesen von Dokumenten. Verwendet als Backend zum Speichern die Elasticsearch Instanzen. Benötigt ein JDK 8 sowie docker um die Anwendung und das Docker-Image zu bauen.

## documentui

Enthält den Quellcode für die Webanwendung mit der auf den documentservice zugegriffen wird. Benötigt Node.js, npm und docker um die Anwendung und das Docker-Image zu bauen.
