import { Input, Space, Button, Modal, Typography } from 'antd';
import React, { useState } from 'react';
import AddQuestion from './AddQuestion';

const { Search } = Input;
const { Text } = Typography;

const SearchQuestion = ({ onSearch, onAdded }) => {
  const [open, setOpen] = useState(false);

  const handleSearch = (value) => {
    onSearch?.(value?.trim());
  };

  const handleAddOk = (question) => {
    onAdded?.(question);
    setOpen(false);
  };

  return (
    <Space direction="horizontal" align="center" style={{ marginBottom: 16 }}>
      <Text>题目</Text>
      <Search
        placeholder="请输入关键字"
        allowClear
        enterButton="查询题目"
        size="large"
        onSearch={handleSearch}
        style={{ width: 380 }}
      />
      <Button type="primary" size="large" onClick={() => setOpen(true)}>
        添加题目
      </Button>
      <Modal
        title="添加题目"
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        destroyOnClose
      >
        <AddQuestion onSuccess={handleAddOk} />
      </Modal>
    </Space>
  );
};

export default SearchQuestion;
