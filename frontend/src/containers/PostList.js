import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from '../components/Post';
import { fetchPosts, upVote, downVote } from '../actions/post';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';

const sortFunction = (field) => (direction) => {
    if (direction === 'asc') {
        return (a, b) => a[field] - b[field];
    }
    return (a, b) => b[field] - a[field];
}
class PostList extends Component {
    state = {
        anchorEl: null,
        open: false,
    };

    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        const currentCategory = this.props.match.params.category;
        this.props.fetchPosts(currentCategory);
    }
    componentWillReceiveProps(nextProps) {
        const nextCategory = nextProps.match.params.category;
        const currentCategory = this.props.match.params.category;

        if (nextCategory !== currentCategory) {
            this.props.fetchPosts(nextCategory);
        }
    }
    render() {
        const { posts, upVote, downVote } = this.props;
        return (
            <main className="container">
                <div className="sortmenu">
                    <Button
                        dense
                        aria-owns={this.state.open ? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        SORT BY
                </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={this.state.open}
                        onRequestClose={this.handleRequestClose}
                    >
                        <MenuItem onClick={this.handleRequestClose}>Vote Ascending</MenuItem>
                        <MenuItem onClick={this.handleRequestClose}>Vote Descending</MenuItem>
                        <MenuItem onClick={this.handleRequestClose}>Date Ascending</MenuItem>
                        <MenuItem onClick={this.handleRequestClose}>Date Descending</MenuItem>
                    </Menu>
                </div>
                <section className="posts">
                    {
                        posts && posts.map(post => (
                            <Post
                                key={post.id}
                                post={post}
                                showComment
                                onUpVote={() => upVote(post.id)}
                                onDownVote={() => downVote(post.id)}
                            />)
                        )
                    }
                </section>
            </main>
        );
    }
}
PostList.propTypes = {
    posts: PropTypes.array.isRequired,
};

const mapStateToProps = ({ posts }) => {
    return {
        posts: posts.data,
    };
}

const mapDispatchToProps = {
    fetchPosts,
    upVote,
    downVote,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);