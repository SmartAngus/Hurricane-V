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

const TextComp:React.FC<TextCompProps> = (props,ref) =>{
    const {node,updateNodes} = props
    const [showEditable,setShowEditable] = useState(false)
    const editableRef = useRef(null)
    console.log(node)
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
        //editableRef.current.addEventListener('mousemove',handleSelectText)
        // 加上会有问题，组件会变少
        //window.addEventListener('click',handleSaveEditData)
        return ()=>{
            editableRef.current.removeEventListener("dblclick",handleDoubleClick)
            editableRef.current.removeEventListener("keyup",handleChangeEditableText)
            //window.removeEventListener('click',handleSaveEditData)
        }
    })
    const handleSelectText=(event:any)=>{
        event.stopPropagation()
    }
    const handleChangeEditableText=(event:any)=>{
        event.stopPropagation()
        const name =  editableRef.current.innerText
        const newNode = {
            ...node,
            name
        };
        updateNodes(newNode)
    }
    // const handleSaveEditData = (event:any)=>{
    //    // 取消事件冒泡，防止按delete键删除节点
    //     event.stopPropagation()
    //     const editable = hasEditableNode(event.path,'editable-box')
    //     console.log(editable)
    //     if(showEditable && editable){
    //         //setShowEditable(false)
    //         const name =  editableRef.current.innerText
    //         const newNode = {
    //             ...node,
    //             name
    //         };
    //         updateNodes(newNode)
    //     }
    // }

    const handleDoubleClick = ()=>{
        console.log(node)
        setShowEditable(true)
        editableRef.current.focus()
        // const p = editableRef.current,
        //     s = window.getSelection(),
        //     r = document.createRange();
        // r.selectNodeContents(p);
        // s.removeAllRanges();
        // s.addRange(r);
        // document.execCommand('delete', false, null);
        const div = editableRef.current;
        const range = document.createRange();
        if(div.innerHTML==''||div.innerHTML.length==0){
            div.innerHTML = '请输入文本';
        }
        // range.setStart(editableRef.current, 1)
        // range.setEnd(editableRef.current, 1)
       // getSelection().addRange(range)
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
                     display: 'table-cell',
                     verticalAlign: 'middle'
                 }}
            >
                    {node.name}
            </div>
        </>


    )
};

export default TextComp;



