package com.abinnz.yiyan.web.dao;

import com.abinnz.yiyan.common.config.MyMapper;
import com.abinnz.yiyan.web.domain.ChickenSoup;

import java.util.List;

public interface ChickenSoupMapper extends MyMapper<ChickenSoup> {

    List<ChickenSoup> selectRandomList();

}