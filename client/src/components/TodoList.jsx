import React from 'react'
import { Row, Table, Typography, Checkbox, Space, Button, Input } from 'antd';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';

import { getTodos } from '../services/todoServices';

const { Column } = Table;
const { Text } = Typography;

export const TodoList = () => {
  // eslint-disable-next-line no-unused-vars
  let { data, isLoading, isError, isFetched, error } = useQuery('todos', getTodos);

  if (isError) {
    return (
      <>Something went wrong</>
    )
  }

  return (
    <Row>
      <Table
        style={{ width: '100%' }}
        bordered={true}
        loading={isLoading}
        hasData={data && data.length}
        dataSource={data}
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
          render={(_, record) => {
            return record.edit
              ? <Input style={{padding: 0}} placeholder={record.title} bordered={false} />
              : <Text>{record.title}</Text>
          }}
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
              <Button
                size="small"
                icon={record.edit ? <SaveOutlined />  : <EditOutlined />}
              />
            </Space>
          )}
        />
      </Table>
    </Row>
  )
}