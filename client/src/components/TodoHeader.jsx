import React from 'react'
import { Col, Input, Button, Row, Typography, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import useCreateTodo from '../hooks/useCreateTodo';

const { Title } = Typography;

export const TodoHeader = () => {
  const [form] = Form.useForm();
  const mutation = useCreateTodo();

  const onAdd = values => {
    const { title } = values;
    mutation.mutate({ title, id: nanoid() });
  }

  return (
    <>
      <Row justify="center">
        <Title type="success" level={3}>react-query</Title>
      </Row>
      <Row justify="space-between" gutter="8">
        <Form
          form={form}
          layout="inline"
          style={{ width: '100%' }}
          onFinish={onAdd}
        >
          <Row gutter={8} style={{ width: '100%' }}>
            <Col span={20}>
              <Form.Item
                name="title"
                rules={[{ required: true, message: 'Please input your title!' }]}
              >
                <Input allowClear placeholder="what needs to be done?" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<PlusOutlined />}
                >
                  Add
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Row>
    </>
  )
}
