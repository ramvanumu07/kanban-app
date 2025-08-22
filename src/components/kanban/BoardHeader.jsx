// src/components/kanban/BoardHeader.jsx
import React from 'react';
import styled from 'styled-components';
import Input from '../ui/Input';
import FilterButton from '../ui/FilterButton';
import DropdownFilterButton from '../ui/DropdownFilterButton';
import ViewToggle from '../ui/ViewToggle';
import {
  SortIcon,
  FilterIcon,
  SearchIcon,
  BoardIcon,
  ListIcon
} from '../ui/icons.jsx';
import FilterMenuButton from '../ui/FilterMenuButton';
import LabelFilter from '../ui/LabelFilter';

const HeaderContainer = styled.div`
  background: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const UserRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const WelcomeText = styled.span`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
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
  transition: all 0.2s ease;
  
  &:hover {
    background: #e5e7eb;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const LeftControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;

const DesktopFilters = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileFilters = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 280px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
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
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ViewToggleGroup = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  width: fit-content;
  align-self: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DesktopViewToggle = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ViewButton = styled.button`
  position: relative;
  padding: 8px 16px;
  border: none;
  border-right: ${props => props.isLast ? 'none' : '1px solid #d1d5db'};
  background: ${props => props.active ? '#dbeafe' : '#ffffff'};
  color: ${props => props.active ? '#1464ff' : '#6b7280'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background: ${props => props.active ? '#bfdbfe' : '#f9fafb'};
    color: ${props => props.active ? '#1464ff' : '#374151'};
    box-shadow: ${props => props.active ? '0 2px 4px rgba(20, 100, 255, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.05)'};
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
    gap: 6px;
    flex: 1;
    height: 32px;
  }

  svg {
    width: 16px;
    height: 16px;

    @media (max-width: 768px) {
      width: 16px;
      height: 16px;
    }
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.active ? '24px' : '0'};
    height: 2px;
    background: #1464ff;
    border-radius: 1px;
    transition: all 0.2s ease;
  }
`;



function BoardHeader({
  searchValue,
  onSearchChange,
  sortOptions,
  sortValue,
  onSortChange,
  viewType,
  onViewChange,
  user,
  onLogout,
  onManageLabels,
  onLabelFilterChange,
  selectedLabels = [],
  availableLabels = [],
  loading
}) {
  const [selectedFilter, setSelectedFilter] = React.useState(null);

  // Find the current sort option label
  const currentSortLabel = sortOptions?.find(option => option.value === sortValue)?.label || 'Sort By';

  return (
    <HeaderContainer className="board-header">
      <UserRow>
        <UserSection>
          <WelcomeText>Welcome, {user?.email || 'User'}</WelcomeText>
          <LogoutButton onClick={onLogout}>Logout</LogoutButton>
        </UserSection>
      </UserRow>

      <TitleRow>
        <Title>Vulnerabilities</Title>
      </TitleRow>

      <ControlsRow>
        <LeftControls>
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <SearchInput
              placeholder="Search by issue name..."
              value={searchValue}
              onChange={onSearchChange}
              disabled={loading}
            />
          </SearchContainer>

          <DesktopFilters>
            <DropdownFilterButton
              icon={<SortIcon />}
              label={currentSortLabel}
              buttonText="Sort By"
              options={sortOptions}
              value={sortValue}
              onChange={onSortChange}
              showLabel={true}
              dashed={false}
              hideArrow={true}
              fixedWidth="120px"
            />

            <LabelFilter
              selectedLabels={selectedLabels}
              availableLabels={availableLabels}
              onLabelsChange={onLabelFilterChange}
            />

            <FilterButton
              icon={<FilterIcon />}
              label="Manage Labels"
              selected={false}
              onClick={onManageLabels}
              dashed={false}
              showLabel={true}
            />

            <FilterButton
              icon={<FilterIcon />}
              label="Assigned To"
              selected={false}
              onClick={() => { }}
              dashed={true}
              showLabel={true}
            />
            <FilterButton
              icon={<FilterIcon />}
              label="Severity"
              selected={false}
              onClick={() => { }}
              dashed={true}
              showLabel={true}
            />
            <FilterButton
              icon={<FilterIcon />}
              label="Status"
              selected={false}
              onClick={() => { }}
              dashed={true}
              showLabel={true}
            />
            <FilterButton
              icon={<FilterIcon />}
              label="Pentest"
              selected={false}
              onClick={() => { }}
              dashed={true}
              showLabel={true}
            />
            <FilterButton
              icon={<FilterIcon />}
              label="Target"
              selected={false}
              onClick={() => { }}
              dashed={true}
              showLabel={true}
            />
          </DesktopFilters>

          <MobileFilters>
            <DropdownFilterButton
              icon={<SortIcon />}
              label={currentSortLabel}
              buttonText="Sort By"
              options={sortOptions}
              value={sortValue}
              onChange={onSortChange}
              showLabel={true}
              dashed={false}
              hideArrow={true}
            />

            <LabelFilter
              selectedLabels={selectedLabels}
              availableLabels={availableLabels}
              onLabelsChange={onLabelFilterChange}
            />

            <FilterButton
              icon={<FilterIcon />}
              label="Manage Labels"
              selected={false}
              onClick={onManageLabels}
              dashed={false}
              showLabel={true}
            />

            <FilterMenuButton
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />

            <ViewToggleGroup>
              <ViewButton
                active={viewType === 'board'}
                onClick={() => onViewChange('board')}
                isLast={false}
              >
                <BoardIcon />
                Board
              </ViewButton>
              <ViewButton
                active={viewType === 'list'}
                onClick={() => onViewChange('list')}
                isLast={true}
              >
                <ListIcon />
                List
              </ViewButton>
            </ViewToggleGroup>
          </MobileFilters>
        </LeftControls>

        <DesktopViewToggle>
          <ViewButton
            active={viewType === 'board'}
            onClick={() => onViewChange('board')}
            isLast={false}
          >
            <BoardIcon />
            Board
          </ViewButton>
          <ViewButton
            active={viewType === 'list'}
            onClick={() => onViewChange('list')}
            isLast={true}
          >
            <ListIcon />
            List
          </ViewButton>
        </DesktopViewToggle>
      </ControlsRow>
    </HeaderContainer>
  );
}



export default React.memo(BoardHeader);