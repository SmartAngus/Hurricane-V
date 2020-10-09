import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import {Button} from 'antd'
import './ColorsPicker.scss'
import {decodeColor2Rgba} from '../utils/calc'

class ColorsPickerProps{
    onSetColor?:(color:any)=>void;
    defaultColor?:string
}

class ColorsPicker extends React.Component<ColorsPickerProps> {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(props,nextProps){
        this.setState({color:decodeColor2Rgba(props.defaultColor)})
    }
    state = Object.assign({color:{
            r: '241',
            g: '112',
            b: '19',
            a: '1'}
    },{
        displayColorPicker: false,
        color: decodeColor2Rgba(this.props.defaultColor)
    });


    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        console.log(color)
       this.setState({ color: color.rgb })
    };
    handleSetColor = ()=>{
        const {onSetColor} = this.props;
        onSetColor(this.state.color)
        this.setState({ displayColorPicker: false })
    }


    render() {
        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                    right:50
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div>
                <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } />
                </div>
                { this.state.displayColorPicker ? <div className="color-picker-container" style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                    <SketchPicker color={ this.state.color } className="my-color-picker"  onChangeComplete={ this.handleChange } />
                    <Button onClick={this.handleClose} style={{marginRight:20}}>取消</Button>
                    <Button type="primary" onClick={this.handleSetColor}>确定</Button>
                </div> : null }
            </div>
        )
    }
}

export default ColorsPicker;