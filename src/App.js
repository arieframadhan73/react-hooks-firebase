/**
 * @param {this component using React Hooks} props
 */

import React, { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import firebase from "./Firebase";

const fetch = firebase.firestore().collection("boards");

function App(props) {
  const [boards, setBoard] = useState([]);

  useEffect(() => {
    const unsubScribe = fetch.onSnapshot(a => {
      const board = [];
      a.forEach(doc => {
        board.push({
          key: doc.id,
          doc,
          title: doc.data().title,
          author: doc.data().author,
          description: doc.data().description
        });
      });
      setBoard(board);
    });

    return () => {
      unsubScribe();
    };
  }, []);

  useEffect(() => {
    fetch.get().then(a => {
      const board = [];
      a.forEach(doc => {
        board.push({
          key: doc.id,
          doc,
          title: doc.data().title,
          author: doc.data().author,
          description: doc.data().description
        });
      });
      setBoard(board);
    });
  }, []);

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">BOARD LIST</h3>
        </div>
        <div className="panel-body">
          <h4>
            <Link to="/create">Add Board</Link>
          </h4>
          <table className="table table-stripe">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {boards.map(data => (
                <tr key={Math.random()}>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{data.author}</td>
                  <td>
                    <Link to={`/show/${data.key}`}>
                      <button type="submit" className="btn btn-primary">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

/**
 *
 * @param {This component using Stateful Component} props
 */

// class App extends Component {
//     constructor(props) {
//       super(props)
//       this.ref = firebase.firestore().collection('boards')
//       this.unsubscribe = null;
//       this.state ={
//         boards:[]
//       }
//     }

//   onCollectionUpdate = (querySnapshot) => {
//   const boards = [];
//   querySnapshot.forEach((doc) => {
//     const { title, description, author } = doc.data();
//     boards.push({
//       key: doc.id,
//       doc, // DocumentSnapshot
//       title,
//       description,
//       author,
//     });
//   });
//   this.setState({
//     boards
//  });
// }

//   componentDidMount(){
//     this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
//   }

//     render(){
//       return(
//   <div className="container">
//   <div className="panel panel-default">
//     <div className="panel-heading">
//       <h3 className="panel-title">
//         BOARD LIST
//       </h3>
//     </div>
//     <div className="panel-body">
//       <h4><Link to="/create">Add Board</Link></h4>
//       <table className="table table-stripe">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Author</th>
//           </tr>
//         </thead>
//         <tbody>
//           {this.state.boards.map(board =>
//             <tr key={Math.random()}>
//               <td><Link to={`/show/${board.key}`}>{board.title}</Link></td>
//               <td>{board.description}</td>
//               <td>{board.author}</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>
//       )
//     }
// }

//export default App;
