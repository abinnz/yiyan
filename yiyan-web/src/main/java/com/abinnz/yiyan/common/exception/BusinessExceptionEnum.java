package com.abinnz.yiyan.common.exception;

public enum  BusinessExceptionEnum {

    EmptyParam("E1000", "参数为空"),
    InvalidParam("E1001", "参数无效"),
    NotFoundDetail("E1002", "无法找到指定ID信息：{}");

    private String code;
    private String message;

    private BusinessExceptionEnum(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
