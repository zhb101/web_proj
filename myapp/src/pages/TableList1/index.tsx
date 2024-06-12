import {
  addDepartment,
  removeDepartment,
  rule,
  searchDepartments,
  searchEmployees,
  updateRule
} from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import {ActionType, ProColumns, ProDescriptionsItemProps, TableDropdown} from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.CurrentDepartment) => {
  const hide = message.loading('正在添加');
  try {
    await addDepartment({
      ...fields,
    });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (departmentName: string) => {
  const hide = message.loading('正在删除');
  if (!departmentName) return true;
  try {
    await removeDepartment({ name: departmentName });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};
const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.CurrentDepartment>();
  const [selectedRowsState, setSelectedRows] = useState<API.CurrentDepartment[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.CurrentDepartment>[] = [
    {
      dataIndex: 'employeeId',
      title: '员工id',
    },
    {
      title: '员工姓名',
      dataIndex: 'name',
      copyable: true,
      // tooltip: '标题过长会自动收缩',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.departmentId);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={async () => {
            const selectedNames = selectedRowsState.map(row => row.departmentName);
            await handleRemove(selectedNames);
            setSelectedRows([]);
            actionRef.current?.reloadAndRest?.();
          }}
        >
          删除
        </a>,
        // <TableDropdown
        //   key="actionGroup"
        //   onSelect={() => action?.reload()}
        //   menus={[
        //     { key: 'delete', name: '删除' },
        //   ]}
        // />,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.CurrentEmployee>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          console.log(sort, filter);
          const employeeList = await searchEmployees();
          return {
            data: employeeList,
          };
        }}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />
      {/*{selectedRowsState?.length > 0 && (*/}
      {/*  <FooterToolbar*/}
      {/*    extra={*/}
      {/*      <div>*/}
      {/*        已选择{' '}*/}
      {/*        <a*/}
      {/*          style={{*/}
      {/*            fontWeight: 600,*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          {selectedRowsState.length}*/}
      {/*        </a>{' '}*/}
      {/*        项 &nbsp;&nbsp;*/}
      {/*      </div>*/}
      {/*    }*/}
      {/*  >*/}
      {/*    <Button*/}
      {/*      onClick={async () => {*/}
      {/*        await handleRemove();*/}
      {/*        setSelectedRows([]);*/}
      {/*        actionRef.current?.reloadAndRest?.();*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      删除*/}
      {/*    </Button>*/}
      {/*    <Button type="primary">批量审批</Button>*/}
      {/*  </FooterToolbar>*/}
      {/*)}*/}
      <ModalForm
        title={'新建部门'}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.CurrentDepartment);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '部门名称为必填项',
            },
          ]}
          width="md"
          name="departmentName"
        />
        {/*<ProFormTextArea width="md" name="desc" />*/}
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.depar && (
          <ProDescriptions<API.CurrentDepartment>
            column={2}
            title={currentRow?.departmentName}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.departmentName,
            }}
            columns={columns as ProDescriptionsItemProps<API.CurrentDepartment>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default TableList;
