#ifndef STD_H
    #define STD_H
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
#endif
#include <libxml/parser.h>
#include "ddg.h"

void display_h() {
    printf("d: Prints the DDG date\n");
    printf("g: Prints the DDG\n");
    printf("m: Prints the DDG dungeon master name\n");
    printf("h: Prints this help\n");
    printf("n: Prints the DDG name\n");
    printf("p: Prints the DDG players\n");
    printf("pa AC: Prints the DDG players with the armor class equal to AC\n");
    printf("page AC: Prints the DDG players with the armor class greater than or equal to AC\n");
    printf("pagt AC: Prints the DDG players with the armor class greater than AC\n");
    printf("pale AC: Prints the DDG players with the armor class less than or equal to AC\n");
    printf("palt AC: Prints the DDG players with the armor class less than AC\n");
    printf("pc CLASS: Prints the DDG players with the class containing CLASS\n");
    printf("pcn CNAME: Prints the DDG players with the character name containing CNAME\n");
    printf("ph HP: Prints the DDG players with the hit points equal to HP\n");
    printf("phge HP: Prints the DDG players with the hit points greater than or equal to HP\n");
    printf("phgt HP: Prints the DDG players with the hit points greater than HP\n");
    printf("phle HP: Prints the DDG players with the hit points less than or equal to HP\n");
    printf("phlt HP: Prints the DDG players with the hit points less than HP\n");
    printf("pn NAME: Prints the DDG players with the name containing NAME\n");
    printf("v: Prints the DDGM version\n");
    printf("q: Quits DDGM\n");
}

void display_v() {
    printf("DDGM (Dungeons and Dragons Game Manager) 1\n\n");
    printf("Copyright (C) 2019 DYMKO frederic and MANUEL Anthony.\n\n");
    printf("Written by DYMKO Frederic <dymko.frederic@univ-pau.fr> and MANUEL Anthony <manuel.anthony@univ-pau.fr.\n");
}

