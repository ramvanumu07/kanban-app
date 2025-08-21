// src/components/kanban/BoardHeader.jsx
import React from 'react';
import styled from 'styled-components';
import Input from '../ui/Input';
import FilterButton from '../ui/FilterButton';
import DropdownFilterButton from '../ui/DropdownFilterButton';
import ViewToggle from '../ui/ViewToggle';
import {
  SortIcon,
  AssignedToIcon,
  SeverityIcon,
  StatusIcon,
  PentestIcon,
  TargetIcon,
  SearchIcon
} from '../ui/icons.jsx';

const HeaderContainer = styled.div`
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 24px 32px;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const WelcomeText = styled.span`
  color: #6b7280;
  font-size: 14px;
`;

const LogoutButton = styled.button`
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background: #e5e7eb;
  }
`;

const ControlsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 300px;
  height: 36px;
  padding: 0 12px 0 40px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ViewToggleContainer = styled.div`
  display: flex;
  background: #f3f4f6;
  border-radius: 6px;
  padding: 2px;
`;

const ViewButton = styled.button`
  padding: 6px 16px;
  border: none;
  border-radius: 4px;
  background: ${props => props.active ? '#fff' : 'transparent'};
  color: ${props => props.active ? '#374151' : '#6b7280'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: ${props => props.active ? '0 1px 2px rgba(0, 0, 0, 0.05)' : 'none'};
  
  &:hover {
    color: #374151;
  }
`;

function BoardHeader({
  searchValue = '',
  onSearchChange,
  sortOptions = [],
  sortValue = '',
  onSortChange,
  viewType = 'board',
  onViewChange,
  user,
  onLogout
}) {
  return (
    <HeaderContainer>
      <TopSection>
        <Title>Vulnerabilities</Title>
        <UserSection>
          <WelcomeText>Welcome, {user?.email || 'User'}</WelcomeText>
          <LogoutButton onClick={onLogout}>Logout</LogoutButton>
        </UserSection>
      </TopSection>

      <ControlsSection>
        <LeftControls>
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <SearchInput
              type="text"
              placeholder="Search by issue name..."
              value={searchValue}
              onChange={onSearchChange}
            />
          </SearchContainer>

          <FilterGroup>
            <DropdownFilterButton
              icon={<SortIcon />}
              label="Sort By"
              options={sortOptions}
              value={sortValue}
              onChange={onSortChange}
            />

            <FilterButton
              icon={<AssignedToIcon />}
              label="Assigned To"
              onClick={() => { }}
              dashed={true}
            />

            <FilterButton
              icon={<SeverityIcon />}
              label="Severity"
              onClick={() => { }}
              dashed={true}
            />

            <FilterButton
              icon={<StatusIcon />}
              label="Status"
              onClick={() => { }}
              dashed={true}
            />

            <FilterButton
              icon={<PentestIcon />}
              label="Pentest"
              onClick={() => { }}
              dashed={true}
            />

            <FilterButton
              icon={<TargetIcon />}
              label="Target"
              onClick={() => { }}
              dashed={true}
            />
          </FilterGroup>
        </LeftControls>

        <ViewToggleContainer>
          <ViewButton
            active={viewType === 'board'}
            onClick={() => onViewChange?.('board')}
          >
            Board
          </ViewButton>
          <ViewButton
            active={viewType === 'list'}
            onClick={() => onViewChange?.('list')}
          >
            List
          </ViewButton>
        </ViewToggleContainer>
      </ControlsSection>
    </HeaderContainer>
  );
}



export default React.memo(BoardHeader);