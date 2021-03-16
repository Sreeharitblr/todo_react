import React from "react";

class Todo extends React.Component {
    constructor(props) {
        super();
        this.state = {
            value: "dsfds",
            todoArray: []
        };
    }

    // addTodo = (context) => {
    //     const divId = document.getElementById('inputdiv');
    //     var text = document.createElement("input");
    //     text.type = "text";
    //     text.className = "InputField"
    //     divId.appendChild(text)
    // }

    add() {
        let txtValue = document.getElementById("input text").value;
        document.getElementById("input text").value = "";
        //this.setState({todoArray :  this.state.todoArray.concat([txtValue])});
        console.log(txtValue);
        let todoobj = {
            id: this.state.todoArray.length,
            txtValue: txtValue
        }
        this.setState(prevState => ({
            todoArray: [...prevState.todoArray, todoobj]
        }))

        localStorage.setItem('key', JSON.stringify(this.state.todoArray))
    }
    delTodo(delBtnId, indextbl) {

        let index = this.state.todoArray.findIndex(x => x.id === delBtnId);

        if (index > -1) {
            this.state.todoArray.splice(index, 1);
        }
        console.log(this.state.todoArray);

        var tabl = document.getElementById("todos-list");
        tabl.deleteRow(indextbl); 
        let temp = this.state.todoArray;
        localStorage.clear();
        localStorage.setItem('key', JSON.stringify(temp))

    }
    cmpTodo(cmpBtnId) {
        console.log(cmpBtnId);
        document.getElementById("txt_" + cmpBtnId).disabled = true;
    }
    changeTodo(e, index) {
        let indexOFele = this.state.todoArray.findIndex(x => x.id === index);
        // console.log("------------------------------------", this.state.todoArray[indexOFele].txtValue);
        this.state.todoArray[indexOFele].txtValue = document.getElementById("txt_" + index).value;
        //console.log("///////////////////////////////////", this.state.todoArray[indexOFele].txtValue);

    }
    renderTable() {

        let localArr = JSON.parse(localStorage.getItem('key'));
        console.log("1111111111111111l",localArr)
        //this.state.todoArray = [...localArr];

    }

    render() {
        return (
            <div className="CssStyle">
                <input key="yxy" type="text" id="input text" className="InputField" />

                <input
                    id="btn_add"
                    type="submit"
                    value="ADD"
                    className="Btn_add"
                    onClick={
                        () => this.add()
                    }
                />
                {window.onload = this.renderTable}

                <div className="CssStyleTable" id="inputdiv">
                    {console.log("zddvxcvxcxcvxcvxc", this.state.todoArray)}

                    <table id="todos-list" style={{ width: "100%" }}>
                        {this.state.todoArray.map((element, index) => {
                            //return <li style={{ color: "black" }} key={element}>{element}</li>
                            return (<tbody><tr id={index}>
                                <td style={{ width: "100%" }}>
                                    <input type="text" key={"txt_" + element.id} id={"txt_" + element.id} className="InputFieldTbl" defaultValue={element.txtValue} onBlur={(e) => { this.changeTodo(e, element.id) }} />
                                </td>
                                <td >
                                    <button key={"btn_delete_" + element.id} id={"btn_delete_" + element.id} className="Btn_add" onClick={() => this.delTodo(element.id, index)}>delete</button>
                                </td>
                                <td >
                                    <button key={"btn_completed_" + element.id} id={"btn_completed_" + element.id} className="Btn_add" onClick={() => this.cmpTodo(element.id)}>completed</button>
                                </td>
                            </tr></tbody>);
                        })}
                    </table>
                </div>

            </div>
        );
    }

}

export default Todo;