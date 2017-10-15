import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import PostList from './containers/PostList';
import NewPost from './containers/NewPost';
import { fetchCategories } from './actions/category';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    this.props.fetchCategories();
  }
  render() {
    const { categories } = this.props;
    return (
      <div className="App">
        <Header categories={categories} />
        <Switch>
          <Route path="/new" component={NewPost} />
          <Route path="/:category?" component={PostList} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories: categories.data,
  };
}

const mapDispatchToProps = {
  fetchCategories,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
