CC = gcc
CFLAGS = -std=c89 -pedantic -Wall -Werror -g `pkg-config libxml-2.0 --cflags`
LDFLAGS = `pkg-config libxml-2.0 --libs-only-L`
LDLIBS = `pkg-config libxml-2.0 --libs-only-l`
RM = rm -fv

all: main.out

player.o: player.c 
	$(CC) $(CFLAGS) -c -o $@ $< $(LDFLAGS) $(LDLIBS)

ddg.o: ddg.c
	$(CC) $(CFLAGS) -c -o $@ $< $(LDFLAGS) $(LDLIBS)

main.out: ddgm.c ddg.o player.o
	$(CC) $(CFLAGS) -o $@ $^ $(LDFLAGS) $(LDLIBS)

clean:
	$(RM) *.out

clear:
	$(RM) *.o *.out