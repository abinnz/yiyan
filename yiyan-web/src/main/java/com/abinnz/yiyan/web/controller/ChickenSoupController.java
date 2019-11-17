package com.abinnz.yiyan.web.controller;

import com.abinnz.yiyan.common.util.ResponseUtils;
import com.abinnz.yiyan.web.domain.ChickenSoup;
import com.abinnz.yiyan.web.service.ChickenSoupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cs")
public class ChickenSoupController {

    @Autowired
    private ChickenSoupService chickenSoupService;

    @GetMapping("/list")
    public String getNodeList() {
        List<ChickenSoup> chickenSoupList = this.chickenSoupService.selectRandomList();
        return ResponseUtils.success(chickenSoupList);
    }

}
