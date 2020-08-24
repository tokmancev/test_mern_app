import React, { Component } from 'react';
import axios from 'axios';


class Input extends Component {

    state = {
        studentId: "",
        text: ""
    }

    addTodo = () => {
        const newId = {action: "action", studentId: this.state.studentId, pathToReport: "test.pdf"}

        if(newId.studentId && newId.studentId.length > 0){
            axios.post('/api/todos', newId)
                .then(res => {
                    if(res.data){
                        this.props.getTodos();
                        this.setState({studentId: ""})
                    }
                })
                .catch(err => console.log(err))
        }else {
            console.log('input field required')
        }
    }

    handleChange = (e) => {
        this.setState({
            studentId: e.target.value
        })
    }



    render() {
        let { newId } = this.state;
        return (
            <div>
                <input type="text" onChange={this.handleChange} value={newId} />
                <button onClick={this.addTodo}>add new Id</button>
            </div>
        )
    }
}

export default Input