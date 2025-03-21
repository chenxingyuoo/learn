//
//  main.c
//  数组
//
//  Created by xingyu chen on 23/12/2023.
//

#include <stdio.h>

int main(int argc, const char * argv[]) {
    // insert code here...
    printf("Hello, World!\n");
    
//    int array1[10];
//    float array2[5];
//    double array3[3];
//    char array4[20];
    
    int array[10] = {2,8,3,6,5,4,7,9,1,0};
    
    for (int i = 1; i<=10-1; i++) {
        int flag = 0;
        for (int j = 0; j < 10 - i; j++) {
            if (array[j] > array[j + 1]) {
                int temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                flag = 1;
            }
            
        }
        
        if (flag == 0) {
            break;
        }
    }
    
    for (int i = 0; i < 10; i++) {
        printf("i = %d\n",array[i]);

    }
    
    return 0;
}
