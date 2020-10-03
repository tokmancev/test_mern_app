import React, { Component } from "react";
import axios from "axios";


class Report extends Component {
    state = {
        currentReport: {
            id: null,
            studentId: "",
            recommendation: ""
        }
    };

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
            `/api/reports/${this.state.currentReport._id}`,
            this.state.currentReport
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
        const description = e.target.value;

        this.setState(prevState => ({
            currentTutorial: {
                ...prevState.currentReport,
                description: description
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
                {currentReport ? (
                    <div className="edit-form">
                        <h4>Tutorial</h4>

                        <small> {currentReport.recommendation} </small>

                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentReport.studentId}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
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
                                    <strong>Status:</strong>
                                </label>
                                {currentReport.published ? "Published" : "Pending"}
                            </div>
                        </form>

                        {currentReport.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(false)}
                            >
                                UnPublish
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(true)}
                            >
                                Publish
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteTutorial}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateTutorial}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Tutorial...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default Report