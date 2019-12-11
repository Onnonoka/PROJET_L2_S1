/**
 * *\file player.h
 * */
#ifndef PLAYER_H
#define PLAYER_H
/**
 * *A player.
 * */
typedef struct {
    int ac;/**< The player armor class.*/
    char *class;/**< The player class.*/
    char *cname;/**< The player character name.*/
    int cp;/**< The player money (copper pieces, 100 CP = 1 GP).*/
    int gp;/**< The player money (gold pieces).*/
    int hp;/**< The player hit points.*/
    char *name;/**< The player name.*/
    int sp;/**< The player money (silver pieces, 10 SP = 1 GP).*/
} player_t;

/**
 * *Creates a player.
 * *\return NULL on error (i.e., if the memory allocation is a failure), else a player.
 * */
player_t *player_create();

/** 
 * *Frees a player.
 * *\param player The player.
 * */
void player_free(player_t *player);

/**
 * *Handles the p command for a player.
 * *\param player The player.
 * */
void player_handle_p(player_t player);

/**
 * *Handles the pa command for a player.
 * *\param player The player.
 * *\param ac The player armor class.
 * */
void player_handle_pa(player_t player, int ac);

/**
 * *Handles the page command for a player.
 * *\param player The player.
 * *\param ac The player armor class.
 * */
void player_handle_page(player_t player, int ac);

/**
 * *Handles the pagt command for a player.
 * *\param player The player.
 * *\param ac The player armor class.
 * */
void player_handle_pagt(player_t player, int ac);

/**
 * *Handles the pale command for a player.
 * *\param player The player.
 * *\param ac The player armor class.
 * */
void player_handle_pale(player_t player, int ac);

/**
 * *Handles the palt command for a player.
 * *\param player The player.
 * *\param ac The player armor class.
 * */
void player_handle_palt(player_t player, int ac);

/**
 * *Handles the pc command for a player.
 * *\param player The player.
 * *\param class The player class.
 * */
void player_handle_pc(player_t player, const char *class);

/**
 * *Handles the pcn command for a player.
 * *\param player The player.
 * *\param cname The player character name.
 * */
void player_handle_pcn(player_t player, const char *cname);

/**
 * *Handles the ph command for a player.
 * *\param player The player.
 * *\param hp The player hit points.
 * */
void player_handle_ph(player_t player, int hp);

/**
 * *Handles the phge command for a player.
 * *\param player The player.
 * *\param hp The player hit points.
 * */
 void player_handle_phge(player_t player, int hp);

/**
 * *Handles the phgt command for a player.
 * *\param player The player.
 * *\param hp The player hit points.
 * */
void player_handle_phgt(player_t player, int hp);

/**
 * *Handles the phle command for a player.
 * *\param player The player.
 * *\param hp The player hit points.
 * */
void player_handle_phle(player_t player, int hp);

/**
 * *Handles the phlt command for a player.
 * *\param player The player.
 * *\param hp The player hit points.
 * */
void player_handle_phlt(player_t player, int hp);

/**
 * *Handles the pn command for a player.
 * *\param player The player.
 * *\param name The player name.
 * */
void player_handle_pn(player_t player, const char *name);
#endif
