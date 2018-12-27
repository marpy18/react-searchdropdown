import React, { Component } from 'react'
import classNames from 'classnames'

import onClickOutside from 'react-onclickoutside';

const DEFAULT_PLACEHOLDER_STRING = 'Wybierz...'

class Searchdropdown extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false,
      ...this.getStateFromProps(props, []),
    }

    this.fireChangeEvent = this.fireChangeEvent.bind(this)
    this.getStateFromProps = this.getStateFromProps.bind(this)
    this.setValue = this.setValue.bind(this)
    this.onUserInputChange = this.onUserInputChange.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.addValueToList = this.addValueToList.bind(this)
  }

  componentWillReceiveProps (newProps) {
    this.setState(this.getStateFromProps(newProps, this.state.options))
  }

  getStateFromProps (props, currentOptions)
  {
      const options = (props.options.length !== currentOptions.length)
      ? props.options.map((o,ind) => ({ index:ind, lowerCaseLabel: o.label.toLowerCase(), ...o}))
      : currentOptions

      const newSelected = options.find((v) => v.value === props.value) || { label: '', value: '', index: -1 }

      return {selected: newSelected, options: options, filteredOptions: options,
              typedValue: newSelected.label, lowerCaseTypedValue: newSelected.label.toLowerCase()}
  }

  handleMouseDown (event) {
    if (!this.props.disabled)
      this.setState({ isOpen: !this.state.isOpen })
  }

  setValue (valueObj, isOpen=false) {
    const newSelected = valueObj ? valueObj : {value:'', label:'', index:-1};
    this.setState({
      selected: newSelected, isOpen: isOpen, typedValue: newSelected.label, lowerCaseTypedValue: newSelected.label.toLowerCase()
    }, this.fireChangeEvent(newSelected))
  }

  addValueToList(valueObj){
    if(this.props.addValueToList != null){
      this.props.addValueToList(valueObj);
    }
  }

  fireChangeEvent (newSelected) {
    if (newSelected !== this.state.selected && this.props.onChange)
      this.props.onChange(newSelected)
  }

  renderOption (option) {
    const classes = {
      [this.props.baseClassName+'-option']: true,
      [option.className]: !!option.className,
      'is-selected': option === this.state.selected
    }

    const optionClass = classNames(classes)

    return (
      <div
        key={option.value}
        className={optionClass}
        onMouseDown={event => {event.stopPropagation(); this.setValue(option); this.addValueToList(option)}}
        onClick={event => {event.stopPropagation(); this.setValue(option); this.addValueToList(option)}}>
        {option.label}
      </div>
    )
  }

  buildMenu () 
  {
    const ops = this.state.filteredOptions.map((option, ind) => this.renderOption(option))
    return ops.length ? ops : <div className={this.props.baseClassName+'-noresults'}>No options found</div>
  }

  handleClickOutside() {
    if (this.state.isOpen) 
    {
      const v = this.state.options.find(o => o.lowerCaseLabel.indexOf(this.state.lowerCaseTypedValue) != -1)
      if (this.state.lowerCaseTypedValue && v)
        this.setState({ typedValue: v.label, lowerCaseTypedValue: v.label.toLowerCase(), 
          filteredOptions: this.state.options }, 
          this.setValue(v))
      else
        this.setState({ typedValue: '', lowerCaseTypedValue:'', filteredOptions: this.state.options },
          this.setValue())
    }
  }

  onUserInputChange(e) {
    const value = e.target === null ? e : e.target.value
    const lowerCaseTypedValue = value.toLowerCase() || ''
    let splitValues = lowerCaseTypedValue.split(" ");
    let filteredOptions = this.state.options;
    if(value){
     filteredOptions =  this.state.options.filter( o => {
       let found = true;
       splitValues.forEach(splitValue => {
         if(o.lowerCaseLabel.indexOf(splitValue) === -1 && splitValue !== " " && splitValue !== ""){
            found = false;
         }
       })
	return found;
     });
    }
    this.setState({ 
      typedValue: value,
      lowerCaseTypedValue: lowerCaseTypedValue,
      filteredOptions,
      isOpen: true
    })
  }

  onKeyDown( e ) {
    if ( e.which === 9 )  //tab
      this.handleClickOutside();
    else if ( e.which === 38 && this.state.selected.index) //up
      this.setValue(this.state.options[(this.state.selected.index - 1)], true)
    else if ( e.which === 40 && this.state.selected.index < this.state.options.length - 1) //down
      this.setValue(this.state.options[(this.state.selected.index + 1)], true)
    else if (e.which === 13 && this.props.onEnter != null)
      this.props.onEnter(this.state.filteredOptions);
  }

  render () {
    const { baseClassName, placeholderClassName, menuClassName, arrowClassName, clearClassName, className } = this.props

    const disabledClass = this.props.disabled ? 'Searchdropdown-disabled' : ''

    const searchdropdownClass = classNames({
      [baseClassName+'-root']: true,
      [className]: !!className,
      'is-open': this.state.isOpen
    })
    const placeholderClass = classNames({
      [baseClassName+'-placeholder']: true,
      [placeholderClassName]: !!placeholderClassName
    })
    const menuClass = classNames({
      [baseClassName+'-menu']: true,
      [menuClassName]: !!menuClassName
    })
    const arrowClass = classNames({
      [baseClassName+'-arrow']: true,
      [arrowClassName]: !!arrowClassName
    })
    const clearClass = classNames({
      [baseClassName+'-clear']: true,
      [clearClassName]: !!clearClassName
    })

    const menu = this.state.isOpen ? <div className={menuClass}>{this.buildMenu()}</div> : null

    return (
      <div className={searchdropdownClass}>
        <div className={baseClassName + '-control ' + disabledClass} onClick={this.handleMouseDown.bind(this)}>
          <input 
              type='text'
              placeholder={this.props.placeholder || DEFAULT_PLACEHOLDER_STRING} 
              onChange={this.onUserInputChange}
              onKeyDown={this.onKeyDown}
              value={this.state.typedValue} 
              className={placeholderClass}
              disabled={this.props.disabled}>
          </input>

          { !this.props.disabled && <span className={arrowClass} >&#9660;</span> }

          { this.props.clearable && !this.props.disabled && this.props.value && <span className={clearClass}
                      onClick={event => {event.stopPropagation(); this.setValue()}}
            >&#9587;</span>
          }
        </div>
        {menu}
      </div>
    )
  }
}

Searchdropdown.defaultProps = { baseClassName: 'Searchdropdown' }
export default onClickOutside(Searchdropdown);
