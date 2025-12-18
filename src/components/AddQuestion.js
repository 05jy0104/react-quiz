import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

const AddQuestion = ({ onSuccess, initialValues }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    onSuccess?.({
      id: values.id,
      question: values.question,
      optiona: values.optiona,
      optionb: values.optionb,
      optionc: values.optionc,
      optiond: values.optiond,
      answer: values.answer,
    });
    message.success(values.id ? '更新题目成功' : '新增题目成功');
    form.resetFields();
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="question"
      onFinish={onFinish}
      initialValues={initialValues}
      preserve={false}
      scrollToFirstError
    >
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        name="question"
        label="题目"
        rules={[{ required: true, message: '请输入题目' }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item
        name="optiona"
        label="选项A"
        rules={[{ required: true, message: '请输入选项A' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="optionb"
        label="选项B"
        rules={[{ required: true, message: '请输入选项B' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="optionc"
        label="选项C"
        rules={[{ required: true, message: '请输入选项C' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="optiond"
        label="选项D"
        rules={[{ required: true, message: '请输入选项D' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="answer"
        label="正确答案"
        rules={[{ required: true, message: '请选择正确答案' }]}
      >
        <Select
          options={[
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
            { value: 'c', label: 'C' },
            { value: 'd', label: 'D' },
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

export default AddQuestion;
