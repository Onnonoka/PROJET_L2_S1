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
    ddg_t ddg;
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
    if (xmlFileNode == NULL) {
        fprintf(stderr, "Le fichier %s est vide.", argv[1]);
        fprintf(stderr, "%s: Unable to parse the document", argv[0]);
        return -1;
    }
    while (xmlFileNode->next != NULL && xmlFileNode->parent != NULL) {
        if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"ddg")) {
            ddg.name = xmlGetProp(xmlFileNode, (xmlChar*)"name");
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"day")) {
            ddg.day = xmlFileNode->content;
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"month")) {
            ddg.month = xmlFileNode->content;
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"year")) {
            ddg.year = xmlFileNode->content;
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"dmname")) {
            ddg.dmname = xmlFileNode->content;
        } /*else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"player")) {
            ddg_add_player()
        }*/
    }
    
    
    return 0;
}