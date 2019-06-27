import React, { Component } from 'react';

class SelectFromListField extends Component {
    state = { 
        hintsList: [],
        inputValue: "",
        fieldFocused: false
     }     

    optionsFromList(event) {
        let newHintsList = [];
        for (let i = 0; i < this.props.list.length; i++) {
            if(this.props.list[i].toLowerCase().includes(event.target.value.toLowerCase()))
                newHintsList.push(this.props.list[i]);
            if(newHintsList.length >= 5) break;
        }
        this.setState({
            hintsList: newHintsList,
            inputValue: event.target.value
        });
    }

    selectOption(optionValue) {
        this.setState({inputValue: optionValue});
    }

    render() { 
        this.props.valueChanger(this.state.inputValue);
        let hints = [];

        if(this.state.fieldFocused)
            this.state.hintsList.forEach((h,i) => {
                hints.push(<div key={i} className="option" onClick={() => {this.selectOption(h)}} >{h}</div>);
            });

        return ( 
            <div className="SelectFromListField"
            onFocus={() => {this.setState({fieldFocused: true})}}
            onBlur={() => setTimeout(() => {this.setState({ fieldFocused: false})}, 200)}>
                <input 
                value={this.state.inputValue}
                onChange={(ev) => {this.optionsFromList(ev)}} 
                 />
                <div className="options">
                    {hints}
                </div>
            </div>
         );
    }
}
 
export default SelectFromListField;