// src/components/kanban/LabelManager.jsx
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
  z-index: 999999;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 480px) {
    width: 95%;
    padding: 16px;
    margin: 16px;
    border-radius: 8px;
  }
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
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: end;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ColorInput = styled.input`
  width: 60px;
  height: 36px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  padding: 0;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    height: 44px;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  
  ${props => props.variant === 'primary' ? `
    background: #3b82f6;
    color: white;
    border: none;
    
    &:hover {
      background: #2563eb;
    }
  ` : props.variant === 'danger' ? `
    background: #dc2626;
    color: white;
    border: none;
    
    &:hover {
      background: #b91c1c;
    }
  ` : `
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;
    
    &:hover {
      background: #e5e7eb;
    }
  `}
  
  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 16px;
    min-height: 44px;
  }
`;

const LabelsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LabelItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
`;

const LabelDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LabelColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  background: ${props => props.color};
`;

const LabelName = styled.span`
  font-weight: 500;
  color: #374151;
`;

const LabelActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
`;

function LabelManager({
  isOpen,
  onClose,
  labels = [],
  onAddLabel,
  onEditLabel,
  onDeleteLabel
}) {
  const [formData, setFormData] = useState({ name: '', color: '#3b82f6' });
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Label name is required';
    } else if (formData.name.length > 30) {
      newErrors.name = 'Label name must be 30 characters or less';
    } else {
      // Check for duplicates
      const existingNames = labels
        .filter(label => label.id !== editingId)
        .map(label => label.name.toLowerCase());
      if (existingNames.includes(formData.name.trim().toLowerCase())) {
        newErrors.name = 'A label with this name already exists';
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const labelData = {
      name: formData.name.trim(),
      color: formData.color
    };

    if (editingId) {
      onEditLabel(editingId, labelData);
      setEditingId(null);
    } else {
      const newLabel = {
        id: `label_${Date.now()}`,
        ...labelData
      };
      onAddLabel(newLabel);
    }

    setFormData({ name: '', color: '#3b82f6' });
  };

  const handleEdit = (label) => {
    setFormData({ name: label.name, color: label.color });
    setEditingId(label.id);
  };

  const handleCancelEdit = () => {
    setFormData({ name: '', color: '#3b82f6' });
    setEditingId(null);
    setErrors({});
  };

  const handleClose = () => {
    handleCancelEdit();
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Manage Labels</ModalTitle>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="labelName">
                {editingId ? 'Edit Label' : 'Add New Label'}
              </Label>
              <Input
                id="labelName"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter label name..."
                maxLength={30}
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="labelColor">Color</Label>
              <ColorInput
                id="labelColor"
                type="color"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
              />
            </FormGroup>
            <Button type="submit" variant="primary">
              {editingId ? 'Update' : 'Add'}
            </Button>
            {editingId && (
              <Button type="button" onClick={handleCancelEdit}>
                Cancel
              </Button>
            )}
          </FormRow>
        </Form>

        <LabelsList>
          {labels.map(label => (
            <LabelItem key={label.id}>
              <LabelDisplay>
                <LabelColor color={label.color} />
                <LabelName>{label.name}</LabelName>
              </LabelDisplay>
              <LabelActions>
                <Button onClick={() => handleEdit(label)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => onDeleteLabel(label.id)}
                >
                  Delete
                </Button>
              </LabelActions>
            </LabelItem>
          ))}
        </LabelsList>
      </ModalContent>
    </ModalOverlay>
  );
}

export default LabelManager;
