package com.example.wagemanagement.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.wagemanagement.model.domain.Departments;
import com.example.wagemanagement.service.DepartmentsService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 部门接口
 */
@RestController
@RequestMapping("/departments")
@Slf4j
public class DepartmensController {

    @Resource
    private DepartmentsService departmentsService;

    @GetMapping("/search")
    public List<Departments> searchDepartments(String departmentName, HttpServletRequest request) {
        QueryWrapper<Departments> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotBlank(departmentName)) {
            queryWrapper.like("departmentName", departmentName);
        }
        List<Departments> departmentList = departmentsService.list(queryWrapper);
        return departmentList;
    }

    @PostMapping("/add")
    public boolean addDepartment(@RequestBody Departments department) {
        if (department == null) {
            return false;
        }
        return departmentsService.save(department);
    }

    @PostMapping("/delete")
    public boolean deleteDepartment(@RequestBody Departments department) {
        if (department == null) {
            return false;
        }
        QueryWrapper<Departments> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("departmentName", department.getDepartmentName());
        int id = departmentsService.getOne(queryWrapper).getDepartmentId();
        return departmentsService.removeById(id);
    }

}
