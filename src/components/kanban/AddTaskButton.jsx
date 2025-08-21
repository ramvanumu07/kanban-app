// src/components/kanban/AddTaskButton.jsx
import React from 'react';
import Button from '../ui/Button';

function AddTaskButton({ onClick, disabled }) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      style={{ width: '100%', marginBottom: '0.7em', fontSize: '1.08em' }}
    >
      ＋ Add Task
    </Button>
  );
}

export default React.memo(AddTaskButton);