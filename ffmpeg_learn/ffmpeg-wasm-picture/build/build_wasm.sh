###
 # @Description: 打包
 # @Date: 2020-10-21 11:08:22
 # @Author: chenxingyu
 # @LastEditors: chenxingyu
 # @LastEditTime: 2020-10-21 11:11:42
### 
source /Users/xingyuchen/app/emsdk/emsdk_env.sh

cd ../wasm

rm -rf capture.wasm capture.js

export TOTAL_MEMORY=33554432

export FFMPEG_PATH=/Users/xingyuchen/my_learn/ffmpeg_learn/ffmpeg-wasm-picture/ffmpeg-emcc

export CLIB_PATH=/Users/xingyuchen/my_learn/ffmpeg_learn/ffmpeg-wasm-picture/clib

echo "Running Emscripten..."
emcc ${CLIB_PATH}/capture.c ${FFMPEG_PATH}/lib/libavformat.a ${FFMPEG_PATH}/lib/libavcodec.a ${FFMPEG_PATH}/lib/libswscale.a ${FFMPEG_PATH}/lib/libavutil.a \
    -O3 \
    -I "${FFMPEG_PATH}/include" \
    -s WASM=1 \
    -s TOTAL_MEMORY=${TOTAL_MEMORY} \
    -s EXPORTED_FUNCTIONS='["_main", "_free", "_capture", "_setFile"]' \
    -s ASSERTIONS=0 \
    -s ALLOW_MEMORY_GROWTH=1 \
    -o /Users/xingyuchen/my_learn/ffmpeg_learn/ffmpeg-wasm-picture/wasm/capture.js

echo "Finished Build"