//
//  main.c
//  分支语句
//
//  Created by xingyu chen on 22/12/2023.
//

#include <stdio.h>
#include <string.h>

int main(int argc, const char * argv[]) {
    // insert code here...
    printf("Hello, World!\n");
    
//    int n = 34;
//
//    if (n == 1) {
//        printf("n = 1\n");
//    } else if (n == 2){
//        printf("n == 2\n");
//    } else {
//        printf("n != 1\n");
//    }
    
//    char pws1[20];
//    char pws2[20];
//
//    scanf("%s", &pws1);
//    scanf("%s", &pws2);
//
//    if (strcmp(pws1, pws2) == 0) {
//        printf("pws1 == pws1\n");
//
//    } else {
//        printf("pws1 != pws1\n");
//    }
    
//    int n = 10;
//    switch (n) {
//        case 10:
//            printf("A\n");
//            break;
//        case 9:
//            printf("B\n");
//            break;
//        default:
//            break;
//    }
    
//    char str = '0';
//
//    scanf("%s", &str);
//
//
//    if ((str >= 'a' && str <= 'z') || (str >= 'A' && str <= 'Z')) {
//        printf("yes\n");
//
//    } else {
//        printf("no\n");
//
//    }
    
//    char first = '0';
//    char second = '0';
//
//    scanf("%s", &first);
//
//    switch (first) {
//        case 'M':
//        case 'm':
//            printf("Monday\n");
//
//            break;
//        case 'T':
//        case 't':
//            printf("请输入第二个字符\n");
//            scanf("%s", &second);
//
//            if (second == 'u' || second == 'U') {
//                printf("Tuesday1\n");
//
//            } else if (second == 'h' || second == 'H') {
//                printf("Tuesday2\n");
//
//            } else {
//                printf("Tuesday3\n");
//
//            }
//
//
//            break;
//        default:
//            break;
//    }
//
    
    
    int month = 6;
    int day = 25;

    if (month < 1 || month > 12 ) {
        printf("month不合法\n");
    }
    
    if (day < 1 || day > 31 ) {
        printf("day不合法\n");
    }
    
    if (month == 2 && day > 28 ) {
        printf("day不合法\n");
    }
    
    if (month == 2 ) {
        
    }
    
    if (month == 3 && day >= 21) {
        
    }
    

    return 0;
}
