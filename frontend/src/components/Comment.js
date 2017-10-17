import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import PersonIcon from 'material-ui-icons/Person';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ArrowDown from 'material-ui-icons/KeyboardArrowDown';
import ArrowUp from 'material-ui-icons/KeyboardArrowUp';


const propTypes = {
    comment: PropTypes.shape({
        body: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        voteScore: PropTypes.number,
        timestamp: PropTypes.number.isRequired,
    }).isRequired,
    onDownVote: PropTypes.func.isRequired,
    onUpVote: PropTypes.func.isRequired,
};

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
    }),
    avatar: {
        border: '1px solid #dbdbdb',
        color: 'white',
        borderRadius: '50%',
        backgroundColor: '#dbdbdb',
        padding: '5px',
        marginRight: '10px',
    },
    header: {
        display: 'flex',
        padding: '20px 0',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    category: {
        borderRadius: '0',
        backgroundColor: '#f5f5f5',

    },
    voteScore: {
        textAlign: 'center',
        margin: '0 auto',
    },
    voteContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    postContainer: {
        flexGrow: 9,
    },
    author: {
        display: 'flex',
    },
    title: {
        margin: '10px 0',
    },
    body: {
        marginBottom: '40px',
    },
    actions: {
        display: 'flex',
    }, 
    actionButton: {
        border: '2px solid rgba(0, 0, 0, 0.54)',
    },
    deleteButton: {
        color: 'red',
        border: '2px solid rgba(255, 0, 0, 0.54)',
    },
    deleteContainer: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    }
});

function Comment({ comment, classes, onUpVote, onDownVote }) {
    return (
        <Paper className={classes.root} elevation={1}>
            <div className={classes.voteContainer}>
                <IconButton className={classes.button} aria-label="up vote" onClick={onUpVote}>
                    <ArrowUp />
                </IconButton>
                <h2 className={classes.voteScore}>{comment.voteScore}</h2>
                <IconButton className={classes.button} aria-label="down vote"onClick={onDownVote}>
                    <ArrowDown />
                </IconButton>
            </div>
            <div className={classes.postContainer}>
                <div className={classes.header}>
                    <div className={classes.author}>
                        <PersonIcon className={classes.avatar} />
                        <div>
                            <Typography type="body2" component="p">
                                {comment.author}
                            </Typography>
                            <Typography type="caption">
                                {`Posted on ${new Date(comment.timestamp).toDateString()}`}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div>
                <Typography type="body1" component="p" className={classes.body}>
                    {comment.body}
                </Typography>
                </div>
                <div className={classes.actions}>
                    <Button dense className={classes.actionButton}>
                        Edit
                    </Button>
                    <div className={classes.deleteContainer}>
                        <Button dense className={classes.deleteButton}>
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </Paper>
        
    )
}

Comment.propTypes = propTypes;

export default withStyles(styles)(Comment);

