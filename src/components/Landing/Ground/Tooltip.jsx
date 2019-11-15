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
            left: this.props.hoveredSlice["x"]-35,
            top: this.props.hoveredSlice["y"]+35,
            borderRadius: "10px"
        }
        return (
            <div>
                <div className="Tooltip" style={styles}>
                <table>
                <thead>
                    <tr>
                    <th colSpan="2">Ground</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td colSpan="1">{this.props.hoveredSlice.ground}</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        )
    }
}
