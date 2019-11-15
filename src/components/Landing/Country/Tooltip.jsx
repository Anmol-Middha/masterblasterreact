import React, { Component } from 'react'

export default class Tooltip extends Component {
    constructor(){
        super();
    }
    // rendering tooptip component
    render() {
        const { xScale, yScale } = this.props.scales;
        const styles = {
            backgroundColor: "grey",
            color: "white",
            padding: "10px",
            position: "absolute",
            left: `${xScale(this.props.hoveredBar.name) - 50}px`,
            top: `${yScale(this.props.hoveredBar.value)}px`,
            borderRadius: "10px"
        }
        return (
            <div>
                <div className="Tooltip" style={styles}>
                <table>
                <thead>
                    <tr>
                    <th colSpan="2">{this.props.hoveredBar.name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td colSpan="1">Runs:</td>
                    <td colSpan="1">{this.props.hoveredBar.value}</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        )
    }
}
