//package main
//
///*
//#cgo CFLAGS: -I/usr/local/ffmpeg/include
//#cgo LDFLAGS: -L/usr/local/ffmpeg/lib -lavformat
//#include "libavformat/avformat.h"
//#include "libavcodec/avcodec.h"
//#include "libavutil/avutil.h"
//#include "libavutil/opt.h"
//#include "libavdevice/avdevice.h"
//*/
//import "C"
//
//import (
// "fmt"
// "unsafe"
// "github.com/giorgisio/goav/avutil"
//)
//
//type (
//	InputFormat                C.struct_AVInputFormat
//	Context C.struct_AVFormatContext
//
//)
//
////Open an input stream and read the header.
//func AvformatOpenInput(ps **Context, fi string, fmt *InputFormat, d **avutil.Dictionary) int {
//	Cfi := C.CString(fi)
//	defer C.free(unsafe.Pointer(Cfi))
//
//	return int(C.avformat_open_input((**C.struct_AVFormatContext)(unsafe.Pointer(ps)), Cfi, (*C.struct_AVInputFormat)(fmt), (**C.struct_AVDictionary)(unsafe.Pointer(d))))
//}
//
//
//func main() {
//	//C.av_register_all()
//
//	var AVFormatContext *Context
//
//
//	fmt.Println("AVFormatContext", AVFormatContext)
//
//	fmt.Println(C.avformat_version())
//}

package main

// tutorial01.c
// Code based on a tutorial at http://dranger.com/ffmpeg/tutorial01.html

import (
	"fmt"
	//"github.com/giorgisio/goav/avcodec"
	"github.com/giorgisio/goav/avformat"
	//"github.com/giorgisio/goav/avutil"
	//"github.com/giorgisio/goav/swscale"
	//"log"
	//"os"
	//"unsafe"
)

