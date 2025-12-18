import { Form, Input, Button, Select, message } from 'antd';
import React from 'react';

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

const AddUser = ({ onSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSuccess?.({
      date: new Date().toISOString().slice(0, 10),
      userName: values.username,
      password: values.password,
      role: values.role,
    });
    message.success('新增用户成功');
    form.resetFields();
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          { required: true, message: '请输入用户名' },
          { pattern: /^[a-zA-Z0-9]+$/, message: '仅支持字母和数字' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: '请输入密码' }]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="checkpassword"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: '请确认密码' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不一致'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="role"
        label="角色"
        rules={[{ required: true, message: '请选择角色' }]}
        initialValue="0"
      >
        <Select
          options={[
            { value: '0', label: '普通用户' },
            { value: '1', label: '管理员' },
          ]}
        />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddUser;
