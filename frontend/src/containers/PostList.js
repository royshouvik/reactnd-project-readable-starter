import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from '../components/Post';
import SortMenu, { sortKey } from '../components/SortMenu';
import { fetchPosts, upVote, downVote, editPost, deletePost } from '../actions/post';

const getSortFunction = (sort) => {
    const sortFunction = (field) => (direction) => {
        if (direction === 'asc') {
            return (a, b) => a[field] - b[field];
        }
        return (a, b) => b[field] - a[field];
    };
    switch(sort) {
        case sortKey.VOTE_ASCENDING:
            return sortFunction('voteScore')('asc');
        case sortKey.VOTE_DESCENDING:
            return sortFunction('voteScore')('des');
        case sortKey.DATE_ASCENDING:
            return sortFunction('timestamp')('asc');
        case sortKey.DATE_DESCENDING:
            return sortFunction('timestamp')('des');
        default:
            return sortFunction('voteScore')('asc');
    }
}
class PostList extends Component {
    state = {
        anchorEl: null,
        sortMenuOpen: false,
        sortKey: null,
    };

    handleSortOpen = event => {
        this.setState({ sortMenuOpen: true, anchorEl: event.currentTarget });
    };

    handleSortClose = (sortKey) => {
        if (sortKey) {
            this.setState({ sortKey });
        }
        this.setState({ sortMenuOpen: false });
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
        const { posts, upVote, downVote, editPost, deletePost } = this.props;
        const sortFunction = getSortFunction(this.state.sortKey);
        const sortedPost = [...posts].sort(sortFunction);
        return (
            <main className="container">
                <SortMenu
                    handleClick={this.handleSortOpen}
                    handleRequestClose={this.handleSortClose}
                    isOpen={this.state.sortMenuOpen}
                    anchorEl={this.state.anchorEl}
                />
                <section className="posts">
                    {
                        sortedPost && sortedPost.map(post => (
                            <Post
                                key={post.id}
                                post={post}
                                onEdit={editPost}
                                showComment
                                onDelete={() => deletePost(post.id)}
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
    editPost,
    deletePost,
    upVote,
    downVote,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);