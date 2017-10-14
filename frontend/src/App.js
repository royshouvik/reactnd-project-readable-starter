import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from './components/Header';
import CategoryList from './components/CategoryList';
import Post from './components/Post';
import { fetchCategories } from './actions/category';
import './App.css';

const categories = [
  {
      "name": "react",
      "path": "react"
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

const post = {
  "id": "6ni6ok3ym7mf1p33lnez",
  "timestamp": 1468479767190,
  "title": "Learn Redux in 10 minutes!",
  "body": "Just kidding. It takes more than 10 minutes to learn technology.",
  "author": "thingone",
  "category": "redux",
  "voteScore": -5,
  "deleted": false
};


class App extends Component {

  componentDidMount() {
    this.props.fetchCategories();
  }
  render() {
    return (
      <div className="App">
       <Header />
       <main className="container">
          <section className="posts">
            <Post post={post} />
            <Post post={post} />
          </section>
       </main>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories,
  };
}

const mapDispatchToProps = {
  fetchCategories,
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
