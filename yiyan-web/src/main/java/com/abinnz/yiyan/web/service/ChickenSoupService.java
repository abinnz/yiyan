package com.abinnz.yiyan.web.service;

import com.abinnz.yiyan.common.service.IService;
import com.abinnz.yiyan.web.domain.ChickenSoup;

import java.util.List;

public interface ChickenSoupService extends IService<ChickenSoup> {

    List<ChickenSoup> selectRandomList();

}
