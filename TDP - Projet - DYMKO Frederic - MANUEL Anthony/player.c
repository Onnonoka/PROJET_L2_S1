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
    if (player == NULL) return NULL;
    player->name = malloc(sizeof(char));
    if (player->name == NULL) {
        player_free(player);
        return NULL;
    }
    player->class = malloc(sizeof(char));
    if (player->name == NULL) {
        player_free(player);
        return NULL;
    }
    player->cname = malloc(sizeof(char));
    if (player->name == NULL) {
        player_free(player);
        return NULL;
    }

    /*
    Traitement
    */
    player->name = '\0';
    player->class = '\0';
    player->ac = 0;
    player->hp = 0;
    player->cp = 0;
    player->sp = 0;
    player->gp = 0;
    player->cname = '\0';

    return player;
}

void player_free(player_t *player) {
    if (player != NULL) {
        /*
        libere la memoire allouer dans player
        */
        if (player->class != NULL) free(player->class);
        if (player->cname != NULL) free(player->cname);
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

void player_handle_pc(player_t player, const char *class) {
    int i, j;
    int verif, lenght;

    verif = 0;
    lenght = 0;
    i = 0;
    /*
    Tant qu'on a pas atteint la fin de player.class 1 fois 
    ou qu'on a trouvé class dans player.class
    */
    while (!lenght && !verif) {
        j = 0;
        /*
        Tant qu'on a pas atteint la fin de player.class 
        ou qu'on a pas atteint la fin de class 
        ou qu'il n'y a pas concordance
        */
        while (player.class[i + j] != '\0' && class[j] != '\0' && player.class[i + j] == class[j]) {
            j++;
        }
        if (player.class[i + j] == '\0') {
            lenght = 1;
        }
        if (class[j] != '\0') {
            verif = 0;
        } else {
            verif = 1;
        }
        i++;
    }
    if (verif) {
        player_handle_p(player);
    }
}

void player_handle_pcn(player_t player, const char *cname) {
    int i, j;
    int verif, lenght;

    verif = 0;
    lenght = 0;
    i = 0;
    /*
    Tant qu'on a pas atteint la fin de player.class 1 fois 
    ou qu'on a trouvé class dans player.class
    */
    while (!lenght && !verif) {
        j = 0;
        /*
        Tant qu'on a pas atteint la fin de player.class 
        ou qu'on a pas atteint la fin de class 
        ou qu'il n'y a pas concordance
        */
        while (player.cname[i + j] != '\0' && cname[j] != '\0' && player.cname[i + j] == cname[j]) {
            j++;
        }
        if (player.cname[i + j] == '\0') {
            lenght = 1;
        }
        if (cname[j] != '\0') {
            verif = 0;
        } else {
            verif = 1;
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

void player_handle_pn(player_t player, const char *name) {
    int i, j;
    int verif, lenght;

    verif = 0;
    lenght = 0;
    i = 0;
    /*
    Tant qu'on a pas atteint la fin de player.class 1 fois 
    ou qu'on a trouvé class dans player.class
    */
    while (!lenght && !verif) {
        j = 0;
        /*
        Tant qu'on a pas atteint la fin de player.class 
        ou qu'on a pas atteint la fin de class 
        ou qu'il n'y a pas concordance
        */
        while (player.name[i + j] != '\0' && name[j] != '\0' && player.name[i + j] == name[j]) {
            j++;
        }
        if (player.name[i + j] == '\0') {
            lenght = 1;
        }
        if (name[j] != '\0') {
            verif = 0;
        } else {
            verif = 1;
        }
        i++;
    }
    if (verif) {
        player_handle_p(player);
    }
}
