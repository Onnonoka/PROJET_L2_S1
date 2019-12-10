CC = gcc
CFLAGS = -std=c89 -pedantic -Wall -Werror -g `pkg-config libxml-2.0 --cflags`
LDFLAGS = `pkg-config libxml-2.0 --libs-only-L`
LDLIBS = `pkg-config libxml-2.0 --libs-only-l`
RM = rm -fv
EXEC = valgrind
DEBUG = gdb --args

all: ddgm.out
	@echo
	@echo "Compilation terminee"
player.o: player.c 
	@$(CC) $(CFLAGS) -c -o $@ $< $(LDFLAGS) $(LDLIBS)
	@echo "[CC] Compilation du fichier : player.c"

ddg.o: ddg.c
	@$(CC) $(CFLAGS) -c -o $@ $< $(LDFLAGS) $(LDLIBS)
	@echo "[CC] Compilation du fichier : ddg.c"

ddgm.out: ddgm.c ddg.o player.o
	@$(CC) $(CFLAGS) -o $@ $^ $(LDFLAGS) $(LDLIBS)
	@echo "[CC] Compilation du fichier : ddgm.c"

start: ddgm.out
	@$(EXEC) ./$< ./ddg.xml

clean:
	@$(RM) *.out
	@echo "Suppression terminee"

clear:
	@$(RM) *.o *.out
	@echo "Suppression terminee"

debug: ddgm.out
	@$(DEBUG) ./ddgm.out ./ddg.xml
	