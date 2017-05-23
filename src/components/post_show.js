import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link } from 'react-router-dom';
import {fetchPost, deletePost} from '../actions';

class PostsShow extends Component{

  componentDidMount(){
   if(!this.props.post){
     const id = this.props.match.params.id;
     this.props.fetchPost(id);
   }

  }
  onDelete(){
    const id = this.props.match.params.id;
    this.props.deletePost(id,() =>{
      this.props.history.push("/")
    });

  }
  render(){
    const {post} = this.props;
    if(!post){
      return <div> Loading ... </div>
    }
    return(
      <div>
        <Link to="/">Back to Index page</Link>
        <button className="btn btn-danger pull-xs-right" onClick={this.onDelete.bind(this)}>
          Delete the Post
          </button>
        <h2>{post.title}</h2>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>

    )
  }
}

function mapStateProps({posts},ownProps){
  return {post : posts[ownProps.match.params.id]};
}

export default connect(mapStateProps, {fetchPost,deletePost})(PostsShow);
