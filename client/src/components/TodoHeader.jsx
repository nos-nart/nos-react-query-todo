import React from 'react'
import { Col, Input, Button, Row, Typography, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import { useMutation, useQueryClient } from "react-query";

import { addTodo } from '../services/todoServices';

const { Title } = Typography;

export const TodoHeader = () => {
  const formRef = React.createRef();
  const [form] = Form.useForm();
  const { mutateAsync, isLoading } = useMutation(addTodo);

  const onAdd = async (values) => {
    const { title } = values;
    await mutateAsync({ id: nanoid(), title });
  }

  return (
    <>
      <Row justify="center">
        <Title type="success" level={3}>react-query</Title>
      </Row>
      <Row justify="space-between" gutter="8">
        <Form
          form={form}
          ref={formRef}
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
