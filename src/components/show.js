/**
 * @param {this component using react hooks}
 */

import React, { useState, useEffect } from 'react'
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

function Show(props) {
  
  const [key] = useState(props.match.params.id);
  const [board, setBoard] = useState({});

  useEffect(()=>{
      const ref = firebase.firestore().collection('boards').doc(key);
      ref.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setBoard(data);
        } else {
          console.log("No such document!");
        }
      });

  },[key, props.match.params.id])

    function deletes(id){
      firebase.firestore().collection('boards').doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
        props.history.push("/")
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }

  return(
    <div className="container">
    <div className="panel panel-default">
      <div className="panel-heading">
      <h4><Link to="/">Board List</Link></h4>
        <h3 className="panel-title">
          {board.title}
        </h3>
      </div>
      <div className="panel-body">
        <dl>
          <dt>Description:</dt>
          <dd>{board.description}</dd>
          <dt>Author:</dt>
          <dd>{board.author}</dd>
        </dl>
        <Link to={`/edit/${key}`} className="btn btn-success">Edit</Link>&nbsp;
        <button onClick={()=>deletes(key)} className="btn btn-danger">Delete</button>
      </div>
    </div>
  </div> 
  )
}

export default Show;
