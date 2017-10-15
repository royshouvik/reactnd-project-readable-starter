import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import CategoryList from './CategoryList';

const styles = theme => ({
  root: {
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#212121',
  },
  flex: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    maxWidth: '960px',
    margin: '0 auto',
    width: '100%',
  },
  brand: {
    margin: '0 20px',
    color: '#FFFFFF'
  },
  addPost: {
    backgroundColor: '#43A047',
    color: 'white',
    '&:hover': {
      backgroundColor: '#55c75a'
    }
  }

});

const noUnderLine = {
  textDecoration: 'none',
};
const Header = ({ classes, categories }) => (
  <AppBar position="static" className={classes.root}>
    <Toolbar className={classes.container}>
      <div className={classes.flex}>
        <Link to="/" style={noUnderLine}>
          <Typography type="title" color="inherit" className={classes.brand}>
            Readable
            </Typography>
        </Link>
        <CategoryList categories={categories} />
      </div>
      <Link to="/new" style={noUnderLine}>
        <Button raised className={classes.addPost}>Add New Post</Button>
      </Link>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array,
};

export default withStyles(styles)(Header);