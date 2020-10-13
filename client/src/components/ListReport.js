import React, {Component} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

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
                <h1>Отчеты по проектам</h1>

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
                                <li>Нет отчетов</li>
                            )
                    }
                </ul>
                {currentReport ? (
                        <div>
                            <h4>Отчет</h4>
                            <div>
                                <label>
                                    <strong>Заголовок:</strong>
                                </label>{" "}
                                {currentReport.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Описание:</strong>
                                </label>{" "}
                                {currentReport.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Статус:</strong>
                                </label>{" "}
                                {currentReport.published ? "Опубликован" : "Ожидает"}
                            </div>

                            <Link
                                to={"/reports/" + currentReport._id}
                                className="badge badge-warning"
                            >
                                Редактировать
                            </Link>
                        </div>)
                    : (
                        <div>
                            <br />
                            <p>Выберите отчет...</p>
                        </div>
                    )}

            </div>)
    }
}

export default ListReport