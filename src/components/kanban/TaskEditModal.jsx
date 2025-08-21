// src/components/kanban/TaskEditModal.jsx
import React, { useState, useEffect } from 'react';
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

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
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

function TaskEditModal({ isOpen, onClose, task, onSave }) {
    const [formData, setFormData] = useState({
        title: '',
        details: '',
        priority: 'Medium',
        assignee: 'Hypejab'
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                details: task.details || '',
                priority: task.priority || 'Medium',
                assignee: task.assignee || 'Hypejab'
            });
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            return;
        }

        onSave({
            ...task,
            title: formData.title.trim(),
            details: formData.details.trim(),
            priority: formData.priority,
            assignee: formData.assignee
        });
    };

    const handleClose = () => {
        // Reset form on close
        setFormData({
            title: '',
            details: '',
            priority: 'Medium',
            assignee: 'Hypejab'
        });
        onClose();
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (!isOpen || !task) return null;

    return (
        <ModalOverlay onClick={handleClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>Edit Task</ModalTitle>
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
                        <Label htmlFor="details">Description</Label>
                        <TextArea
                            id="details"
                            value={formData.details}
                            onChange={(e) => handleChange('details', e.target.value)}
                            placeholder="Enter task description..."
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

                    <ButtonGroup>
                        <Button type="button" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={!formData.title.trim()}
                        >
                            Save Changes
                        </Button>
                    </ButtonGroup>
                </Form>
            </ModalContent>
        </ModalOverlay>
    );
}

export default TaskEditModal;