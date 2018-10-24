import React from 'react'
import ReactDOM from 'react-dom'
import Searchdropdown from '../index.jsx'

import './react-searchdropdown.css'

class SearchdropdownTest extends React.Component {

	constructor(props) {
		super(props)
		this.state = {selected: null}
	}

	render(){
		return <span>
			<small>Controlled</small>
			<Searchdropdown 
				options={[{label: "Value 1", value: "Value 1"},
						  {label: "Value 2", value: "Value 2"},
						  {label: "Value 3", value: "Value 3"}]}
				value={this.state.selectedValue}
				onChange={v => this.setState({selectedValue: v.value})}
				clearable={true}
			/>

			<br/>

			<small>Uncontrolled</small>
			<Searchdropdown 
				options={[{label: "Value 1", value: "Value 1"},
						  {label: "Value 2", value: "Value 2"},
						  {label: "Value 3", value: "Value 3"}]}
			/>
		</span>
		
		
	}

}

ReactDOM.render(<SearchdropdownTest 

/>, 
	document.getElementById('searchdropdown')
);
