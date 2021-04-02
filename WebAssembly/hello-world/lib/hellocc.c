#include <stdio.h>
#include <emscripten/emscripten.h>

int EMSCRIPTEN_KEEPALIVE hello(int argc, char ** argv) {

printf("Hello!\n");

return 8;

}