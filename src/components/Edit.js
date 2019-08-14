import React, { useState, useEffect } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

function Edit(props) {
  const [key, setKey] = useState(props.match.params.id);
  const [payload, setPayload] = useState({});

  useEffect(()=>{
    const fetch = firebase.firestore().collection('boards').doc(key);
    fetch.get().then((doc) => {
        if (doc.exists) {
          const board = doc.data();
          setPayload(board);
          setKey(doc.id)
        } else {
          console.log("No such document!");
        }
    });
  },[key])

  const onChange = (e) =>{
    e.persist();
    setPayload(data=> ({
      ...data,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    const updateRef = firebase.firestore().collection('boards').doc(key);
    updateRef.set(payload).then((docRef) => {
      props.history.push("/show/"+key)
    })
    .catch((error) => {
      alert("Please check!");
    });
  }

  return(
    <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              EDIT BOARD
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to={`/show/${key}`} className="btn btn-primary">Board List</Link></h4>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label >Title:</label>
                <input type="text" className="form-control" name="title" value={payload.title ||''} onChange={onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label >Description:</label>
                <input type="text" className="form-control" name="description" value={payload.description || ''} onChange={onChange} placeholder="Description" />
              </div>
              <div className="form-group">
                <label >Author:</label>
                <input type="text" className="form-control" name="author" value={payload.author || ''} onChange={onChange} placeholder="Author" />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Edit;


/**
 * 
 * @param {this component using Stateful Component}
 */

// class Edit extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       key: '',
//       title: '',
//       description: '',
//       author: ''
//     };
//   }

//   componentDidMount() {
//     const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
//     ref.get().then((doc) => {
//       if (doc.exists) {
//         const board = doc.data();
//         this.setState({
//           key: doc.id,
//           title: board.title,
//           description: board.description,
//           author: board.author
//         });
//       } else {
//         console.log("No such document!");
//       }
//     });
//   }

//   onChange = (e) => {
//     const state = this.state
//     state[e.target.name] = e.target.value;
//     this.setState({board:state});
//   }

//   onSubmit = (e) => {
//     e.preventDefault();

//     const { title, description, author } = this.state;

//     const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
//     updateRef.set({
//       title,
//       description,
//       author
//     }).then((docRef) => {
//       this.setState({
//         key: '',
//         title: '',
//         description: '',
//         author: ''
//       });
//       this.props.history.push("/show/"+this.props.match.params.id)
//     })
//     .catch((error) => {
//       console.error("Error adding document: ", error);
//     });
//   }

//   render() {
//     return (
      // <div class="container">
      //   <div class="panel panel-default">
      //     <div class="panel-heading">
      //       <h3 class="panel-title">
      //         EDIT BOARD
      //       </h3>
      //     </div>
      //     <div class="panel-body">
      //       <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Board List</Link></h4>
      //       <form onSubmit={this.onSubmit}>
      //         <div class="form-group">
      //           <label for="title">Title:</label>
      //           <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
      //         </div>
      //         <div class="form-group">
      //           <label for="description">Description:</label>
      //           <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
      //         </div>
      //         <div class="form-group">
      //           <label for="author">Author:</label>
      //           <input type="text" class="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author" />
      //         </div>
      //         <button type="submit" class="btn btn-success">Submit</button>
      //       </form>
      //     </div>
      //   </div>
      // </div>
//     );
//   }
// }

// export default Edit;