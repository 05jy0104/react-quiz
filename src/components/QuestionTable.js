import { Space, Table, message, Modal, Form, Input, Button, Select } from 'antd';
import React, { useState, useEffect } from 'react';

const { TextArea } = Input;
const { Option } = Select;

const FormContainer = {
  padding: '20px',
  borderRadius: '8px',
  background: '#fff',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
};


const mockQuestionData = [
    {
      key: '1',
      id: '1',
      question: 'React中用于处理组件生命周期副作用的钩子是？',
      options: ['A. useEffect()', 'B. useCallback()', 'C. useMemo()', 'D. useRef()'],
      answer: 'A'
    },
    {
      key: '2',
      id: '2',
      question: 'JavaScript中，以下哪种不是基本数据类型？',
      options: ['A. Object', 'B. String', 'C. Boolean', 'D. Number'],
      answer: 'A'
    },
    {
      key: '3',
      id: '3',
      question: 'CSS中，用于清除浮动影响的方法是？',
      options: ['A. 父元素设置overflow: hidden', 'B. 子元素设置float: clear', 'C. 父元素设置position: relative', 'D. 子元素设置display: block'],
      answer: 'A'
    },
    {
      key: '4',
      id: '4',
      question: 'Vue组件中，子组件向父组件传递数据的方式是？',
      options: ['A. 自定义事件', 'B. props', 'C. Vuex', 'D. $parent'],
      answer: 'A'
    },
    {
      key: '5',
      id: '5',
      question: 'HTTP状态码中表示服务器内部错误的是？',
      options: ['A. 500', 'B. 404', 'C. 403', 'D. 200'],
      answer: 'A'
    },
    {
      key: '6',
      id: '6',
      question: 'JavaScript中，将字符串转换为整数的方法是？',
      options: ['A. parseInt()', 'B. parseFloat()', 'C. Number()', 'D. toString()'],
      answer: 'A'
    },
    {
      key: '7',
      id: '7',
      question: 'React中，用于在函数组件中获取DOM元素的钩子是？',
      options: ['A. useRef()', 'B. useState()', 'C. useReducer()', 'D. useContext()'],
      answer: 'A'
    },
    {
      key: '8',
      id: '8',
      question: 'CSS中，设置元素隐藏且不占据空间的属性是？',
      options: ['A. display: none', 'B. visibility: hidden', 'C. opacity: 0', 'D. z-index: -1'],
      answer: 'A'
    },
    {
      key: '9',
      id: '9',
      question: 'TypeScript中，定义可选属性的符号是？',
      options: ['A. ?', 'B. !', 'C. :', 'D. ='],
      answer: 'A'
    },
    {
      key: '10',
      id: '10',
      question: '以下哪种方法可以深拷贝JavaScript对象？',
      options: ['A. JSON.parse(JSON.stringify(obj))', 'B. Object.assign({}, obj)', 'C. {...obj}', 'D. Array.from(obj)'],
      answer: 'A'
    },
    {
      key: '11',
      id: '11',
      question: 'Vue3中，用于创建响应式对象的API是？',
      options: ['A. reactive()', 'B. ref()', 'C. computed()', 'D. watch()'],
      answer: 'A'
    },
    {
      key: '12',
      id: '12',
      question: 'HTTP请求中，用于提交表单数据的方法是？',
      options: ['A. POST', 'B. GET', 'C. PUT', 'D. DELETE'],
      answer: 'A'
    },
    {
      key: '13',
      id: '13',
      question: 'CSS中，实现元素水平居中的方法不包括？',
      options: ['A. margin: 0 auto（块级元素）', 'B. text-align: center（行内元素）', 'C. flex布局的justify-content: center', 'D. float: center'],
      answer: 'D'
    },
    {
      key: '14',
      id: '14',
      question: 'JavaScript中，Promise的三种状态不包括？',
      options: ['A. pending', 'B. resolved', 'C. rejected', 'D. completed'],
      answer: 'D'
    },
    {
      key: '15',
      id: '15',
      question: 'React Router中，用于导航的组件是？',
      options: ['A. Link', 'B. Route', 'C. Switch', 'D. Redirect'],
      answer: 'A'
    },
    {
      key: '16',
      id: '16',
      question: '以下哪种不是前端性能优化的常用手段？',
      options: ['A. 图片压缩', 'B. 代码分割', 'C. 增加HTTP请求数', 'D. 使用CDN'],
      answer: 'C'
    },
    {
      key: '17',
      id: '17',
      question: 'CSS中，用于设置元素过渡动画的属性是？',
      options: ['A. transition', 'B. animation', 'C. transform', 'D. translate'],
      answer: 'A'
    },
    {
      key: '18',
      id: '18',
      question: 'JavaScript中，数组的filter方法返回值是？',
      options: ['A. 符合条件的新数组', 'B. 原数组', 'C. 布尔值', 'D. 第一个符合条件的元素'],
      answer: 'A'
    },
    {
      key: '19',
      id: '19',
      question: 'Vue中，用于监听路由变化的钩子是？',
      options: ['A. onRouteChange', 'B. watch: $route', 'C. beforeCreate', 'D. mounted'],
      answer: 'B'
    },
    {
      key: '20',
      id: '20',
      question: 'Git中，用于查看工作区状态的命令是？',
      options: ['A. git status', 'B. git log', 'C. git diff', 'D. git branch'],
      answer: 'A'
    }
  ];

