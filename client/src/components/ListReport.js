import React, {Component} from 'react';
//import {Document, pdfjs} from 'react-pdf';
//import sample from './sample.pdf';
import { Link } from "react-router-dom";
import axios from "axios";

//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class ListReport extends Component{
    state = {
        todos: [],
        currentReport: null,
        currentIndex: -1
    }
    componentDidMount(){
        this.getTodos();
    }

    getTodos = () => {
        axios.get('/api/reports')
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

                <ul>
                    {
                        todos &&
                        todos.length > 0 ?
                            (
                                todos.map( (todo, index) => (
                                        <li key={todo._id} onClick={()=>this.setActiveTutorial(todo, index)}>
                                            <h2> {todo.studentId} </h2>
                                        </li>
                                    )
                                )
                            )
                            :
                            (
                                <li>No report(s) left</li>
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
                                to={"/reports/" + currentReport._id}
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

            </div>)
    }

}
//<Document file={sample} onLoadError={(error) => alert('Error while loading document! ' + error.message)} onLoadSuccess={(pdf) => alert('Loaded a file with ' + pdf.numPages + ' pages!')}/>;
export default ListReport