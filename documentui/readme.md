# DocumentUI

Eine Webanwendung basierend auf Angular als Frontend für den DocumentService. _node_ und _npm_ muss installiert sein.

## API access

Die UI greift auf die API über /api/* zu. Dieser Zugriff muss an den API Server geroutet werden von dem Serverprozess, der die Anwendung ausliefert. 

Für den Produktivbetrieb ist das in der server.js implementiert.

Während der Entwicklung ist das in Datei _proxy.conf.json_ konfiguriert, und wird durch 

    npm start
    
verwendet; dies macht intern den Aufruf
    
    ng serve --proxy-config proxy.conf.json
    
## Dockerimage

Um das Dockerimage zu bauen mus zuerst die  Angular Anwendung gebaut werden:

    ng build

Dies erzeugt die Dateien in _docker/dist_. Das Image wird dann gebaut mit

    cd docker
    docker build -t codecentric/informatik-aktuell-usingk8s-documentui:1.0 .
     
