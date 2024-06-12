// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/users/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/users/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/users/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查找部门 GET /api/departments/search */
export async function searchDepartments(options?: { [key: string]: any }) {
  return request<API.CurrentDepartment[]>('/api/departments/search', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查找人员 GET /api/employees/search */
export async function searchEmployees(options?: { [key: string]: any }) {
  return request<API.CurrentEmployee[]>('/api/employees/search', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查找工资 GET /api/salaries/search */
export async function searchSalaries(options?: { [key: string]: any }) {
  return request<API.CurrentSalary[]>('/api/salaries/search', {
    method: 'GET',
    ...(options || {}),
  });
}


/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data:{
      method: 'update',
      ...(options || {}),
    }
  });
}

/** 新建部门 POST /api/departments/add */
export async function addDepartment(options?: { [key: string]: any }) {
  return request<API.CurrentDepartment>('/api/departments/add', {
    method: 'POST',
    data:{
      method: 'post',
      ...(options || {}),
    }
  });
}

/** 删除部门 POST /api/departments/delete */
export async function removeDepartment(options?: { [key: string]: any }) {
  return request<API.CurrentDepartment>('/api/departments/delete', {
    method: 'POST',
    data:{
      method: 'post',
      ...(options || {}),
    }
  });
}
