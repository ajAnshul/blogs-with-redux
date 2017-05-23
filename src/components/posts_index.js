import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Link}  from 'react-router-dom';
import {fetchPosts} from '../actions/';


class PostIndex extends Component{

  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log("-------------");
    this.props.fetchPosts();
  }

  renderPosts(){
    return _.map(this.props.posts,post => {
      return (
        <Link to={`posts/${post.id}`} key={post.id} >
          <li className="list-group-item" >
            {post.title}
          </li>
        </Link>
      )
    })
  }

  render(){
    console.log(this.props.posts);
    return(
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h2>Posts</h2>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}


function mapStateProps(state){
  return {posts:state.posts}
}


export default connect(mapStateProps, {fetchPosts})(PostIndex);
