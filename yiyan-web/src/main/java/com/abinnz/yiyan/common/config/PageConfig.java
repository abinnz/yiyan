package com.abinnz.yiyan.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PageConfig {

    @Value("${page.page-size}")
    private int pageSize;

    public int getPageSize() {
        return pageSize;
    }

}
