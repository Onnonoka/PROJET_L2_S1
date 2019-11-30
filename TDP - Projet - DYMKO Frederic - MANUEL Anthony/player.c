#ifndef STD
#include <stdio.h>
#include <stdlib.h>
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

    /*
    Traitement
    */

    player->name = malloc(sizeof(char));
    printf("The player name: ");
    scanf("%s", player->name);

    player->class = malloc(sizeof(char));
    printf("The character class: ");
    scanf("%s", player->class);

    if (player == NULL) return NULL;
    printf("The character armor class: ");
    scanf("%d", player->ac);

    printf("The character cooper pieces: ");
    scanf("%d", player->cp);

    printf("The character silver pieces: ");
    scanf("%d", player->sp);

    printf("The character gold pieces: ");
    scanf("%d", player->gp);

    player->cname = malloc(sizeof(char));
    printf("The character name: ");
    scanf("%s", player->cname);

    return player;
}

void player_free(player_t *player) {
    //free all
    free(player->class);
    free(player->cname);
    free(player->name);
    free(player);
}

void player_handle_p(player_t player) {
    printf("%s (%s), ", player.name, player.cname);
    printf("%s, ", player.class);
    printf("AC: %d, HP: %d, ",player.ac, player.hp);
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