int main(int argc, char *argv[]) {
    xmlDocPtr xmlFile;
    xmlNodePtr xmlFileNode;
    ddg_t *ddg;
    player_t *player;
    char *commande, *value, *saisie;
    int exit, i, j, arg2;

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
    player = NULL;
    while (xmlFileNode != NULL) {
        if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"ddg") == 0) {
            ddg->name = (char*)xmlGetProp(xmlFileNode, (xmlChar*)"name");
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"day") == 0) {
            /*ddg->day = strtol((char*)xmlNodeListGetString(xmlFile, xmlFileNode, 0), NULL, 10);*/
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"month") == 0) {
            /*ddg->month = strtol((char*)xmlFileNode->content, NULL, 10);*/
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"year") == 0) {
            /*ddg->year = strtol((char*)xmlFileNode->content, NULL, 10);*/
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"dmname") == 0) {
            printf("%s\n", (char*)xmlFileNode);
            /*ddg->dmname = (char*)xmlFileNode->content;*/
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"players") == 0) {
            player = player_create();
            if (player == NULL) {
                fprintf(stderr, "I/O warning : failed to alloc memory to \"player\"\n");
                return -1;
            }
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"player") == 0) {
            player->name = (char*)xmlGetProp(xmlFileNode, (xmlChar*)"name");
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"ac") == 0) {
            /*player->ac = strtol((char*)xmlFileNode->content, NULL, 10);*/
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"class") == 0) {
            player->class = (char*)xmlFileNode->content;
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"cname") == 0) {
            player->cname = (char*)xmlFileNode->content;
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"hp") == 0) {
            /*player->hp = strtol((char*)xmlFileNode->content, NULL, 10);*/
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"cp") == 0) {
            /*player->cp = strtol((char*)xmlFileNode->content, NULL, 10);*/
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"gp") == 0) {
            /*player->gp = strtol((char*)xmlFileNode->content, NULL, 10);*/
        } else if (xmlStrcmp(xmlFileNode->name, (xmlChar*)"sp") == 0) {
            /*player->sp = strtol((char*)xmlFileNode->content, NULL, 10);*/
        }


        if (xmlFileNode->children != NULL) {
            xmlFileNode = xmlFileNode->children;
        } else if (xmlFileNode->next != NULL) {
            xmlFileNode = xmlFileNode->next;
        } else {
            if (xmlStrcmp(xmlFileNode->parent->name, (xmlChar*)"players") == 0) {
                ddg_add_player(ddg, player);
            }
            xmlFileNode = xmlFileNode->parent->next;
        }
    }
    exit = 0;
    do {
        saisie = malloc(sizeof(char));
        commande = malloc(sizeof(char));
        value = malloc(sizeof(char));
        value[0] = '\0';
        printf("DDG> ");
        fgets(saisie, 18, stdin);
        i = 0;
        j = 0;
        arg2 = 0;
        while (saisie[i] != '\0' && saisie[i] != '\n') {
            if (arg2) {
                value[j] = saisie[i];
                j++;
                value = realloc(value, sizeof(char) * j);
                value[j] = '\0';
            } else {
                if (saisie[i] == ' ') {
                    arg2 = 1;
                    j = 0;
                } else {
                    commande[j] = saisie[i];
                    j++;
                    commande = realloc(commande, sizeof(char) * j);
                    commande[j] = '\0';
                }
            }
            i++;
        }
        if (strcmp(commande, "d") == 0) {
            ddg_handle_d(*ddg);
        } else if (strcmp(commande, "g") == 0) {
            ddg_handle_g(*ddg);
        } else if (strcmp(commande, "m") == 0) {
            ddg_handle_m(*ddg);
        } else if (strcmp(commande, "h") == 0) {
            display_h();
        } else if (strcmp(commande, "n") == 0) {
            ddg_handle_n(*ddg);
        } else if (strcmp(commande, "v") == 0) {
            display_v();
        } else if (strcmp(commande, "q") == 0) {
            exit = 1;
        } else if (strcmp(commande, "pcn") == 0) {
            ddg_handle_pcn(*ddg, value);
        } else if (strcmp(commande, "pc") == 0) {
            ddg_handle_pc(*ddg, value);
        }  else if (strcmp(commande, "pn") == 0) {
            ddg_handle_pn(*ddg, value);
        }  else if (strcmp(commande, "p") == 0) {
            ddg_handle_p(*ddg);
        } else if (strcmp(commande, "phge") == 0) {
            ddg_handle_page(*ddg, strtol(value, NULL, 10));
        } else if (strcmp(commande, "phgt") == 0) {
            ddg_handle_phgt(*ddg, strtol(value, NULL, 10));
        } else if (strcmp(commande, "phle") == 0) {
            ddg_handle_phle(*ddg, strtol(value, NULL, 10));
        } else if (strcmp(commande, "phlt") == 0) {
            ddg_handle_phlt(*ddg, strtol(value, NULL, 10));
        } else if (strcmp(commande, "ph") == 0) {
            ddg_handle_ph(*ddg, strtol(value, NULL, 10));
        } else if (strcmp(commande, "page") == 0) {
            ddg_handle_page(*ddg, strtol(value, NULL, 10));
        } else if (strcmp(commande, "pagt") == 0) {
            ddg_handle_pagt(*ddg, strtol(value, NULL, 10));
        } else if (strcmp(commande, "pale") == 0) {
            ddg_handle_pale(*ddg, strtol(value, NULL, 10));
        } else if (strcmp(commande, "palt") == 0) {
            ddg_handle_palt(*ddg, strtol(value, NULL, 10));
        } else if (strcmp(commande, "pa") == 0) {
            ddg_handle_pa(*ddg, strtol(value, NULL, 10));
        } else {
            printf("%s: Invalid command\n", argv[0]);
        }
        free(commande);
        free(value);
    } while (!exit);
    free(saisie);
    ddg_free(ddg);
    xmlCleanupParser();
    xmlFreeDoc(xmlFile);
    
    return 0;
}