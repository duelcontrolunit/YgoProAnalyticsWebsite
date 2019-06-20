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
            if(this.props.list[i].toLowerCase().includes(event.target.value))
                newHintsList.push(this.props.list[i]);
            if(newHintsList.length >= 5) break;
            
        }

        this.setState({
            hintsList: newHintsList,
            inputValue: event.target.value
        });

    }

    selectOption(optionValue) {
        console.log(optionValue);
        this.setState({inputValue: optionValue});
    }

    render() { 
        let hints = [];

        if(this.state.fieldFocused)
            this.state.hintsList.forEach((h,i) => {
                hints.push(<div key={i} className="option" onClick={() => {this.selectOption(h)}} >{h}</div>);
            });

        return ( 
            <div className="SelectFromListField"
            onChange={(ev) => {this.optionsFromList(ev)}} 
            onFocus={() => {this.setState({fieldFocused: true})}}
            onBlur={() => setTimeout(() => {this.setState({ fieldFocused: false})}, 200)}>
                <input value={this.state.inputValue} />
                <div className="options">
                    {hints}
                </div>
            </div>
         );
    }
}
 
export default SelectFromListField;