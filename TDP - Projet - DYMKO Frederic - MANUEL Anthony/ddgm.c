#ifndef STD_H
    #define STD_H
    #include <stdio.h>
    #include <stdlib.h>
#endif
#include <libxml/parser.h>
#include "ddg.h"

int main(int argc, char *argv[]) {
    xmlDocPtr xmlFile;
    xmlNodePtr xmlFileNode;
    if (argc != 2) {
        fprintf(stderr, "%s: Invalid number of arguments\n", argv[0]);
        return -1;
    }
    xmlFile = xmlParseFile(argv[1]);
    if (xmlFile == NULL) {
        fprintf(stderr, "I/O warning : failed to load external entity \"%s\"\n", argv[1]);
        fprintf(stderr, "%s: Unable to parse the document\n", argv[0]);
        return -1;
    }
    xmlFileNode = xmlDocGetRootElement(xmlFile);
    

    /*
    *   LES COMMANDES SUIVANTES SONT A SUPRIMER
    *   Elles sont utilisés pour la compilation
    */
    printf("%s", xmlFileNode->name);



    return 0;
}