//SaveFrame writes a single frame to disk as a PPM file
//func SaveFrame(frame *avutil.Frame, width, height, frameNumber int) {
//	// Open file
//	fileName := fmt.Sprintf("frame%d.png", frameNumber)
//	file, err := os.Create(fileName)
//	if err != nil {
//		log.Println("Error Reading")
//	}
//	defer file.Close()
//
//	// Write header
//	header := fmt.Sprintf("P6\n%d %d\n255\n", width, height)
//	file.Write([]byte(header))
//
//	// Write pixel data
//	for y := 0; y < height; y++ {
//		data0 := avutil.Data(frame)[0]
//		buf := make([]byte, width*3)
//		startPos := uintptr(unsafe.Pointer(data0)) + uintptr(y)*uintptr(avutil.Linesize(frame)[0])
//		for i := 0; i < width*3; i++ {
//			element := *(*uint8)(unsafe.Pointer(startPos + uintptr(i)))
//			buf[i] = element
//		}
//		file.Write(buf)
//	}
//}
//
//func SaveFrameAction(fi string)  {
//	// Open video file
//	pFormatContext := avformat.AvformatAllocContext()
//	if avformat.AvformatOpenInput(&pFormatContext, fi, nil, nil) != 0 {
//		fmt.Printf("Unable to open file %s\n", fi)
//		os.Exit(1)
//	}
//
//	// Retrieve stream information
//	if pFormatContext.AvformatFindStreamInfo(nil) < 0 {
//		fmt.Println("Couldn't find stream information")
//		os.Exit(1)
//	}
//
//	// Dump information about file onto standard error
//	pFormatContext.AvDumpFormat(0, fi, 0)
//
//	// Find the first video stream
//	for i := 0; i < int(pFormatContext.NbStreams()); i++ {
//		switch pFormatContext.Streams()[i].CodecParameters().AvCodecGetType() {
//		case avformat.AVMEDIA_TYPE_VIDEO:
//
//			// Get a pointer to the codec context for the video stream
//			pCodecCtxOrig := pFormatContext.Streams()[i].Codec()
//			// Find the decoder for the video stream
//			pCodec := avcodec.AvcodecFindDecoder(avcodec.CodecId(pCodecCtxOrig.GetCodecId()))
//			if pCodec == nil {
//				fmt.Println("Unsupported codec!")
//				os.Exit(1)
//			}
//			// Copy context
//			pCodecCtx := pCodec.AvcodecAllocContext3()
//			if pCodecCtx.AvcodecCopyContext((*avcodec.Context)(unsafe.Pointer(pCodecCtxOrig))) != 0 {
//				fmt.Println("Couldn't copy codec context")
//				os.Exit(1)
//			}
//
//			// Open codec
//			if pCodecCtx.AvcodecOpen2(pCodec, nil) < 0 {
//				fmt.Println("Could not open codec")
//				os.Exit(1)
//			}
//
//			// Allocate video frame
//			pFrame := avutil.AvFrameAlloc()
//
//			// Allocate an AVFrame structure
//			pFrameRGB := avutil.AvFrameAlloc()
//			if pFrameRGB == nil {
//				fmt.Println("Unable to allocate RGB Frame")
//				os.Exit(1)
//			}
//
//			// Determine required buffer size and allocate buffer
//			numBytes := uintptr(avcodec.AvpictureGetSize(avcodec.AV_PIX_FMT_RGB24, pCodecCtx.Width(),
//				pCodecCtx.Height()))
//			buffer := avutil.AvMalloc(numBytes)
//
//			// Assign appropriate parts of buffer to image planes in pFrameRGB
//			// Note that pFrameRGB is an AVFrame, but AVFrame is a superset
//			// of AVPicture
//			avp := (*avcodec.Picture)(unsafe.Pointer(pFrameRGB))
//			avp.AvpictureFill((*uint8)(buffer), avcodec.AV_PIX_FMT_RGB24, pCodecCtx.Width(), pCodecCtx.Height())
//
//			// initialize SWS context for software scaling
//			swsCtx := swscale.SwsGetcontext(
//				pCodecCtx.Width(),
//				pCodecCtx.Height(),
//				(swscale.PixelFormat)(pCodecCtx.PixFmt()),
//				pCodecCtx.Width(),
//				pCodecCtx.Height(),
//				avcodec.AV_PIX_FMT_RGB24,
//				avcodec.SWS_BILINEAR,
//				nil,
//				nil,
//				nil,
//			)
//
//			// Read frames and save first five frames to disk
//			frameNumber := 1
//			packet := avcodec.AvPacketAlloc()
//			for pFormatContext.AvReadFrame(packet) >= 0 {
//				// Is this a packet from the video stream?
//				if packet.StreamIndex() == i {
//					// Decode video frame
//					response := pCodecCtx.AvcodecSendPacket(packet)
//					if response < 0 {
//						fmt.Printf("Error while sending a packet to the decoder: %s\n", avutil.ErrorFromCode(response))
//					}
//					for response >= 0 {
//						response = pCodecCtx.AvcodecReceiveFrame((*avcodec.Frame)(unsafe.Pointer(pFrame)))
//						if response == avutil.AvErrorEAGAIN || response == avutil.AvErrorEOF {
//							break
//						} else if response < 0 {
//							fmt.Printf("Error while receiving a frame from the decoder: %s\n", avutil.ErrorFromCode(response))
//							return
//						}
//
//						if frameNumber <= 5 {
//							// Convert the image from its native format to RGB
//							swscale.SwsScale2(swsCtx, avutil.Data(pFrame),
//								avutil.Linesize(pFrame), 0, pCodecCtx.Height(),
//								avutil.Data(pFrameRGB), avutil.Linesize(pFrameRGB))
//
//							// Save the frame to disk
//							fmt.Printf("Writing frame %d\n", frameNumber)
//							SaveFrame(pFrameRGB, pCodecCtx.Width(), pCodecCtx.Height(), frameNumber)
//						} else {
//							return
//						}
//						frameNumber++
//					}
//				}
//
//				// Free the packet that was allocated by av_read_frame
//				packet.AvFreePacket()
//			}
//
//			// Free the RGB image
//			avutil.AvFree(buffer)
//			avutil.AvFrameFree(pFrameRGB)
//
//			// Free the YUV frame
//			avutil.AvFrameFree(pFrame)
//
//			// Close the codecs
//			pCodecCtx.AvcodecClose()
//			(*avcodec.Context)(unsafe.Pointer(pCodecCtxOrig)).AvcodecClose()
//
//			// Close the video file
//			pFormatContext.AvformatCloseInput()
//
//			// Stop after saving frames of first video straem
//			break
//
//		default:
//			fmt.Println("Didn't find a video stream")
//			os.Exit(1)
//		}
//	}
//}
//
func SaveFrameJs(value js.Value, params []js.Value)  {
	avformat.AvRegisterAll()
	fmt.Println("hello world", value, params)
}

// 注册全局函数
func registerCallbacks() {
	js.Global().Set("SaveFrameJs", js.FuncOf(SaveFrameJs))
}

func main() {
	//fmt.Println("Please provide a movie file")
	//if len(os.Args) < 2 {
	//	fmt.Println("Please provide a movie file")
	//	os.Exit(1)
	//}
	c := make(chan struct{}, 0)
	registerCallbacks()
	<-c
}