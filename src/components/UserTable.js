import { Space, Table, Modal, Form, Input, message, Button } from 'antd';
import React, { useState } from 'react';

const UserTable = ({ data = [], onDelete, onUpdate }) => {
  const [editModal, setEditModal] = useState({ open: false, record: null });
  const [form] = Form.useForm();

  const handleDelete = (record) => {
    Modal.confirm({
      title: `确认删除用户 ${record.userName} 吗？`,
      onOk: () => {
        onDelete?.(record.id);
        message.success('删除成功');
      },
    });
  };

  const openEdit = (record) => {
    setEditModal({ open: true, record });
    form.setFieldsValue({
      userName: record.userName,
      password: record.password,
    });
  };

  const handleEditOk = async () => {
    const values = await form.validateFields();
    onUpdate?.(editModal.record.id, values);
    message.success('更新成功');
    setEditModal({ open: false, record: null });
  };

  const columns = [
    { title: '日期', dataIndex: 'date', key: 'date', width: 140 },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      render: (text) => <a>{text}</a>,
    },
    { title: '密码', dataIndex: 'password', key: 'password' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button size="small" onClick={() => openEdit(record)}>
            编辑
          </Button>
          <Button danger size="small" onClick={() => handleDelete(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data.map((d) => ({ key: d.id, ...d }))}
        pagination={{ pageSize: 5, showSizeChanger: false }}
        rowKey="id"
      />
      <Modal
        title="编辑用户"
        open={editModal.open}
        onOk={handleEditOk}
        onCancel={() => setEditModal({ open: false, record: null })}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="userName"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserTable;
