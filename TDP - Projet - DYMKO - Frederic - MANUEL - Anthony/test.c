#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]) {
    char *saisie, *value, *commande, *aux;

    int i = 0;

    while (saisie[i] != '\n' && saisie[i] != ' ')
    {
        i++;
    }

    if(saisie[i] == ' ')
    {
        saisie[i] = '\0';
        value = &saisie[i+1];
    }
    else
    {
        
    }
        

    return 0;
}