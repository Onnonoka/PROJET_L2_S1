#ifndef STD
#include <stdio.h>
#include <stdlib.h>
#endif

#include "player.h"

player_t *player_create() {
    player_t *player;

    player = malloc(sizeof(player_t));
    if (player == NULL) return NULL;
    player->ac = 0;
    player->class = NULL;
    player->cname = NULL;
    player->cp = 0;
    player->gp = 0;
    player->name = NULL;
    player->sp = 0;
    return player;
}

void player_free(player_t *player) {
    free(player);
}

void player_handle_p(player_t player) {
    printf("%s (%s), ", player.name, player.cname);
    printf("%s, ", player.class);
    printf("AC: %d, HP%d, ",player.ac, player.hp);
    printf("GP: %f ", (player.gp + (player.sp * 0.1) + (player.cp * 0.01)));
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