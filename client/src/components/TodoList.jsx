import React from 'react'
import { Row, Table, Typography, Checkbox, Space, Button, Empty, Input } from 'antd';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import useTodos from '../hooks/useTodos';
import useDeleteTodo from '../hooks/useDeleteTodo';

const { Column } = Table;
const { Text } = Typography;

export const TodoList = () => {
  const [edit, setEdit] = React.useState(false);
  const todoQuery = useTodos();
  const deleteMutation = useDeleteTodo();

  const onDelete = (id) => {
    deleteMutation.mutate({ id });
  }

  let nos = todoQuery.data && todoQuery.data.map(i => {
    return {...i, edit: false};
  })

  const onEdit = id => {
    setEdit(() => !edit);
    console.log('id ~> ', id);
    nos = nos.map(i => {
      if (i.id === id) return {...i, edit: true}
      return i;
    })
  }

  React.useEffect(() => {
    console.log(`nos ~> `, nos);
  }, [nos])

  return (
    <Row>
      <Table
        style={{ width: '100%' }}
        bordered={true}
        loading={todoQuery.isLoading}
        hasData={todoQuery.data && todoQuery.data.length}
        dataSource={nos}
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
                onClick={() => onDelete(record._id)}
                size="small" danger
                icon={<DeleteOutlined />}
              />
              <Button
                onClick={() => onEdit(record.id)}
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