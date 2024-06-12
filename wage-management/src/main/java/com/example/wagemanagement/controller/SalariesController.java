package com.example.wagemanagement.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.wagemanagement.model.domain.Employees;
import com.example.wagemanagement.model.domain.Salaries;
import com.example.wagemanagement.service.EmployeesService;
import com.example.wagemanagement.service.SalariesService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 工资接口
 */
@RestController
@RequestMapping("/salaries")
@Slf4j
public class SalariesController {

    @Resource
    private SalariesService salariesService;

    @GetMapping("/search")
    public List<Salaries> searchEmployees(String name, HttpServletRequest request) {
        QueryWrapper<Salaries> queryWrapper = new QueryWrapper<>();
        List<Salaries> salaryList = salariesService.list(queryWrapper);
        return salaryList;
    }

}
