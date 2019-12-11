CC = gcc
CFLAGS = -std=c89 -pedantic -Wall -Werror -g `pkg-config libxml-2.0 --cflags`
LDFLAGS = `pkg-config libxml-2.0 --libs-only-L`
LDLIBS = `pkg-config libxml-2.0 --libs-only-l`
RM = rm -fv
EXEC = valgrind
DEBUG = gdb --args

all: ddgm.out

player.o: player.c 
	$(CC) $(CFLAGS) -c -o $@ $< $(LDFLAGS) $(LDLIBS)

ddg.o: ddg.c
	$(CC) $(CFLAGS) -c -o $@ $< $(LDFLAGS) $(LDLIBS)

ddgm.out: ddgm.c ddg.o player.o
	$(CC) $(CFLAGS) -o $@ $^ $(LDFLAGS) $(LDLIBS)

start: ddgm.out
	$(EXEC) ./$< ./ddg.xml

clean:
	$(RM) *.out

clear:
	$(RM) *.o *.out

debug: ddgm.out
	$(DEBUG) ./ddgm.out ./ddg.xml
	