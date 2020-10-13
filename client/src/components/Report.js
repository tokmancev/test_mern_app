//https://bezkoder.com/react-crud-web-api/
//https://levelup.gitconnected.com/displaying-pdf-in-react-app-6e9d1fffa1a9

import React, { Component } from "react";
import axios from "axios";
import './report.css';
import {Document, Page, pdfjs} from 'react-pdf';
import sample from './test.pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Report extends Component {


    state = {
        currentReport: {
            id: null,
            studentId: "",
            recommendation: ""
        },
        numPages: null,
        pageNumber : 1 //setting 1 to show fisrt page
    };

    setNumPages = (numPages) => {
        this.setState({numPages: numPages})
    }
    setPageNumber = (pageNumber) => {
        this.setState({pageNumber: pageNumber})
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setNumPages(numPages);
        this.setPageNumber(1);
    }

    previousPage = () => {
        this.setPageNumber(this.state.pageNumber-1);
    }

    nextPage = () => {
        this.setPageNumber(this.state.pageNumber+1);
    }


    componentDidMount() {
        axios.get('/api/reports/'+ this.props.match.params.id)
            .then(res => {
                this.setState({
                    currentReport: res.data
                });
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    updatePublished = (status) => {
        const data = {
            id: this.state.currentReport.id,
            description: this.state.currentReport.recommendation,
            published: status
        };

        axios.put(this.state.currentReport.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentReport: {
                        ...prevState.currentReport,
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
            `/api/reports/${this.state.currentReport._id}`,
            this.state.currentReport
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "Отчет успешно обновлен!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteTutorial = () => {
        axios.delete(`/api/reports/${this.state.currentReport._id}`)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/reports')
            })
            .catch(e => {
                console.log(e);
            });
    }

    onChangeDescription = (e) => {
        const recommendation = e.target.value;

        this.setState(prevState => ({
            currentReport: {
                ...prevState.currentReport,
                recommendation: recommendation
            }
        }));
    }

    onChangeTitle = (e) => {
        const studentId = e.target.value;

        this.setState(function(prevState) {
            return {
                currentReport: {
                    ...prevState.currentReport,
                    studentId: studentId
                }
            };
        });
    }

    render() {
        const { currentReport } = this.state;

        return (
            <div>
                <Document file={sample} onLoadSuccess={this.onDocumentLoadSuccess}>
                    <Page pageNumber={this.state.pageNumber} />
                </Document>
                <div>
                    <p>
                        Page {this.state.pageNumber
                            || (this.state.numPages ? 1 : "--")} of {this.state.numPages || "--"}
                    </p>
                    <button
                        type="button"
                        disabled={this.state.pageNumber <= 1}
                        onClick={this.previousPage}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        disabled={this.state.pageNumber >= this.state.numPages}
                        onClick={this.nextPage}
                    >
                        Next
                    </button>
                </div>


                {currentReport ? (
                    <div className="edit-form">
                        <h4>Рекомендации</h4>

                        <small> {currentReport.recommendation} </small>

                        <form id="report_edit_form">
                            <div className="form-group">
                                <label htmlFor="title">Студент</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentReport.studentId}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Описание</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentReport.recommendation}
                                    onChange={this.onChangeDescription}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Статус:</strong>
                                </label>
                                {currentReport.published ? "Опубликован" : "Ожидает"}
                            </div>



                            <div className="form-group">
                                <label htmlFor="description">Рекомендации</label>
                                <p><textarea
                                    form = "report_edit_form"
                                    wrap="soft"
                                    value={currentReport.recommendation}
                                    onChange={this.onChangeDescription}
                                >
                                </textarea></p>
                            </div>
                        </form>

                        {currentReport.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(false)}
                            >
                                Неопубликовано
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(true)}
                            >
                                Публиковать
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteTutorial}
                        >
                            Удалить
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateTutorial}
                        >
                            Обновить
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Выберите отчет...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default Report

//<Document file={sample} onLoadError={(error) => alert('Error while loading document! ' + error.message)} onLoadSuccess={(pdf) => alert('Loaded a file with ' + pdf.numPages + ' pages!')}/>;