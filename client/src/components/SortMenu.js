import React from 'react';
import { Menu, Header, Dropdown, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const MenuBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0;
`;

const SortMenu = ({
  activeItem, showCompleted, handleItemClick, handleCompletedClick,
}) => (
  <div className="sort-menu">
    <Header as="h4">
      <Icon name="filter" />
      <Header.Content>
        Filter by{' '}
        <Dropdown inline defaultValue="Recommendations">
          <Dropdown.Menu>
            <Dropdown.Item
              name="Recommendations"
              text="Recommendations"
              active={activeItem === 'Recommendations'}
              onClick={handleItemClick}
            />
            <Dropdown.Item
              name="Oldest"
              text="Oldest"
              active={activeItem === 'Oldest'}
              onClick={handleItemClick}
            />
            <Dropdown.Item
              name="Newest"
              text="Newest"
              active={activeItem === 'Newest'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="Show Completed"
              text="Completed"
              className="completedOption"
              active={showCompleted}
              onClick={handleCompletedClick}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Header.Content>
    </Header>
  </div>
);

export default SortMenu;
