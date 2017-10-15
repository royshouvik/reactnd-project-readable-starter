import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { NavLink } from 'react-router-dom';
import Button from 'material-ui/Button';

const propTypes = {
    categories: PropTypes.array,
};

const styles = theme => ({
    nav: {
        position: 'relative',
        textDecoration: 'none',
    }
  });

function CategoryList({ categories, classes }) {
    return (
        <div>
            {
                categories && categories.map(({ name, path }) => (
                    <NavLink
                        to={`/${path}`}
                        activeClassName="active"
                        className={classes.nav}
                        key={name}
                    >
                        <Button color="contrast">
                            { name.toUpperCase() }
                        </Button>
                    </NavLink>
                    )
                )
            }
        </div>
    )
}

CategoryList.propTypes = propTypes;

export default withStyles(styles)(CategoryList);
