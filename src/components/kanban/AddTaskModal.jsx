// src/components/kanban/AddTaskModal.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
  border-radius: 4px;
  
  &:hover {
    color: #374151;
    background: #f3f4f6;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.variant === 'primary' ? `
    background: #3b82f6;
    color: white;
    border: none;
    
    &:hover {
      background: #2563eb;
    }
    
    &:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
  ` : `
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;
    
    &:hover {
      background: #e5e7eb;
    }
  `}
`;

const NumberInput = styled(Input)`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

function AddTaskModal({ isOpen, onClose, onSubmit, columnId }) {
  // Generate random defaults for each new task
  const generateRandomDefaults = () => {
    const priorities = ['Critical', 'High', 'Medium', 'Low'];
    const assignees = ['Hypejab', 'Gelastra', 'SecurityTeam'];
    const ratings = ['7.2', '8.1', '8.8', '9.1', '6.9', '7.8', '9.3', '8.5'];

    return {
      title: '',
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      rating: ratings[Math.floor(Math.random() * ratings.length)]
    };
  };

  const [formData, setFormData] = useState(generateRandomDefaults());

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    const rating = parseFloat(formData.rating);
    if (isNaN(rating) || rating < 0 || rating > 10) {
      return;
    }

    onSubmit(columnId, {
      title: formData.title.trim(),
      priority: formData.priority,
      assignee: formData.assignee,
      rating: Math.min(Math.max(rating, 0), 10),
      starred: false,
      labels: ['Security'],
      assignees: [{ id: '1', name: 'User', initials: 'U', avatar: null }]
    });

    // Reset form
    setFormData({
      title: '',
      priority: 'Medium',
      assignee: 'Hypejab',
      rating: '8.8'
    });

    onClose();
  };

  const handleClose = () => {
    // Reset form with new random defaults
    setFormData(generateRandomDefaults());
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Add New Task</ModalTitle>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter task title..."
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="priority">Priority</Label>
            <Select
              id="priority"
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
            >
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="assignee">Assignee</Label>
            <Select
              id="assignee"
              value={formData.assignee}
              onChange={(e) => handleChange('assignee', e.target.value)}
            >
              <option value="Hypejab">Hypejab</option>
              <option value="Gelastra">Gelastra</option>
              <option value="SecurityTeam">SecurityTeam</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="rating">Rating (0.0 - 10.0)</Label>
            <NumberInput
              id="rating"
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={formData.rating}
              onChange={(e) => handleChange('rating', e.target.value)}
              placeholder="8.8"
            />
          </FormGroup>

          <ButtonGroup>
            <Button type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!formData.title.trim()}
            >
              Create Task
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default AddTaskModal;