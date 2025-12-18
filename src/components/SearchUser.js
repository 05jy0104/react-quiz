import { Input, Space, Button, Modal, Typography } from 'antd';
import React from 'react';
import { useState } from 'react';
import AddUser from './AddUser';

const { Search } = Input;
const { Text } = Typography;

const SearchUser = ({ onSearch, onAdded }) => {
  const [open, setOpen] = useState(false);

  const handleSearch = (value) => {
    onSearch?.(value?.trim());
  };

  const handleAddOk = (user) => {
    onAdded?.(user);
    setOpen(false);
  };

  return (
    <Space direction="horizontal" align="center" style={{ marginBottom: 16 }}>
      <Text>用户名</Text>
      <Search
        placeholder="请输入用户名"
        allowClear
        enterButton="查询用户"
        size="large"
        onSearch={handleSearch}
        style={{ width: 320 }}
      />
      <Button type="primary" size="large" onClick={() => setOpen(true)}>
        添加用户
      </Button>
      <Modal
        title="添加用户"
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        destroyOnClose
      >
        <AddUser onSuccess={handleAddOk} />
      </Modal>
    </Space>
  );
};
export default SearchUser;
