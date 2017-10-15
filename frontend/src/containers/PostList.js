import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from '../components/Post';
import { fetchPosts } from '../actions/post';

class PostList extends Component {

    componentDidMount() {
        const currentCategory = this.props.match.params.category;
        this.props.fetchPosts(currentCategory);
    }
    componentWillReceiveProps(nextProps) {
        const  nextCategory = nextProps.match.params.category;
        const currentCategory = this.props.match.params.category;

        if (nextCategory !== currentCategory) {
            this.props.fetchPosts(nextCategory);
        }
    }
    render() {
        const { posts } = this.props;
        return (
            <main className="container">
                <section className="posts">
                    {
                        posts && posts.map(post => <Post key={post.id} post={post} />)
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
  }

export default connect(mapStateToProps, mapDispatchToProps)(PostList);