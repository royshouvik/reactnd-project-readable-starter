import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: '50px 100px'
    },
    title: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      fontSize: '24px',
      fontWeight: '400',
      marginBottom: '10px',
    },
    body: {
        marginTop: '10px',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    }
  });
  
class NewPost extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <main className="container">
                    <Paper elevation={4} className={classes.container}>
                        <TextField
                            className={classes.title}
                            placeholder="Title of your post"
                            fullWidth
                        />
                        <TextField
                            className={classes.body}
                            placeholder="Write more..."
                            fullWidth
                            multiline
                            rows={8}
                        />
                    </Paper>
                </main>
            </div>
        );
    }
}

NewPost.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(NewPost);