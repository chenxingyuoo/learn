###
 # @Description: 打包
 # @Date: 2020-10-21 11:08:22
 # @Author: chenxingyu
 # @LastEditors: chenxingyu
 # @LastEditTime: 2020-10-22 10:08:36
### 
source /Users/xingyuchen/app/emsdk/emsdk_env.sh

cd ../wasm

rm -rf capture.wasm capture.js

export TOTAL_MEMORY=33554432

export FFMPEG_PATH=/Users/xingyuchen/my_learn/ffmpeg_learn/ffmpeg-wasm-picture/ffmpeg-emcc

export GOLIB_PATH=/Users/xingyuchen/my_learn/ffmpeg_learn/ffmpeg-wasm-picture/golib

echo "Running Emscripten..."
emcc ${GOLIB_PATH}/capture.go ${FFMPEG_PATH}/lib/libavformat.a ${FFMPEG_PATH}/lib/libavcodec.a ${FFMPEG_PATH}/lib/libswscale.a ${FFMPEG_PATH}/lib/libavutil.a \
    -O3 \
    -I "${FFMPEG_PATH}/include" \
    -s WASM=1 \
    -s TOTAL_MEMORY=${TOTAL_MEMORY} \
    -s EXPORTED_FUNCTIONS='["_main"]' \
    -s ASSERTIONS=0 \
    -s ALLOW_MEMORY_GROWTH=1 \
    -o /Users/xingyuchen/my_learn/ffmpeg_learn/ffmpeg-wasm-picture/gowasm/capture.js

echo "Finished Build"