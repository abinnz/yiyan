package com.abinnz.yiyan.common.util;

import cn.hutool.core.util.StrUtil;
import com.abinnz.yiyan.common.exception.BusinessException;
import com.abinnz.yiyan.common.exception.BusinessExceptionEnum;
import com.alibaba.fastjson.JSON;

import java.util.HashMap;
import java.util.Map;

public class ResponseUtils {

    public static final String SUCCESS = "success";
    public static final String OK = "ok";
    public static final String RESULT = "result";

    /**
     * 成功响应
     * @param obj
     * @return
     */
    public static String success(Object obj) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("code", SUCCESS);
        resultMap.put("message", OK);
        resultMap.put("data", obj);
        return JSON.toJSONString(resultMap);
    }

    /**
     * 操作成功响应
     * @return
     */
    public static String success() {
        Map<String, Object> resultMap = new HashMap<>();
        return success(resultMap);
    }

    /**
     * 登陆成功响应
     * @param sessionId
     * @return
     */
    public static String loginSuccess(String sessionId) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("sessionId", sessionId);
        return success(resultMap);
    }

    /**
     * 错误响应
     * @param ex
     * @return
     */
    public static String error(BusinessException ex) {
        return error(ex.getCode(), ex.getMessage());
    }

    /**
     * 错误响应
     * @param errorEnum
     * @return
     */
    public static String error(BusinessExceptionEnum errorEnum) {
        return error(errorEnum.getCode(), errorEnum.getMessage());
    }

    /**
     * 错误响应
     * @param errorEnum
     * @param param
     * @return
     */
    public static String error(BusinessExceptionEnum errorEnum, String ... param) {
        return error(errorEnum.getCode(), StrUtil.format(errorEnum.getMessage(), param));
    }

    /**
     * 错误响应
     * @param code
     * @param msg
     * @return
     */
    public static String error(String code, String msg) {
        Map<String, String> resultMap = new HashMap<>();
        resultMap.put("code", code);
        resultMap.put("message", msg);
        return JSON.toJSONString(resultMap);
    }


}
