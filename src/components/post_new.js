import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions/index'


class PostNew extends Component{
  renderFieldTitle(field){
    const {meta} = field;
    const className = `form-group ${meta.touched && meta.error ? 'has-danger': ''}`
    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />

          <div className="text-help">
            {meta.touched ? meta.error : ''}
          </div>
      </div>
    )
  }
  onSubmit(values){
    console.log(values);
    this.props.createPost(values,() =>{
      this.props.history.push('/')
    });
  }
  render(){
    const {handleSubmit} = this.props;
    return(
      <form  onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="title"
          label="Title"
           component={this.renderFieldTitle}
         />
         <Field name="categories"
           label="Categories"
            component={this.renderFieldTitle}
          />
          <Field name="content"
            label="Post Content"
             component={this.renderFieldTitle}
           />
           <button type="submit" className="btn btn-primary">Submit</button>
           <Link to="/" className="btn btn-danger" >Cancel</Link>
      </form>
    )
  }
}
function validate(values){ // values of form
  const error = {}
  if(!values.title)
    error.title = "Please Enter the Title";

  if(!values.categories)
    error.categories = "Please Enter some categories";

  if(!values.content)
    error.content = "Please Enter Content"
  return error;

}

export default reduxForm({
  validate,
  form:'PostNewForm'
})(
  connect(null,{createPost})(PostNew)
);
