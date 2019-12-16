#ifndef STD_H
    #define STD_H
    #include <stdio.h>
    #include <stdlib.h>
#endif
#include "ddg.h"

int ddg_add_player(ddg_t *ddg, player_t *player) {
    if (ddg->nplayers == 0) {
        ddg->players = malloc(sizeof(player_t *));
    } else {
        ddg->players = realloc(ddg->players, sizeof(player_t *) * (ddg->nplayers + 1));
    }
    if (ddg->players == NULL) return -1;
    ddg->players[ddg->nplayers] = player;
    ddg->nplayers++;
    return 0;
}

ddg_t *ddg_create() {
    /*
    Initialisation
    */
    ddg_t *ddg;

    /*
    Allocations
    */
    ddg = malloc(sizeof(ddg_t));
    if (ddg == NULL) return NULL;
    /*
    Traitement
    */
   ddg->day = 0;
   ddg->month = 0;
   ddg->year = 0;
   ddg->nplayers = 0;
   ddg->dmname = NULL;
   ddg->name = NULL;
   ddg->players = NULL;

   return ddg;
}

void ddg_free(ddg_t *ddg) {
    int i;
    if (ddg != NULL) {
        /*
        libere la memoir allouer dans ddg
        */
        if (ddg->name != NULL) free(ddg->name);
        if (ddg->players != NULL) {
            i = ddg->nplayers - 1;
            /*
            libere la memoire allouer pour chaque player
            */ 
            while (i >= 0) {
                player_free(ddg->players[i]);
                i--;
            }
            free(ddg->players);
        }
        /*
        libere la memoire allouer de ddg
        */
        free(ddg);
    }
}

void ddg_handle_d(ddg_t ddg) {
    printf("%d-%d-%d\n", ddg.year, ddg.month, ddg.day);
}

void ddg_handle_g(ddg_t ddg) {
    printf("%s, %s, %d-%d-%d, %d player(s)\n", ddg.name, ddg.dmname, ddg.year, ddg.month, ddg.day, ddg.nplayers);
}

void ddg_handle_m(ddg_t ddg) {
    printf("%s\n", ddg.dmname);
    
}

void ddg_handle_n(ddg_t ddg) {
    if (ddg.name != NULL) {
        printf("%s\n", ddg.name);
    } else {
        printf("(null)");
    }
}

void ddg_handle_p(ddg_t ddg) {
    int i;
    i = ddg.nplayers - 1;
    while (i >= 0) {
        player_handle_p(*(ddg.players[i]));
        i--;
    }
}

void ddg_handle_pa(ddg_t ddg, int ac) {
    int i;
    i = ddg.nplayers - 1;
    while (i >= 0) {
        player_handle_pa(*(ddg.players[i]), ac);
        i--;
    }
}

void ddg_handle_page(ddg_t ddg, int ac) {
    int i;
    i = ddg.nplayers - 1;
    while (i >= 0) {
        player_handle_page(*(ddg.players[i]), ac);
        i--;
    }
}

void ddg_handle_pagt(ddg_t ddg, int ac) {
    int i;
    i = ddg.nplayers - 1;
    while (i >= 0) {
        player_handle_pagt(*(ddg.players[i]), ac);
        i--;
    }
}

void ddg_handle_pale(ddg_t ddg, int ac) {
    int i;
    i = ddg.nplayers - 1;
    while (i >= 0) {
        player_handle_pale(*(ddg.players[i]), ac);
        i--;
    }
}

void ddg_handle_palt(ddg_t ddg, int ac) {
    int i;
    i = ddg.nplayers - 1;
    while (i >= 0) {
        player_handle_palt(*(ddg.players[i]), ac);
        i--;
    }
}

void ddg_handle_pc(ddg_t ddg, const char *class) {
    int i;
    i = ddg.nplayers - 1;
    while (i >= 0) {
        player_handle_pc(*(ddg.players[i]), class);
        i--;
    }
}

void ddg_handle_pcn(ddg_t ddg, const char *cname) {
    int i;
    i = ddg.nplayers - 1;
    while (i >= 0) {
        player_handle_pcn(*(ddg.players[i]), cname);
        i--;
    }
}

void ddg_handle_ph(ddg_t ddg, int hp) {
    int i;
    i = ddg.nplayers - 1;
    while (i >= 0) {
        player_handle_ph(*(ddg.players[i]), hp);
        i--;
    }
}

void ddg_handle_phge(ddg_t ddg, int hp) {
    int i;
    i = ddg.nplayers - 1;
    while (i >= 0) {
        player_handle_phge(*(ddg.players[i]), hp);
        i--;
    }
}

void ddg_handle_phgt(ddg_t ddg, int hp) {
    int i;
    i = ddg.nplayers - 1;
    while (i >= 0) {
        player_handle_phgt(*(ddg.players[i]), hp);
        i--;
    }
}

void ddg_handle_phle(ddg_t ddg, int hp) {
    int i;
    i = ddg.nplayers - 1;
    while (i >= 0) {
        player_handle_phle(*(ddg.players[i]), hp);
        i--;
    }
}

void ddg_handle_phlt(ddg_t ddg, int hp) {
    int i;
    i = ddg.nplayers - 1;
    while (i >= 0) {
        player_handle_phlt(*(ddg.players[i]), hp);
        i--;
    }
}

void ddg_handle_pn(ddg_t ddg, const char *name) {
    int i;
    i = ddg.nplayers - 1;
    while (i >= 0) {
        player_handle_pn(*(ddg.players[i]), name);
        i--;
    }
}
