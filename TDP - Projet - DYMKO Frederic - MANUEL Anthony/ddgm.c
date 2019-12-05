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
    ddg_t *ddg;
    /*player_t *player;
    int reply;*/

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
    ddg = ddg_create();
    if (ddg == NULL) {
        fprintf(stderr, "I/O warning : failed to alloc memory to \"ddg\"\n");
        return -1;
    }
    /*player = NULL;
    while (xmlFileNode->next != NULL && xmlFileNode->parent != NULL) {
        if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"ddg")) {
            ddg->name = xmlGetProp(xmlFileNode, (xmlChar*)"name");
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"day")) {
            ddg->day = xmlFileNode->content;
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"month")) {
            ddg->month = xmlFileNode->content;
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"year")) {
            ddg->year = xmlFileNode->content;
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"dmname")) {
            ddg->dmname = xmlFileNode->content;
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"players")) {
            player = player_create();
            if (player == NULL) {
                fprintf(stderr, "I/O warning : failed to alloc memory to \"player\"\n");
                return -1;
            }
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"player")) {
            player->name = xmlGetProp(xmlFileNode, (xmlChar*)"name");
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"ac")) {
            player->ac = xmlFileNode->content;
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"class")) {
            player->class = xmlFileNode->content;
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"cname")) {
            player->cname = xmlFileNode->content;
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"hp")) {
            player->hp = xmlFileNode->content;
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"cp")) {
            player->cp = xmlFileNode->content;
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"gp")) {
            player->gp = xmlFileNode->content;
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"sp")) {
            player->sp = xmlFileNode->content;
        }


        if (xmlFileNode->children != NULL) {
            xmlFileNode = xmlFileNode->children;
        } else if (xmlFileNode->next != NULL) {
            xmlFileNode = xmlFileNode->next;
        } else {
            if (xmlStrcmp(xmlFileNode->parent->name, (xmlChar*)"players")) {
                reply = ddg_add_player(ddg, player);
                if (reply == -1) {
                    fprintf(stderr, "I/O warning : failed to alloc memory to \"ddg_add_player\"\n");
                    return -1;
                }
            }
            xmlFileNode = xmlFileNode->parent;
        }
    }
    printf("name : %s", ddg->name);*/
    
    
    return 0;
}