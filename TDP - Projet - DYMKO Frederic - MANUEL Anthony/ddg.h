/**
 * *\file ddg.h
 * */
#ifndef DDG_H
#define DDG_H
#include "player.h"/*for player_t*/
/**
 * *A DDG (Dungeons and Dragons Game).
 * */
typedef struct {
    int day;/**< The DDG date (day).*/
    char *dmname;/**< The dungeon master name.*/
    int month;/**< The DDG date (month).*/
    char *name;/**< The DDG name.*/
    int nplayers;/**< The DDG number of players.*/
    player_t **players;/**< The DDG players.*/
    int year;/**< The DDG date (year).*/
} ddg_t;

/**
 * *Add a player to a DDG.
 * *\param ddg The DDG.
 * *\param player The player.
 * *\return -1 on error (i.e., if the memory allocation is a failure), else 0.
 * */
int ddg_add_player(ddg_t *ddg, player_t *player);

/**
 * *Creates a DDG.
 * *\return NULL on error (i.e., if the memory allocation is a failure), else a DDG.
 * */
ddg_t *ddg_create();

/**
 * *Frees a DDG.
 * *\param ddg The DDG.
 * */
void ddg_free(ddg_t *ddg);

/**
 * *Handles the d command for a DDG.
 * *\param ddg The DDG.
 * */
void ddg_handle_d(ddg_t ddg);

/**
 * *Handles the g command for a DDG.
 * *\param ddg The DDG.
 * */
void ddg_handle_g(ddg_t ddg);

/**
 * *Handles the m command for a DDG.
 * *\param ddg The DDG.
 * */
void ddg_handle_m(ddg_t ddg);

/**
 * *Handles the n command for a DDG.
 * *\param ddg The DDG.
 * */
void ddg_handle_n(ddg_t ddg);

/**
 * *Handles the p command for a DDG.
 * *\param ddg The DDG.
 * */
void ddg_handle_p(ddg_t ddg);

/**
 * *Handles the pa command for all the players of a DDG.
 * *\param ddg The DDG.
 * *\param ac The player armor class.
 * */
void ddg_handle_pa(ddg_t ddg, int ac);

/**
 * *Handles the page command for all the players of a DDG.
 * *\param ddg The DDG.
 * *\param ac The player armor class.
 * */
void ddg_handle_page(ddg_t ddg, int ac);

/**
 * *Handles the pagt command for all the players of a DDG.
 * *\param ddg The DDG.
 * *\param ac The player armor class.
 * */
void ddg_handle_pagt(ddg_t ddg, int ac);

/**
 * *Handles the pale command for all the players of a DDG.
 * *\param ddg The DDG.
 * *\param ac The player armor class.
 * */
void ddg_handle_pale(ddg_t ddg, int ac);

/**
 * *Handles the palt command for all the players of a DDG.
 * *\param ddg The DDG.
 * *\param ac The player armor class.
 * */
void ddg_handle_palt(ddg_t ddg,int ac);

/**
 * *Handles the pc command for all the players of a DDG.
 * *\param ddg The DDG.
 * *\param class The player class.
 * */
void ddg_handle_pc(ddg_t ddg, const char *class);

/**
 * *Handles the pcn command for all the players of a DDG.
 * *\param ddg The DDG.
 * *\param cname The player character name.
 * */
void ddg_handle_pcn(ddg_t ddg, const char *cname);

/**
 * *Handles the ph command for all the players of a DDG.
 * *\param ddg The DDG.
 * *\param hp The player hit points.
 * */
void ddg_handle_ph(ddg_t ddg, int hp);

/**
 * *Handles the phge command for all the players of a DDG.
 * *\param ddg The DDG.
 * *\param hp The player hit points.
 * */
void ddg_handle_phge(ddg_t ddg, int hp);

/**
 * *Handles the phgt command for all the players of a DDG.
 * *\param ddg The DDG.
 * *\param hp The player hit points.
 * */
void ddg_handle_phgt(ddg_t ddg, int hp);

/**
 * *Handles the phle command for all the players of a DDG.
 * *\param ddg The DDG.
 * *\param hp The player hit points.
 * */
void ddg_handle_phle(ddg_t ddg, int hp);

/**
 * *Handles the phlt command for all the players of a DDG.
 * *\param ddg The DDG.
 * *\param hp The player hit points.
 * */
void ddg_handle_phlt(ddg_t ddg, int hp);

/**
 * *Handles the pn command for all the players of a DDG.
 * *\param ddg The DDG.
 * *\param name The DDG name.
 * */
void ddg_handle_pn(ddg_t ddg, const char *name);
#endif