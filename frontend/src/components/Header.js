import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
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
  },
  addPost: {
    backgroundColor: '#43A047',
    color: 'white',
    '&:hover': {
      backgroundColor: '#55c75a'
    }
  }

});

const categories = [
  {
      "name": "react",
      "path": "react",
      "isActive": true,
  },
  {
      "name": "redux",
      "path": "redux"
  },
  {
      "name": "udacity",
      "path": "udacity"
  }
];


const ButtonAppBar = ({ classes }) => (
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.container}>
          <div className={classes.flex}>
            <Typography type="title" color="inherit" className={classes.brand}>
              Readable
            </Typography>
            <CategoryList categories={categories} />
          </div>
          <Button raised className={classes.addPost}>Add New Post</Button>
        </Toolbar>
      </AppBar>
  );

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);