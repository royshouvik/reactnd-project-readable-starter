import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const propTypes = {
    categories: PropTypes.array,
};

const styles = theme => ({
    active: {
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-14px',
            left: 0,
            width: '100%',
            height: '3px',
            background: '#fff',
        }
    }
  });

function CategoryList({ categories, classes }) {
    return (
        <div>
            {
                categories && categories.map(({ name, isActive }) => (
                    <Button key={name} color="contrast" className={isActive ? classes.active: ''}>
                        { name.toUpperCase() }
                    </Button>
                    )
                )
            }
        </div>
    )
}

CategoryList.propTypes = propTypes;

export default withStyles(styles)(CategoryList);
