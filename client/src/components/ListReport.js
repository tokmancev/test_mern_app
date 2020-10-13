import React, {Component} from 'react';
<<<<<<< HEAD
import { Link } from "react-router-dom";
import axios from "axios";

=======
//import {Document, pdfjs} from 'react-pdf';
//import sample from './sample.pdf';
import { Link } from "react-router-dom";
import axios from "axios";

//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

>>>>>>> 80be9ad7ad77aa9f7c1a839a010bd09fadfc7ccd
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
<<<<<<< HEAD
                <h1>Отчеты по проектам</h1>
=======
                <h1>Reports</h1>
>>>>>>> 80be9ad7ad77aa9f7c1a839a010bd09fadfc7ccd

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
<<<<<<< HEAD
                                <li>Нет отчетов</li>
=======
                                <li>No report(s) left</li>
>>>>>>> 80be9ad7ad77aa9f7c1a839a010bd09fadfc7ccd
                            )
                    }
                </ul>
                {currentReport ? (
                        <div>
<<<<<<< HEAD
                            <h4>Отчет</h4>
                            <div>
                                <label>
                                    <strong>Заголовок:</strong>
=======
                            <h4>Tutorial</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
>>>>>>> 80be9ad7ad77aa9f7c1a839a010bd09fadfc7ccd
                                </label>{" "}
                                {currentReport.title}
                            </div>
                            <div>
                                <label>
<<<<<<< HEAD
                                    <strong>Описание:</strong>
=======
                                    <strong>Description:</strong>
>>>>>>> 80be9ad7ad77aa9f7c1a839a010bd09fadfc7ccd
                                </label>{" "}
                                {currentReport.description}
                            </div>
                            <div>
                                <label>
<<<<<<< HEAD
                                    <strong>Статус:</strong>
                                </label>{" "}
                                {currentReport.published ? "Опубликован" : "Ожидает"}
=======
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentReport.published ? "Published" : "Pending"}
>>>>>>> 80be9ad7ad77aa9f7c1a839a010bd09fadfc7ccd
                            </div>

                            <Link
                                to={"/reports/" + currentReport._id}
                                className="badge badge-warning"
                            >
<<<<<<< HEAD
                                Редактировать
=======
                                Edit
>>>>>>> 80be9ad7ad77aa9f7c1a839a010bd09fadfc7ccd
                            </Link>
                        </div>)
                    : (
                        <div>
                            <br />
<<<<<<< HEAD
                            <p>Выберите отчет...</p>
=======
                            <p>Please click on a Report...</p>
>>>>>>> 80be9ad7ad77aa9f7c1a839a010bd09fadfc7ccd
                        </div>
                    )}

            </div>)
    }
<<<<<<< HEAD
}

=======

}
//<Document file={sample} onLoadError={(error) => alert('Error while loading document! ' + error.message)} onLoadSuccess={(pdf) => alert('Loaded a file with ' + pdf.numPages + ' pages!')}/>;
>>>>>>> 80be9ad7ad77aa9f7c1a839a010bd09fadfc7ccd
export default ListReport