const QuestionTab = ({ searchKeyword, refreshFlag }) => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: mockQuestionData.length,
        showSizeChanger: false,
        placement: 'bottomLeft',
    });
    const [loading, setLoading] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [form] = Form.useForm();

    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '题目',
            dataIndex: 'question',
            key: 'question',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '选项',
            dataIndex: 'options',
            key: 'options',
            render: (options) => options.join(', ')
        },
        {
            title: '答案',
            dataIndex: 'answer',
            key: 'answer',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleEdit(record)}>编辑</Button>
                    <Button type="primary" danger onClick={() => handleDelete(record)}>删除</Button>
                </Space>
            ),
        },
    ];

    const fetchData = (page = 1, pageSize = 5, keyword = '') => {
        setLoading(true);
     
        setTimeout(() => {
            let filteredData = [...mockQuestionData];
            if (keyword && keyword.trim() !== '') {
                filteredData = mockQuestionData.filter(question => 
                    question.question.toLowerCase().includes(keyword.toLowerCase())
                );
            }
    
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            const paginatedData = filteredData.slice(start, end);
            
            setData(paginatedData);
            setPagination({
                ...pagination,
                current: page,
                pageSize: pageSize,
                total: filteredData.length,
            });
            setLoading(false);
        }, 300); 
    };

    const handleEdit = (record) => {
        console.log('编辑题目:', record);
        setEditingQuestion(record);
        // 解析所有四个选项（A/B/C/D）
        form.setFieldsValue({
            question: record.question,
            optionA: record.options[0]?.replace('A. ', '') || '',
            optionB: record.options[1]?.replace('B. ', '') || '',
            optionC: record.options[2]?.replace('C. ', '') || '',
            optionD: record.options[3]?.replace('D. ', '') || '',
            answer: record.answer
        });
        setEditModalVisible(true);
    };

    const handleEditSave = async () => {
        try {
            const values = await form.validateFields();
            console.log('编辑表单值:', values);
            
            message.success(`已更新题目：${values.question}`);
            setEditModalVisible(false);
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            console.error('表单验证失败:', error);
        }
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除题目 "${record.question}" `,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                message.success(`已删除题目：${record.question}（演示模式）`);
            }
        });
    };

    const handleTableChange = (pag) => {
        console.log('页码变化:', pag);
        fetchData(pag.current, pag.pageSize, searchKeyword);
    };

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [searchKeyword, refreshFlag]);

    return (
        <>
            <style>{`
                .ant-pagination-item {
                    margin-right: 3px !important;
                    margin-left: 3px !important;
                }
                .ant-pagination-prev,
                .ant-pagination-next {
                    margin-right: 3px !important;
                    margin-left: 3px !important;
                }
                .ant-table-wrapper .ant-table-pagination.ant-pagination {
                    justify-content: flex-start !important;
                }
            `}</style>
            
            <Table
                columns={columns}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                rowKey="id"
                bordered
                size="middle"
            />

            <Modal
                title="编辑题目"
                open={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                okText="保存"
                cancelText="取消"
                width={600}
                footer={null}
                onOk={handleEditSave}
            >
                <div style={FormContainer}>
                    <Form
                        form={form}
                        layout="vertical"
                        size="middle"
                        style={{ marginTop: '10px' }}
                    >
                        <Form.Item
                            name="question"
                            label="题目内容"
                            rules={[{ message: '请输入题目内容' }]}
                            style={{ marginBottom: '16px' }}
                        >
                            <TextArea 
                                rows={3} 
                                placeholder="请输入题目内容" 
                                style={{ 
                                    borderRadius: '6px', 
                                    borderColor: '#e8e8e8',
                                    resize: 'none',
                                    minHeight: '84px',
                                    maxHeight: '84px',
                                    width: '100%'
                                }} 
                            />
                        </Form.Item>

                        <Form.Item
                            name="optionA"
                            label="选项A"
                            style={{ marginBottom: '16px' }} 
                        >
                            <Input 
                                placeholder="选项A" 
                                style={{ borderRadius: '6px', borderColor: '#e8e8e8', width: '100%' }}
                            />
                        </Form.Item>
                        
                        <Form.Item
                            name="optionB"
                            label="选项B"
                            style={{ marginBottom: '16px' }}
                        >
                            <Input 
                                placeholder="选项B" 
                                style={{ borderRadius: '6px', borderColor: '#e8e8e8', width: '100%' }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="optionC"
                            label="选项C"
                            style={{ marginBottom: '16px' }}
                        >
                            <Input 
                                placeholder="选项C" 
                                style={{ borderRadius: '6px', borderColor: '#e8e8e8', width: '100%' }}
                            />
                        </Form.Item>
                        
                        <Form.Item
                            name="optionD"
                            label="选项D"
                            style={{ marginBottom: '20px' }}
                        >
                            <Input 
                                placeholder="选项D" 
                                style={{ borderRadius: '6px', borderColor: '#e8e8e8', width: '100%' }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="answer"
                            label="正确答案"
                            rules={[{ message: '请输入正确答案' }]}
                            style={{ marginBottom: '20px' }}
                        >
                            <Input 
                                placeholder="请输入正确答案（如：A/B/C/D）" 
                                style={{ borderRadius: '6px', borderColor: '#e8e8e8', width: '100%' }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'center',
                                gap: '12px',
                                marginTop: '10px'
                            }}>
                                <Button 
                                    onClick={() => setEditModalVisible(false)}
                                    type="default" 
                                    ghost
                                    style={{ 
                                        padding: '0 20px',
                                        borderRadius: '6px',
                                    }}
                                >
                                    取消
                                </Button>
                                <Button 
                                    type="primary" 
                                    onClick={handleEditSave}
                                    style={{ 
                                        padding: '0 24px',
                                        borderRadius: '6px',
                                        backgroundColor: '#1890ff',
                                        borderColor: '#1890ff',
                                    }}
                                >
                                    保存
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default QuestionTab;