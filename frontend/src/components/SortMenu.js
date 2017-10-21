import React from "react";
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';

export const sortKey = Object.freeze({
    VOTE_ASCENDING: 1,
    VOTE_DESCENDING: 2,
    DATE_ASCENDING: 3,
    DATE_DESCENDING: 4,
});

const SortMenu = ({ handleClick, handleRequestClose, isOpen, anchorEl}) => {
  return (
    <div className="sortmenu">
      <Button dense onClick={handleClick}>
        SORT BY
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onRequestClose={handleRequestClose}
      >
        <MenuItem onClick={() => handleRequestClose(sortKey.VOTE_ASCENDING)}>Vote Ascending</MenuItem>
        <MenuItem onClick={() => handleRequestClose(sortKey.VOTE_DESCENDING)}>Vote Descending</MenuItem>
        <MenuItem onClick={() => handleRequestClose(sortKey.DATE_ASCENDING)}>Date Ascending</MenuItem>
        <MenuItem onClick={() => handleRequestClose(sortKey.DATE_DESCENDING)}>Date Descending</MenuItem>
      </Menu>
    </div>
  );
};

export default SortMenu;
