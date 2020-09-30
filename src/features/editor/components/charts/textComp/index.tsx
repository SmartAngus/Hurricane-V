import React from "react"

const TextComp:React.FC<any> = React.forwardRef((props,ref) =>{
    const {node} = props
    return (
        <div>
            {node.name}
        </div>
    )
})
export default TextComp;