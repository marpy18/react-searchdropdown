# react-searchdropdown

A simple dropdown with a search input field


## Installation

Install using npm:
```sh
npm install --save @quipugmbh/react-searchdropdown
```


## Example Usage

```jsx
import Searchdropdown from '@quipugmbh/react-searchdropdown'
import '@quipugmbh/react-searchdropdown/react-searchdropdown.css'
...

render: function() {
    return <Searchdropdown 
				options={[{label: "Value 1", value: "Value 1"},
						  {label: "Value 2", value: "Value 2"},
						  {label: "Value 3", value: "Value 3"}]}
				value={this.state.selectedValue}
				onChange={v => this.setState({selectedValue: v.value})}
				clearable={true}
			/>
}
```


## Developement
If you want to do developement:
1. git clone https://github.com/gocedoko/react-searchdropdown
2. cd react-searchdropdown
3. npm install
4. npm run dev

### [Changelog](CHANGELOG.md)

### [GNU General Public License v3.0 licensed](LICENSE.md)

