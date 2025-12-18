import { Space, Table, Modal, message, Button } from 'antd';
import React, { useState } from 'react';
import AddQuestion from './AddQuestion';

const QuestionTable = ({ data = [], onDelete, onUpdate }) => {
  const [editModal, setEditModal] = useState({ open: false, record: null });

  const handleDelete = (record) => {
    Modal.confirm({
      title: `确认删除题目「${record.question}」吗？`,
      onOk: () => {
        onDelete?.(record.id);
        message.success('删除成功');
      },
    });
  };

  const columns = [
    { title: '序号', dataIndex: 'id', key: 'id', width: 80 },
    { title: '题目', dataIndex: 'question', key: 'question' },
    {
      title: '选项',
      dataIndex: 'options',
      key: 'options',
      render: (_, record) => {
        const options = [
          { label: 'A', value: record.optiona },
          { label: 'B', value: record.optionb },
          { label: 'C', value: record.optionc },
          { label: 'D', value: record.optiond },
        ];
        return options
          .filter((opt) => opt.value)
          .map((opt) => `${opt.label}. ${opt.value}`)
          .join('，');
      },
    },
    {
      title: '答案',
      dataIndex: 'answer',
      key: 'answer',
      width: 80,
      render: (text) => (text || '').toUpperCase(),
    },
    {
      title: '操作',
      key: 'action',
      width: 140,
      render: (_, record) => (
        <Space size="middle">
          <Button size="small" onClick={() => setEditModal({ open: true, record })}>
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
        title="编辑题目"
        open={editModal.open}
        footer={null}
        onCancel={() => setEditModal({ open: false, record: null })}
        destroyOnClose
      >
        <AddQuestion
          initialValues={editModal.record || undefined}
          onSuccess={(values) => {
            onUpdate?.(editModal.record.id, values);
            message.success('更新成功');
            setEditModal({ open: false, record: null });
          }}
        />
      </Modal>
    </>
  );
};

export default QuestionTable;
