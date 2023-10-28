import React from 'react'
import { expCss } from '../exp-css/css'

export default function exp() {
    const fakeCss = new expCss()
    const padding = "112px"
    const background = "red"
    console.log(fakeCss.getName())
    return (
        <div style={fakeCss.getName()}>exp</div>
    )
}
