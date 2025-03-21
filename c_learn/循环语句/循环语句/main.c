//
//  main.c
//  循环语句
//
//  Created by xingyu chen on 23/12/2023.
//

#include <stdio.h>

int main(int argc, const char * argv[]) {
    // insert code here...
    printf("Hello, World!\n");
    
//    int i = 0;
//    while (i < 100) {
//        i++;
//        printf("i = %d\n", i);
//    }
    
//    int sum = 0;
//    for (int i = 0; i < 100; i++) {
//        sum += i;
//    }
//    printf("sum = %d\n", sum);
    
//    int sum = 0;
//    for (int i = 0; i <= 100; i++) {
//        if (i % 3 == 0) {
//            sum += i;
//        }
//    }
//    printf("sum = %d\n", sum);
    
//    int sum = 0;
//    for (int i = 0; i <= 100; i++) {
//        if (i % 2 == 0) {
//            sum -= i;
//        } else {
//            sum += i;
//
//        }
//    }
//    printf("sum = %d\n", sum);
    
    
    
//    for (int k = 1; k <= 9; k++) {
//
//        for (int i = k-1; i < 9; i++) {
//            printf("%d ", i + 1);
//
//        }
//        printf("\n");
//
//    }
    
//    int i = 0;
//    int sum = 0;
//    do {
//        i++;
//        sum += i;
//    } while (i<100);
//
//    printf("i = %d\n", i);
//    printf("sum = %d\n", sum);
    
//    int number = 0;
//    scanf("%d", &number);
//
//    for (int i = 0; i < 100; i++) {
//        if (i%number != 0) {
//            continue;
//        }
//        printf("i = %d\n", i);
//
//    }
    
    int chiken = 0;
    int rabbit = 0;
    
    for (chiken = 0; chiken < 88; chiken++) {
        rabbit = 88 - chiken;
        if (rabbit * 4 + chiken * 2 == 244) {
            printf("rabbit = %d\n", rabbit);
            printf("chiken = %d\n", chiken);
            break;
        }
    }
    
    return 0;
}
