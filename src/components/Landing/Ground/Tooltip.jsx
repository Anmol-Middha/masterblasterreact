import React, { Component } from 'react'

export default class Tooltip extends Component {
    constructor(props){
        super();
    }
    // rendering tooptip component
    render() {
        const styles = {
            backgroundColor: "grey",
            color: "white",
            padding: "10px",
            position: "absolute",
            left: this.props.hoveredSlice["x"]-50,
            top: this.props.hoveredSlice["y"]+35,
            borderRadius: "10px"
        }
        return (
            <div>
                <div className="Tooltip" style={styles}>
                <table>
                <thead>
                    <tr>
                    <th colSpan="2">{this.props.hoveredSlice.name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td colSpan="1">Runs:</td>
                    <td colSpan="1">{this.props.hoveredSlice.ground}</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        )
    }
}
