/**
 * 可编辑文本组件
 */
import React,{useState,useEffect,useRef} from "react"
import {Node} from "../../../constants/defines";
import classNames from "classnames";
import * as _ from 'lodash'
import './style.scss'
import { useClickAway } from "../../../hooks/useClickAway";


class TextCompProps{
    node?:Node;
    updateNodes?:(node:Node)=>void
}

const TextComp:React.FC<TextCompProps> = React.forwardRef((props,ref) =>{
    const {node,updateNodes} = props
    const [showEditable,setShowEditable] = useState(false)
    const editableRef = useRef(null)
    useClickAway(
        () => {
            setShowEditable(false)
            const name =  editableRef.current.innerText
            const newNode = {
                ...node,
                name
            };
           updateNodes(newNode)
        },
        () => document.querySelector(".editable-box"),
        "click"
    );

    // 绑定双击事件
    useEffect(()=>{
        editableRef.current.addEventListener("dblclick",handleDoubleClick)
        editableRef.current.addEventListener("keyup",handleChangeEditableText)
        //window.addEventListener('click',handleSaveEditData)
        return ()=>{
            editableRef.current.removeEventListener("dblclick",handleDoubleClick)
            editableRef.current.removeEventListener("keyup",handleChangeEditableText)
            //window.removeEventListener('click',handleSaveEditData)
        }
    })
    const handleChangeEditableText=(event:any)=>{
        const name =  editableRef.current.innerText
        const newNode = {
            ...node,
            name
        };
        updateNodes(newNode)
    }
    const handleSaveEditData = (event:any)=>{
        console.log("handleSaveEditData")
        console.log(event.path)
        const editable = hasEditableNode(event.path,'editable-box')
        console.log(editable)
        if(showEditable && editable){
            //setShowEditable(false)
            const name =  editableRef.current.innerText
            const newNode = {
                ...node,
                name
            };
            updateNodes(newNode)
        }
    }

    const handleDoubleClick = ()=>{
        console.log(node)
        setShowEditable(true)
    }
    const editableClass = classNames(
        { "editable-box": showEditable },
    );
    /** 判断点击的节点是否为可编辑节点节点和边 */
    const hasEditableNode = (array: any[], editableNode?: string) => {
        let isNodeOrLink = false;
        if(array==undefined) return isNodeOrLink;
        for (let i = 0; i < array.length; i++) {
            const inNode = _.includes(array[i].classList, editableNode);
            if (inNode ) {
                isNodeOrLink = true;
                break;
            }
        }
        return isNodeOrLink;
    };
    return (
        <>
            <div className={editableClass}
                 suppressContentEditableWarning
                 contentEditable={showEditable}
                 ref={editableRef}
                 style={{
                     width:'100%',
                     height:'100%',
                 }}
            >
                    {node.name}
            </div>
        </>


    )
});

export default TextComp;



