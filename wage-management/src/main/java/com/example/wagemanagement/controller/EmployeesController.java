package com.example.wagemanagement.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.wagemanagement.model.domain.Departments;
import com.example.wagemanagement.model.domain.Employees;
import com.example.wagemanagement.service.DepartmentsService;
import com.example.wagemanagement.service.EmployeesService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 人员接口
 */
@RestController
@RequestMapping("/employees")
@Slf4j
public class EmployeesController {

    @Resource
    private EmployeesService employeesService;

    @GetMapping("/search")
    public List<Employees> searchEmployees(String name, HttpServletRequest request) {
        QueryWrapper<Employees> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotBlank(name)) {
            queryWrapper.like("name", name);
        }
        List<Employees> employeeList = employeesService.list(queryWrapper);
        return employeeList;
    }

}
