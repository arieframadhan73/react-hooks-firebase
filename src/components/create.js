/**
 * @param {this component using React Hooks} props 
 */

import React, { useState } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

function Create(props) {
  const [payload, setPayload] = useState({})
  const onChange = (e) =>{
    e.persist();
    setPayload(data=> ({
      ...data,
      [e.target.name]: e.target.value
    }))
  }
  const onSubmit = (e) =>{
    e.preventDefault();
    firebase.firestore().collection('boards').add(payload).then((docRef) => {
      props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    }); 
  }

  return(
    <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ADD BOARD
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Book List</Link></h4>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label >Title:</label>
                <input type="text" className="form-control" name="title" onChange={onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label >Description:</label>
                <textarea className="form-control" name="description" onChange={onChange} placeholder="Description" cols="80" rows="3" />
              </div>
              <div className="form-group">
                <label >Author:</label>
                <input type="text" className="form-control" name="author" onChange={onChange} placeholder="Author" />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
  )
}
export default Create;
