import React, {Component} from 'react';
import axios from 'axios';

import AddReport from './AddReport';
import ListTodo from './ListReport';
import { Link } from "react-router-dom";
//https://bezkoder.com/react-crud-web-api/
class Todo extends Component {

    state = {
        todos: [],
        currentReport: null,
        currentIndex: -1
    }

    componentDidMount(){
        this.getTodos();
    }

    getTodos = () => {
        axios.get('/api/todos')
            .then(res => {
                if(res.data){
                    this.setState({
                        todos: res.data
                    })
                }
            })
            .catch(err => console.log(err))
    }

    setActiveTutorial = (report, index) => {
        this.setState({
            currentReport: report,
            currentIndex: index
        });
    }
    render() {
        let { todos } = this.state;
        const { currentReport } = this.state;

        return (
            <div>
                <h1>Reports</h1>
                <AddReport getTodos={this.getTodos} selectedId={this.state.selectedId}/>
                <ul>
                    {
                        todos &&
                        todos.length > 0 ?
                            (
                                todos.map( (todo, index) => (
                                    <li key={todo._id} onClick={()=>this.setActiveTutorial(todo, index)}>
                                        <h2> {todo.studentId} </h2>
                                        <small> {todo.recommendation} </small>
                                    </li>
                                    )
                                )
                            )
                            :
                            (
                                <li>No todo(s) left</li>
                            )
                    }
                </ul>
                {currentReport ? (
                    <div>
                        <h4>Tutorial</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentReport.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentReport.description}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentReport.published ? "Published" : "Pending"}
                        </div>

                        <Link
                            to={"/tutorials/" + currentReport.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>)
                    : (
                        <div>
                            <br />
                            <p>Please click on a Report...</p>
                        </div>
                    )}

                <button
                    onClick={this.deleteTutorial}
                >
                    Delete
                </button>

                <button
                    type="submit"
                    onClick={this.updateTutorial}
                >
                    Update
                </button>
                <p>{this.state.message}</p>
        </div>)
    }


//return(
//<div>
//<h1>Reports</h1>
//<AddReport getTodos={this.getTodos} selectedId={this.state.selectedId}/>
//<ListTodo todos={todos} editReport={this.editReport} />
//</div>
//)
    updatePublished(status) {
        const data = {
            id: this.state.currentTutorial.id,
            title: this.state.currentTutorial.title,
            description: this.state.currentTutorial.description,
            published: status
        };

        axios.put(this.state.currentTutorial.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentTutorial: {
                        ...prevState.currentTutorial,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateTutorial = () => {
        axios.put(
            this.state.currentId
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The tutorial was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteTutorial = () => {
        axios.delete(this.state.currentId)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/tutorials')
            })
            .catch(e => {
                console.log(e);
            });
    }
}

export default Todo;