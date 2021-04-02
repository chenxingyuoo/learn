/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>
#import "WXDefine.h"
#import "WXSDKInstance.h"

@protocol WXModuleProtocol <NSObject>

/**
 *  @abstract the module callback , result can be string or dictionary.
 */
typedef void (^WXModuleCallback)(id result);

/**
 *  @abstract export public method
 */

#define WX_EXPORT_METHOD(method) \
+ (NSString *)WX_CONCAT_WRAPPER(wx_export_method_, __LINE__) { \
    return NSStringFromSelector(method); \
}

@optional

/**
 *  @abstract Returns the execute thread for this target
 *
 *  @return  a NSThread Object
 *
 *  @discussion the implementation of this interface is optional. If you want to execute module actions in the special thread, you can create a new
 *  one.
 *
 */
- (NSThread *)targetExecuteThread;

/**
 *  @abstract the instance bind to this module. It helps you to get many useful properties related to the instance.
 */
@property (nonatomic, weak) WXSDKInstance *weexInstance;

@end
