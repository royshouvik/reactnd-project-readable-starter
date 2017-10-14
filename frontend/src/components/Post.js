import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import PersonIcon from 'material-ui-icons/Person';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';


const propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        voteScore: PropTypes.number,
        timestamp: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
    }).isRequired,
};

const styles = theme => ({
    root: theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
      marginTop: theme.spacing.unit * 3,
    }),
    avatar: {
        border: '1px solid #dbdbdb',
        color: 'white',
        borderRadius: '50%',
        backgroundColor: '#dbdbdb',
        padding: '5px',
        marginRight: '10px',
    },
    likeIcon: {
        fontSize: '16px',
        marginRight: '5px',
    },
    likeButton: {
        color: '#616770',
        margin: '0 5px',
        border: '2px solid #616770',
        padding: '4px 10px',
        '&:hover': {
            color: '#616770',

        }
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
    }
  });

function Post({ post, classes }) {
    return (
        <Paper className={classes.root} elevation={4}>
            <div className={classes.header}>
                <div className={classes.author}>
                    <PersonIcon className={classes.avatar}/>
                    <div>
                        <Typography type="body2" component="p">
                            {post.author}
                        </Typography>
                        <Typography type="caption">
                            { `Posted on ${new Date(post.timestamp).toDateString()}`}
                        </Typography>
                    </div>
                </div>
                <Chip label={post.category} className={classes.category}/>

            </div>
            <Typography type="headline" component="h3" className={classes.title}>
                {post.title}
            </Typography>
            <Typography type="body1" component="p" className={classes.body}>
                {post.body}
            </Typography>
            <div className={classes.actions}>
            <Button dense className={classes.likeButton}>
                <Icon color="action" className={classes.likeIcon}>thumb_up</Icon>
                    {post.voteScore === 0 ? 'Up Vote' : post.voteScore}
            </Button>
            <Button dense>
                Edit
            </Button>
            <Button dense>
                Comment
            </Button>
            </div>
        </Paper>
    )
}

Post.propTypes = propTypes;

export default withStyles(styles)(Post);

