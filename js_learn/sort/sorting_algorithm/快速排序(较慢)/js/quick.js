/**
 * Created by mac on 16/5/28.
 */
function quickSortAnimate(array, srotanimte){
    if(array.length == 0){
        return array;
    }
    var i = 0;
    var j = array.length - 1;

    Sort(i, j);

    function Sort(i, j){

        // 结束条件
        if(i == j ){
            return;
        };

        //数组第一个开始 ， 到数组结束
        srotanimte.activeFragment(i, j)

        var key = array[i];
        var stepi = i; // 记录开始位置
        var stepj = j; // 记录结束位置

        //数组最后一位大于 i 的情况
        while(j > i){
            srotanimte.activeOne(j);

            // j <<-------------- 向前查找
            if(array[j] >= key){
                srotanimte.blurOne(j);
                j--;
            }else{
                srotanimte.exchange(i, j);
                array[i] = array[j]
                //i++ ------------>>向后查找
                while(j > ++i){
                    srotanimte.activeOne(i);
                    if(array[i] > key){
                        srotanimte.exchange(i, j);
                        srotanimte.blurOne(i);
                        array[j] = array[i];
                        break;
                    }
                    srotanimte.blurOne(i);
                }
            }
            srotanimte.blurOne(j);
        }

        //srotanimte.blurFragment()

        // 如果第一个取出的 key 是最小的数


        if(stepi == i){
            Sort(++i, stepj);
            return ;
        }

        // 最后一个空位留给 key
        array[i] = key;


        // 递归
        Sort(stepi, i);
        Sort(j, stepj);
    }



    return array;
}