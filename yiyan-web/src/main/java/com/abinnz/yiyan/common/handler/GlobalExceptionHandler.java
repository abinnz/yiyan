package com.abinnz.yiyan.common.handler;

import com.abinnz.yiyan.common.exception.BusinessException;
import com.abinnz.yiyan.common.util.ResponseUtils;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
@Order(value = Ordered.HIGHEST_PRECEDENCE)
public class GlobalExceptionHandler {

	@ExceptionHandler(BusinessException.class)
	@ResponseBody
	public String handleBusinessException(BusinessException ex) {
		return ResponseUtils.error(ex);
	}

}
