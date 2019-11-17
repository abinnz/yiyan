package com.abinnz.yiyan.web.service.impl;

import com.abinnz.yiyan.common.config.PageConfig;
import com.abinnz.yiyan.common.service.impl.BaseService;
import com.abinnz.yiyan.web.dao.ChickenSoupMapper;
import com.abinnz.yiyan.web.domain.ChickenSoup;
import com.abinnz.yiyan.web.service.ChickenSoupService;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("chickenSoupService")
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true, rollbackFor = Exception.class)
public class ChickenSoupServiceImpl extends BaseService<ChickenSoup> implements ChickenSoupService {

    @Autowired
    private ChickenSoupMapper chickenSoupMapper;

    @Autowired
    private PageConfig pageConfig;

    @Override
    public List<ChickenSoup> selectRandomList() {
        PageHelper.startPage(1, this.pageConfig.getPageSize(), false);
        return this.chickenSoupMapper.selectRandomList();
    }
}
