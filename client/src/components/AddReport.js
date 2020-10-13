import React, { Component } from 'react';
import axios from 'axios';


class AddReport extends Component {

    state = {
        studentId: "",
        recommendation: "",
        submitted: false
    }

    onChangeId = (e) => {
        this.setState({
            studentId: e.target.value
        });
    }

    addReport = () => {
        const newId = {
            studentId: this.state.studentId,
            pathToReport: "test.pdf",
            recommendation: this.state.recommendation
        }

        if(newId.studentId && newId.studentId.length > 0){
            axios.post('/api/reports', newId)
                .then(res => {
                    if (res.data) {
                        this.setState({
                            studentId: res.data.studentId,
                            recommendation: res.data.recommendation,
                            submitted: true
                        })
                    }
                })
                .catch(err => console.log(err))

        }else {
            console.log('input field required')
        }
    }

    onChangeRecommendation = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            this.setState({
                recommendation: text
            })
        };
        reader.readAsText(e.target.files[0])
    }

    newReport = () =>{
        this.setState = {
            studentId: "",
            recommendation: "",
            submitted: false
        }
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newReport}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.studentId}
                                onChange={this.onChangeId}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Recommendations</label>
                            <input
                                type="file"
                                onChange={(e) => this.onChangeRecommendation(e)}
                                accept="text/plain"
                            />
                        </div>

                        <button onClick={this.addReport} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
export default AddReport