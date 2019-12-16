#ifndef STD
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
#endif

#include "player.h"

player_t *player_create() {
    /*
    Initialisation
    */
    player_t *player;

    /*
    Allocation
    */
    player = malloc(sizeof(player_t));
    if (player == NULL) return NULL;

    /*
    Traitement
    */
    player->name = NULL;
    player->class = NULL;
    player->ac = 0;
    player->hp = 0;
    player->cp = 0;
    player->sp = 0;
    player->gp = 0;
    player->cname = NULL;

    return player;
}

void player_free(player_t *player) {
    if (player != NULL) {
        /*
        libere la memoire allouer dans player
        */
        if (player->name != NULL) free(player->name);

        /*
        libere la memoire allouer de player
        */
        free(player);
    }

}

void player_handle_p(player_t player) {
    /*
    Affiche les informations de player
    */
    printf("%s (%s), ", player.name, player.cname);
    printf("%s, ", player.class);
    printf("AC: %d, HP: %d, ",player.ac, player.hp);
    printf("GP: %5.2f ", (player.gp + (player.sp * 0.1) + (player.cp * 0.01)));
    printf("(GP: %d, SP: %d, CP: %d)\n", player.gp, player.sp, player.cp);
}

void player_handle_pa(player_t player, int ac) {
    if (player.ac == ac) {
        player_handle_p(player);
    }
}

void player_handle_page(player_t player, int ac) {
    if (player.ac >= ac) {
        player_handle_p(player);
    }
}

void player_handle_pagt(player_t player, int ac) {
    if (player.ac > ac) {
        player_handle_p(player);
    }
}

void player_handle_pale(player_t player, int ac) {
    if (player.ac <= ac) {
        player_handle_p(player);
    }
}
void player_handle_palt(player_t player, int ac) {

    if (player.ac < ac) {
        player_handle_p(player);
    }
}

void player_handle_pc(player_t player, const char *class) {
    if (strstr(player.class, class) != NULL) {
        player_handle_p(player);
    }
}

void player_handle_pcn(player_t player, const char *cname) {
    if (strstr(player.cname, cname) != NULL) {
        player_handle_p(player);
    }
}

void player_handle_ph(player_t player, int hp) {
    if (player.hp == hp) {
        player_handle_p(player);
    }
}

void player_handle_phge(player_t player, int hp) {
    if (player.hp >= hp) {
        player_handle_p(player);
    }
}

void player_handle_phgt(player_t player, int hp) {
    if (player.hp > hp) {
        player_handle_p(player);
    }
}

void player_handle_phle(player_t player, int hp) {
    if (player.hp <= hp) {
        player_handle_p(player);
    }
}

void player_handle_phlt(player_t player, int hp) {
    if (player.hp < hp) {
        player_handle_p(player);
    }
}

void player_handle_pn(player_t player, const char *name) {
    if (strstr(player.name, name) != NULL) {
        player_handle_p(player);
    }
}
