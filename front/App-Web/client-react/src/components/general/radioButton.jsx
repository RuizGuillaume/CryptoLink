import React from 'react'

export default function RadioButton(props) {
    return (
        <>
            <input type="radio" className="btn-check" value={props.value} name={props.name} onChange={props.change} id={props.id} defaultChecked={props.defaultChecked} autoComplete="off"/>

            <label className="btn btn-outline-primary"  htmlFor={props.id}>{props.display}</label>
        </>
    )
}
