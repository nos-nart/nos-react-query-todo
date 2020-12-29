import React from 'react'
import { Row, Table, Typography, Checkbox, Space, Button, Empty } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useTodos from '../hooks/useTodos';

const { Column } = Table;
const { Text } = Typography;

export const TodoList = () => {
  const todoQuery = useTodos();

  return (
    <Row>
      <Table
        style={{ width: '100%' }}
        bordered={true}
        loading={todoQuery.isLoading}
        hasData={todoQuery.data && todoQuery.data.length}
        dataSource={todoQuery.data}
        pagination={false}
        size="small"
      >
        <Column
          title="ID"
          dataIndex="id"
          key="id"
          render={(_, record) => (
            <Text>{record.id}</Text>
          )}
        />
        <Column
          title="Title"
          dataIndex="title"
          key="title"
          render={(_, record) => (
            <Text>{record.title}</Text>
          )}
        />
        <Column
          title="Status"
          dataIndex="complete"
          key="status"
          render={(_, record) => (
            <Checkbox checked={record.completed}/>
          )}
        />
        <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <Button
                  size="small" danger
                  icon={<DeleteOutlined />}
                />
                <Button size="small" icon={<EditOutlined />}/>
              </Space>
            )}
          />
      </Table>
    </Row>
  )
}