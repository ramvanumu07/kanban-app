3// src/components/kanban/AddTaskModal.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import LabelSelector from '../ui/LabelSelector';

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
  z-index: 999999;
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

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
`;

const CharacterCount = styled.div`
  font-size: 12px;
  color: #6b7280;
  text-align: right;
  margin-top: 4px;
`;

function AddTaskModal({ isOpen, onClose, onSubmit, columnId, availableLabels = [] }) {
  // Default values - no defaults for priority and rating (user must select/enter)
  const getDefaultValues = () => ({
    title: '',
    priority: '',
    rating: '',
    labels: [] // Labels are optional
  });

  const [formData, setFormData] = useState(getDefaultValues());
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be 200 characters or less';
    }

    // Priority validation
    if (!formData.priority) {
      newErrors.priority = 'Priority level is required';
    }

    // Rating validation
    if (!formData.rating || formData.rating.trim() === '') {
      newErrors.rating = 'Rating is required';
    } else {
      const rating = parseFloat(formData.rating);
      if (isNaN(rating) || rating < 0 || rating > 10) {
        newErrors.rating = 'Rating must be between 0.0 and 10.0';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const rating = parseFloat(formData.rating);
    onSubmit(columnId, {
      title: formData.title.trim(),
      priority: formData.priority,
      rating: Math.min(Math.max(rating, 0), 10),
      starred: false,
      labels: formData.labels
    });

    // Reset form
    setFormData(getDefaultValues());
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    // Reset form to default values
    setFormData(getDefaultValues());
    setErrors({});
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      formData.title.trim() !== '' &&
      formData.priority !== '' &&
      formData.rating.trim() !== ''
    );
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
              maxLength={200}
              required
            />
            <CharacterCount>{formData.title.length}/200</CharacterCount>
            {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="priority">Priority *</Label>
            <Select
              id="priority"
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
              required
            >
              <option value="">Select priority level...</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Select>
            {errors.priority && <ErrorMessage>{errors.priority}</ErrorMessage>}
          </FormGroup>



          <FormGroup>
            <Label htmlFor="rating">Rating (0.0 - 10.0) *</Label>
            <NumberInput
              id="rating"
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={formData.rating}
              onChange={(e) => handleChange('rating', e.target.value)}
              placeholder="Enter rating..."
              required
            />
            {errors.rating && <ErrorMessage>{errors.rating}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="labels">Labels</Label>
            <LabelSelector
              selectedLabels={formData.labels}
              availableLabels={availableLabels}
              onLabelsChange={(labels) => handleChange('labels', labels)}
              placeholder="Select labels for this task..."
            />
          </FormGroup>

          <ButtonGroup>
            <Button type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!isFormValid()}
            >
              Create Task
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default React.memo(AddTaskModal);