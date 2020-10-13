/**
 * 定义直线组件组件
 */
import React,{useRef,useEffect,useMemo} from "react"
import {Node} from "../../../constants/defines";
import './style.scss'
import { SVG ,Rect,Line,Marker,Path} from '@svgdotjs/svg.js'

class TextCompProps{
    node?:Node;
    updateNodes?:(node:Node)=>void
}

const LineComp:React.FC<TextCompProps> = (props,ref) =>{
    const {node}=props
    const svgContainerRef = useRef()
    console.log("LineComp",node)

    useEffect(()=>{
        console.log("重复运行了吗")
        const draw = SVG(svgContainerRef.current)
        console.log(draw)
        //new Rect().size(100, 100).addTo(draw)
        const line = new Line({
                x1:0,
                y1:node.height/2,
                x2:node.width+200,
                y2:node.height/2,
            })
            .addClass("dotted")
            .stroke({
                color:node.chart.stroke.color,
                width:node.chart.stroke.width,
                dasharray:node.chart.stroke.dashArray
            });



        line.addTo(draw)
        var click = function() {
            console.log(222)
            this.fill({ color: '#f06' })
        }

        line.on('click', click)


        line.marker('end', 20, 20, function(add) {
            add.path('M 7.76 0 L 9.76 4 L 1.76 0 L 9.76 6 Z');

            this.fill("green")
        })


        // line.marker('start', 20, 20, function(add) {
        //     add.path('M2 2 L12 12 L2 12 L2,2 Z');
        //
        //     this.fill("green")
        // })
        const jt_1 = new Path()

    },[])
    const handClick=()=>{
        console.log("111")
    }
    return (
        <div
        style={{
            position: "absolute",
            top: 0,
        }}
        >
            <svg
                ref={svgContainerRef}
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width={node.width}
                height={node.height}
                onClick={handClick}
            >
                <defs></defs>
            </svg>
        </div>


    )
};

export default LineComp;

// <svg
//     xmlns="http://www.w3.org/2000/svg"
//     version="1.1"
//     width={node.width}
//     height={node.height}
// >
//
//     <defs>
//         <marker id="arrow"
//                 markerUnits="strokeWidth"
//                 markerWidth="12"
//                 markerHeight="12"
//                 viewBox="0 0 12 12"
//                 refX="6"
//                 refY="6"
//                 orient="auto">
//             <path d="M2,2 L10,6 L2,10 L6,6 L2,2" style={{fill: "#000000"}} />
//         </marker>
//         <marker id='markerArrow'
//                 markerUnits="strokeWidth"
//                 markerWidth="12"
//                 markerHeight="12"
//                 viewBox="0 0 12 12"
//                 refX="6"
//                 refY="6"
//                 orient="auto"
//         >
//             <path d='M2,2 L8,2 L2,10 L2,2' style={{fill: "#000000"}}/>
//         </marker>
//     </defs>
//
//     <line xmlns="http://www.w3.org/2000/svg"
//           x1="0"
//           y1="10"
//           x2={node.width} y2="10"
//           strokeDasharray="0,9"
//           className="dotted"
//           stroke={node.chart.stroke.color}
//           strokeWidth={node.chart.stroke.width}
//           markerEnd="url(#markerArrow)"
//           markerStart="url(#markerArrow)"
//     />
// </svg>



