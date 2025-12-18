import { Layout, Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import React, { useMemo, useState } from 'react';
import SearchUser from './components/SearchUser';
import UserTable from './components/UserTable';
import SearchQuestion from './components/SearchQuestion';
import QuestionTable from './components/QuestionTable';

const { Header, Footer, Sider, Content } = Layout;

const Admin = () => {
  const [selectedKey, setSelectedKey] = useState('1');

  // 静态数据：用户与题目，便于演示分页/增删改
  const [users, setUsers] = useState([
    { id: 1, date: '2016-05-02', userName: '王小虎', password: '123456' },
    { id: 2, date: '2016-05-04', userName: '李小明', password: '123456' },
    { id: 3, date: '2016-05-01', userName: '张三', password: '123456' },
    { id: 4, date: '2016-05-03', userName: '李四', password: '123456' },
    { id: 5, date: '2016-05-05', userName: '测试用户1', password: '123456' },
    { id: 6, date: '2016-05-06', userName: '测试用户2', password: '123456' },
    { id: 7, date: '2016-05-07', userName: '测试用户3', password: '123456' },
    { id: 8, date: '2016-05-08', userName: '测试用户4', password: '123456' },
    { id: 9, date: '2016-05-09', userName: '测试用户5', password: '123456' },
    { id: 10, date: '2016-05-10', userName: '测试用户6', password: '123456' },
    { id: 11, date: '2016-05-11', userName: '测试用户7', password: '123456' },
    { id: 12, date: '2016-05-12', userName: '测试用户8', password: '123456' },
  ]);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '法国的首都是哪座城市？',
      optiona: '巴黎',
      optionb: '伦敦',
      optionc: '柏林',
      optiond: '马德里',
      answer: 'A',
    },
    {
      id: 2,
      question: 'React的生命周期有哪些阶段？',
      optiona: 'componentDidMount',
      optionb: 'componentDidUpdate',
      optionc: 'componentWillUnmount',
      optiond: 'componentWillUnmount',
      answer: 'A',
    },
    {
      id: 3,
      question: '下列哪一个不是编程语言？',
      optiona: 'Java',
      optionb: 'Apple',
      optionc: 'Python',
      optiond: 'JavaScript',
      answer: 'B',
    },
    {
      id: 4,
      question: '首个被设计为面向对象的语言是？',
      optiona: 'Smalltalk',
      optionb: 'C',
      optionc: 'Go',
      optiond: 'Java',
      answer: 'A',
    },
    {
      id: 5,
      question: '下列哪一项是关系型数据库？',
      optiona: 'MySQL',
      optionb: 'MongoDB',
      optionc: 'Redis',
      optiond: 'Elasticsearch',
      answer: 'A',
    },
    {
      id: 6,
      question: 'HTML 中用于定义段落的标签是？',
      optiona: '<p>',
      optionb: '<div>',
      optionc: '<span>',
      optiond: '<h1>',
      answer: 'A',
    },
    {
      id: 7,
      question: 'CSS 用来设置字体大小的属性是？',
      optiona: 'font-size',
      optionb: 'font-weight',
      optionc: 'font-style',
      optiond: 'text-size',
      answer: 'A',
    },
    {
      id: 8,
      question: 'JavaScript 中用于声明常量的关键字是？',
      optiona: 'const',
      optionb: 'let',
      optionc: 'var',
      optiond: 'static',
      answer: 'A',
    },
    {
      id: 9,
      question: '前端构建工具中，以下哪项是基于 Node.js 的？',
      optiona: 'Webpack',
      optionb: 'Gulp',
      optionc: 'Rollup',
      optiond: '以上都是',
      answer: 'D',
    },
    {
      id: 10,
      question: '以下哪种不是 HTTP 请求方法？',
      optiona: 'GET',
      optionb: 'POST',
      optionc: 'PULL',
      optiond: 'PUT',
      answer: 'C',
    },
    {
      id: 11,
      question: '下列哪个框架主要用于构建用户界面？',
      optiona: 'React',
      optionb: 'Spring',
      optionc: 'Django',
      optiond: 'Flask',
      answer: 'A',
    },
    {
      id: 12,
      question: 'CSS 中用于设置背景颜色的属性是？',
      optiona: 'background-color',
      optionb: 'color',
      optionc: 'bg-color',
      optiond: 'bg',
      answer: 'A',
    },
  ]);

  const [userKeyword, setUserKeyword] = useState('');
  const [questionKeyword, setQuestionKeyword] = useState('');

  const filteredUsers = useMemo(() => {
    const kw = userKeyword.trim().toLowerCase();
    if (!kw) return users;
    return users.filter(
      (u) =>
        u.userName.toLowerCase().includes(kw) ||
        (u.date && u.date.toLowerCase().includes(kw))
    );
  }, [users, userKeyword]);

  const filteredQuestions = useMemo(() => {
    const kw = questionKeyword.trim().toLowerCase();
    if (!kw) return questions;
    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(kw) ||
        [q.optiona, q.optionb, q.optionc, q.optiond]
          .filter(Boolean)
          .some((opt) => opt.toLowerCase().includes(kw))
    );
  }, [questions, questionKeyword]);

  const addUser = (payload) => {
    const nextId = Math.max(0, ...users.map((u) => u.id)) + 1;
    setUsers([...users, { id: nextId, ...payload }]);
  };

  const updateUser = (id, payload) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...payload } : u)));
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const addQuestion = (payload) => {
    const nextId = Math.max(0, ...questions.map((q) => q.id)) + 1;
    setQuestions([...questions, { id: nextId, ...payload }]);
  };

  const updateQuestion = (id, payload) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...payload } : q)));
  };

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <Layout>
      <Header>
        <h1 style={{ color: '#ffffff' }}>Quiz后台管理</h1>
      </Header>
      <Layout>
        <Sider>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={({ key }) => setSelectedKey(key)}
            items={[
              { key: '1', icon: <UserOutlined />, label: '用户管理' },
              { key: '2', icon: <VideoCameraOutlined />, label: '题目管理' },
            ]}
          />
        </Sider>
        <Content style={{ padding: 16 }}>
          {selectedKey === '1' && (
            <>
              <SearchUser
                onSearch={(kw) => setUserKeyword(kw || '')}
                onAdded={(user) => addUser(user)}
              />
              <UserTable
                data={filteredUsers}
                onDelete={deleteUser}
                onUpdate={updateUser}
              />
            </>
          )}
          {selectedKey === '2' && (
            <>
              <SearchQuestion
                onSearch={(kw) => setQuestionKeyword(kw || '')}
                onAdded={(q) => addQuestion(q)}
              />
              <QuestionTable
                data={filteredQuestions}
                onDelete={deleteQuestion}
                onUpdate={updateQuestion}
              />
            </>
          )}
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        Quiz后台管理 ©2025 Created for demo
      </Footer>
    </Layout>
  );
};

export default Admin;
