import React from 'react';
import { Row } from 'antd';

import { TodoFilter } from './TodoFilter';

export const TodoFooter = () => {
  return (
    <Row>
      <TodoFilter />
    </Row>
  )
}
