import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Chip from "material-ui/Chip";
import PersonIcon from "material-ui-icons/Person";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Badge from "material-ui/Badge";
import IconButton from "material-ui/IconButton";
import ArrowDown from "material-ui-icons/KeyboardArrowDown";
import ArrowUp from "material-ui-icons/KeyboardArrowUp";
import TextField from "material-ui/TextField";
import { Link } from "react-router-dom";

const propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number,
    timestamp: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired,
  onDownVote: PropTypes.func.isRequired,
  onUpVote: PropTypes.func.isRequired,
  showComment: PropTypes.bool
};

const disabledStyle = {
  opacity: "0.3"
};

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    display: "flex"
  }),
  avatar: {
    border: "1px solid #dbdbdb",
    color: "white",
    borderRadius: "50%",
    backgroundColor: "#dbdbdb",
    padding: "5px",
    marginRight: "10px"
  },
  header: {
    display: "flex",
    padding: "20px 0",
    alignItems: "center",
    justifyContent: "space-between"
  },
  category: {
    borderRadius: "0",
    backgroundColor: "#f5f5f5"
  },
  voteScore: {
    textAlign: "center",
    margin: "0 auto"
  },
  voteContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1
  },
  postContainer: {
    flexGrow: 9
  },
  author: {
    display: "flex"
  },
  title: {
    margin: "10px 0"
  },
  body: {
    marginBottom: "40px"
  },
  actions: {
    display: "flex"
  },
  actionButton: {
    border: "2px solid rgba(0, 0, 0, 0.54)"
  },
  deleteButton: {
    color: "red",
    border: "2px solid rgba(255, 0, 0, 0.54)"
  },
  deleteContainer: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end"
  },
  saveButton: {
    color: "green",
    border: "2px solid rgba(0, 255, 0, 0.54)"
  },
  titleInput: {
    fontSize: "24px",
    fontWeight: "400"
  },
  bodyInput: {
    fontSize: "14px",
    fontWeight: "400",
    marginBottom: "40px"
  }
});

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      body: "",
      title: ""
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }
  handleChange = field => event =>
    this.setState({
      [field]: event.target.value
    });

  handleEditClick() {
    const { body, title } = this.props.post;
    this.setState({
      isEditing: true,
      body,
      title
    });
  }

  handleSaveClick() {
    const { post } = this.props;
    const { body, title } = this.state;
    this.props.onEdit(post.id, {
      body,
      title
    });
    this.setState({ isEditing: false });
  }
  render() {
    const {
      post,
      classes,
      onUpVote,
      onDownVote,
      showComment,
      onDelete
    } = this.props;
    const { isEditing } = this.state;
    const style = isEditing ? disabledStyle : {};
    return (
      <Paper className={classes.root} elevation={4}>
        <div className={classes.voteContainer}>
          <IconButton
            className={classes.button}
            disabled={isEditing}
            onClick={onUpVote}
          >
            <ArrowUp />
          </IconButton>
          <h2 className={classes.voteScore} style={style}>
            {post.voteScore}
          </h2>
          <IconButton
            className={classes.button}
            disabled={isEditing}
            onClick={onDownVote}
          >
            <ArrowDown />
          </IconButton>
        </div>
        <div className={classes.postContainer}>
          <div className={classes.header}>
            <div className={classes.author}>
              <PersonIcon className={classes.avatar} style={style} />
              <div>
                <Typography type="body2" component="p" style={style}>
                  {post.author}
                </Typography>
                <Typography type="caption" style={style}>
                  {`Posted on ${new Date(post.timestamp).toDateString()}`}
                </Typography>
              </div>
            </div>
            <Chip
              label={post.category}
              className={classes.category}
              style={style}
            />
          </div>
          {isEditing ? (
            <div>
              <TextField
                value={this.state.title}
                className={classes.titleInput}
                fullWidth
                onChange={this.handleChange("title")}
              />
              <TextField
                value={this.state.body}
                fullWidth
                multiline
                className={classes.bodyInput}
                onChange={this.handleChange("body")}
              />
            </div>
          ) : (
            <div>
              <Link
                to={`/${post.category}/${post.id}`}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  type="headline"
                  component="h3"
                  className={classes.title}
                >
                  {post.title}
                </Typography>
              </Link>
              <Typography type="body1" component="p" className={classes.body}>
                {post.body}
              </Typography>
            </div>
          )}
          {isEditing ? (
            <div className={classes.actions}>
              <div className={classes.deleteContainer}>
                <Button
                  dense
                  className={classes.saveButton}
                  onClick={this.handleSaveClick}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className={classes.actions}>
              <Button
                dense
                className={classes.actionButton}
                onClick={this.handleEditClick}
              >
                Edit
              </Button>
              {showComment &&
                (post.comments.length > 0 ? (
                  <Badge badgeContent={post.comments.length} color="primary">
                    <Link
                      to={`/${post.category}/${post.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        dense
                        className={classes.actionButton}
                        style={{ marginLeft: "10px" }}
                      >
                        Comment
                      </Button>
                    </Link>
                  </Badge>
                ) : (
                  <Link
                    to={`/${post.category}/${post.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      dense
                      className={classes.actionButton}
                      style={{ marginLeft: "10px" }}
                    >
                      Comment
                    </Button>
                  </Link>
                ))}
              <div className={classes.deleteContainer}>
                <Button
                  dense
                  className={classes.deleteButton}
                  onClick={onDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </Paper>
    );
  }
}

Post.propTypes = propTypes;

export default withStyles(styles)(Post);
