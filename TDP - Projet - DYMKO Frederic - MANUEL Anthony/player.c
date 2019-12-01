#ifndef STD
    #include <stdio.h>
    #include <stdlib.h>
    #include <stdbool.h>
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
    player->name = malloc(sizeof(char));
    if (player->name == NULL) return NULL;
    player->class = malloc(sizeof(char));
    if (player->name == NULL) return NULL;
    player->cname = malloc(sizeof(char));
    if (player->name == NULL) return NULL;

    /*
    Traitement
    */
    printf("The player name: ");
    scanf("%s", player->name);

    printf("The character class: ");
    scanf("%s", player->class);

    printf("The character armor class: ");
    scanf("%d", &player->ac);

    printf("The character hit point : ");
    scanf("%d", &player->hp);

    printf("The character cooper pieces: ");
    scanf("%d", &player->cp);

    printf("The character silver pieces: ");
    scanf("%d", &player->sp);

    printf("The character gold pieces: ");
    scanf("%d", &player->gp);

    printf("The character name: ");
    scanf("%s", player->cname);

    return player;
}

void player_free(player_t *player) {
    /*
    free all allocation in player
    */
    free(player->class);
    free(player->cname);
    free(player->name);

    /*
    free the player
    */
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

void player_handle_pc(player_t player, const char*class) {
    int i, j;
    bool verif, lenght;

    verif = false;
    lenght = false;
    i = 0;
    while (!lenght && !verif) {
        j = 0;
        while (player.class[i + j] != '\0' && class[j] != '\0' && player.class[i + j] == class[j]) {
            j++;
        }
        if (player.class[i + j] != '\0' && class[j] != '\0') {
            verif = true;
        } else if (player.class[i + j] == '\0') {
            lenght = true;
        }
        i++;
    }
    if (verif) {
        player_handle_p(player);
    }
}

void player_handle_pcn(player_t player, const char*cname) {
    int i, j;
    bool verif, lenght;

    verif = false;
    lenght = false;
    i = 0;
    while (!lenght && !verif) {
        j = 0;
        while (player.cname[i + j] != '\0' && cname[j] != '\0' && player.cname[i + j] == cname[j]) {
            j++;
        }
        if (player.cname[i + j] != '\0' && cname[j] != '\0') {
            verif = true;
        } else if (player.cname[i + j] == '\0') {
            lenght = true;
        }
        i++;
    }
    if (verif) {
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

void player_handle_pn(player_t player, const char*name) {
    int i, j;
    bool verif, lenght;

    verif = false;
    lenght = false;
    i = 0;
    while (!lenght && !verif) {
        j = 0;
        while (player.name[i + j] != '\0' && name[j] != '\0' && player.name[i + j] == name[j]) {
            j++;
        }
        if (player.name[i + j] != '\0' && name[j] != '\0') {
            verif = true;
        } else if (player.name[i + j] == '\0') {
            lenght = true;
        }
        i++;
    }
    if (verif) {
        player_handle_p(player);
    }
}