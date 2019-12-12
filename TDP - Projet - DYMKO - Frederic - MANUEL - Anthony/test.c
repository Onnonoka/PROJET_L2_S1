#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]) {
    char *saisie, *value, *commande, *aux;

    saisie = malloc(sizeof(char));
    printf("DDG> ");
    fgets(saisie, 18, stdin);
    value = strstr(saisie, " ");
    commande = saisie;
    value[0] = '\0';
    value = &value[1];
    aux = strstr(saisie, "\n");
    /*aux[0] = '\0'*/;
    printf("%s: %s , %s Ok\n", commande, value, aux);
    

    return 0;
}