import React, { Component } from 'react';
import axios from 'axios';


class Input extends Component {

    state = {
        studentId: "",
        recommendation: ""
    }

    addTodo = () => {
        const newId = {
            selectedId: this.props.selectedId,
            studentId: this.state.studentId,
            pathToReport: "test.pdf",
            recommendation: this.state.recommendation
        }

        if(newId.studentId && newId.studentId.length > 0){
            if(this.props.selectedId && this.props.selectedId > 0){
                axios.put('/api/todos', newId)
                    .then(res => {
                        if (res.data) {
                            this.props.getTodos();
                            this.setState({studentId: "", recommendation: ""})
                        }
                    })
                    .catch(err => console.log(err))
            }
            else {
                axios.post('/api/todos', newId)
                    .then(res => {
                        if (res.data) {
                            this.props.getTodos();
                            this.setState({studentId: "", recommendation: ""})
                        }
                    })
                    .catch(err => console.log(err))
            }
        }else {
            console.log('input field required')
        }
    }

    handleChange = (e) => {
        this.setState({
            studentId: e.target.value
        })
    }

    showFile = async (e) => {
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

    render() {
        let { newId } = this.state;
        return (
            <div>
                <input type="text" onChange={this.handleChange} value={newId} />
                <button onClick={this.addTodo}>add new Id</button>

                <input type="file" onChange={(e) => this.showFile(e)} accept="text/plain
"/>
            </div>
        )
    }
}
export default Input