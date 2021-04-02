package main

/*
#cgo CFLAGS: -I/usr/local/ffmpeg/include
#cgo LDFLAGS: -L/usr/local/ffmpeg/lib -lavformat
#include "libavformat/avformat.h"
#include "libavcodec/avcodec.h"
#include "libavutil/avutil.h"
#include "libavutil/opt.h"
#include "libavdevice/avdevice.h"
*/
import "C"
import "fmt"

func main() {

	C.av_register_all()

	var pFormatCtx *C.AVFormatContext

	pFormatCtx = C.avformat_alloc_context()

	fmt.Println("pFormatCtx")
	fmt.Println(pFormatCtx)
	fmt.Println(C.avformat_version())
	age := C.int(18)
	fmt.Println(age)
}
