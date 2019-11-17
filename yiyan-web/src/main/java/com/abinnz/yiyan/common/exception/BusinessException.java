package com.abinnz.yiyan.common.exception;

import cn.hutool.core.util.StrUtil;

public class BusinessException extends RuntimeException {
    private String code;
    private String message;

    public BusinessException(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public BusinessException(BusinessExceptionEnum businessExceptionEnum) {
        this.code = businessExceptionEnum.getCode();
        this.message = businessExceptionEnum.getMessage();
    }

    public BusinessException(BusinessExceptionEnum businessExceptionEnum, String... param) {
        this.code = businessExceptionEnum.getCode();
        this.message = StrUtil.format(businessExceptionEnum.getMessage(), param);
    }

    public String getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }

}
