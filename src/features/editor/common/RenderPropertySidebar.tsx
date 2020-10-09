import React,{ useRef,useState,useContext,useEffect } from 'react'
import { renderToStaticMarkup } from 'react-dom/server';
import { Tabs, Collapse, Select, Input, Tooltip, Icon,InputNumber, Button,Radio, Checkbox } from 'antd'
import * as _ from 'lodash'
import ColorsPicker from './ColorsPicker'
import "../components/NodePanel.scss";
import "./RenderPropertySidebar.scss"
import {Group, Link,Node, ThemeContext} from "../constants/defines";
import preImage1 from '../../../assets/images/pre-image1.jpg'
import preImage2 from '../../../assets/images/pre-image2.png'
import preImage3 from '../../../assets/images/pre-image3.jpg'
import UploadBgImg from "../components/uploadBgImg/UploadBgImg";
import LeftJustifying,{GridBackgroundSVG} from "../icons/editorIcons";
import {getHexColor} from '../utils/calc'


const { TabPane } = Tabs
const Panel = Collapse.Panel;
const {Option} = Select
const ButtonGroup = Button.Group;

export class OptionsProperty  {
    id?:number;
    name?:string;
    selectedNodes?:any;
    nodes?:Node[];
    groups?:Group[];
    links?:Link[];
    updateNodes?:any;
    setCanvasProps?:any;
    // 看版样式
    canvasProps?:any;
    autoSaveSettingInfo?:(canvasProps:any,nodes:Node[],groups:Group[],links:Link[])=>void;
    setDragNode?:(node:Node)=>void;
}
// 定义页面尺寸
const pageSizes = [
    {key:'1060*520',text:'1060*520',width:1060,height:520},
    {key:'1920*1080',text:'1920*1080',width:1920,height:1080},
    {key:'1440*900',text:'1440*900',width:1440,height:900},
    {key:'1366*768',text:'1366*768',width:1366,height:768},
]
const pageSizes2 = [
    {key:'1024*768',text:'1024*768',width:1024,height:768},
    {key:'800*600',text:'800*600',width:800,height:600},
]
const preImages = [
    {key:1,img:preImage1},
    {key:2,img:preImage2},
    {key:3,img:preImage3},
]

const RenderPropertySidebar = React.forwardRef((props:OptionsProperty, ref)=>{
    const sidebarRef = useRef(null)
    const defaultCanvasProps = useContext(ThemeContext)
    const {selectedNodes,nodes,groups,links,updateNodes,canvasProps,setCanvasProps,autoSaveSettingInfo} = props;
    const [isSelf,setIsSelf] = useState(false)

    const [gridSize,setGridSize]=useState(10)
    let [showGrid,setShowGrid]=useState(false)
    let [gridColor,setGridColor]=useState({
        r: '241',
        g: '112',
        b: '19',
        a: '1',
    })

    useEffect(()=>{
        if(canvasProps&&canvasProps.grid){
            setGridSize(canvasProps.grid.size)
            setShowGrid(canvasProps.grid.show)
            canvasProps.grid.color&&setGridColor(canvasProps.grid.color)
        }
    },[canvasProps])



    let isCompSetting= false
    let isSetting = false
    // convert component to string useable in data-uri
    let svgString = encodeURIComponent(renderToStaticMarkup(<GridBackgroundSVG strokeColor={getHexColor(gridColor)} />));
    //svgString = btoa(svgString);
    // setCanvasProps(defaultCanvasProps)

    // 存的是node的id，是一个数组
    // // console.log("selectedNodes==",selectedNodes)
    // // console.log("nodes==",nodes)
    const node = _.find(nodes, n => n.id === selectedNodes[0]);
    if(node===undefined){
        isCompSetting=false
        isSetting=true
    }else{
        isCompSetting=true
        isSetting=false
    }

    // 切换tab发生的回掉函数
    const onTabChange = () => {
        // // console.log("onTabChange")

    }
    const collapseKey = () => {

    }
    const handleCollapseKey = () => {

    }
    const handleChange = (value) => {
        if(value === 'self'){
            setIsSelf(true)
        }else{
            setIsSelf(false)
        }
    }
    const handleCanvasChange = (value) => {
        let canvasSize = _.find(pageSizes,s=>s.key===value)
        if(canvasSize === undefined){
            canvasSize = _.find(pageSizes2,s=>s.key===value)
        }
        canvasProps.height=canvasSize.height;
        canvasProps.width=canvasSize.width;
        setCanvasProps(canvasProps)
        autoSaveSettingInfo(canvasProps,nodes,groups,links)
    }
    //屏幕尺寸变化
    const onCanvasWChange=(value)=>{
        canvasProps.width=value;
        setCanvasProps(canvasProps)
        autoSaveSettingInfo(canvasProps,nodes,groups,links)
    }
    const onCanvasHChange=(value)=>{
        canvasProps.height=value;
        setCanvasProps(canvasProps)
        autoSaveSettingInfo(canvasProps,nodes,groups,links)
    }
    // 预设背景发生变化
    const handlePreBgImg = (image)=>{
        if(canvasProps.backgroundImageKey == image.key){
            canvasProps.backgroundImage=null;
            canvasProps.backgroundImageKey = null
        }else{
            canvasProps.backgroundImage=`url(${image.img})`;
            canvasProps.backgroundImageKey = image.key
        }
        setCanvasProps(canvasProps)
        autoSaveSettingInfo(canvasProps,nodes,groups,links)
    }
    // 是否显示网格
    const handleChangeGrid=(e)=>{
        console.log(`handleChangeGrid`,canvasProps)
        if(e.target.checked){
            setShowGrid(true)
            canvasProps.grid.show=true
            canvasProps.grid.url = svgString
            canvasProps.grid.size=gridSize
        }else{
            setShowGrid(false)
            canvasProps.grid.show=false
            canvasProps.grid.url = null
            canvasProps.grid.size=10
        }
        setCanvasProps(canvasProps)
        autoSaveSettingInfo(canvasProps,nodes,groups,links)
    }
    // 网格大小改变
    const handleChangeGridSize=(value)=>{
        console.log("handleChangeGridSize==",value,showGrid)
        setGridSize(value)
        if(showGrid){
            console.log(getHexColor(gridColor))
            let svgString = encodeURIComponent(renderToStaticMarkup(
                <GridBackgroundSVG height={value*20} width={value*20} strokeColor={getHexColor(gridColor)} />)
            );
            canvasProps.grid.url = svgString
            canvasProps.grid.size=value
            setCanvasProps(canvasProps)
            autoSaveSettingInfo(canvasProps,nodes,groups,links)
        }
    }
    // 画布背景颜色改变
    const handleSetBgColor = (color)=>{
        canvasProps.backgroundColor=getHexColor(color);
        setCanvasProps(canvasProps)
        autoSaveSettingInfo(canvasProps,nodes,groups,links)
    }
    // 边框的颜色
    const handleSetBoxBorderColor = (color)=>{
        // 深度复制，防止改变一个颜色而使整个颜色都改变了
        const newNode = _.cloneDeep(node)
        if(newNode.style) {
            newNode.style.borderColor = getHexColor(color);
            updateNodes(newNode)
        }
    }
    // 边框的填充色
    const handleSetBoxBgColor = (color)=>{
        const newNode = _.cloneDeep(node)
        if(newNode.style){
            newNode.style.backgroundColor = getHexColor(color);
            updateNodes(newNode)
        }
    }
    // 边框的粗细
    const handleSetBoxBorderWidth = (size)=>{
        const newNode = _.cloneDeep(node)
        if(newNode.style){
            newNode.style.borderWidth = size;
            updateNodes(newNode)
        }
    }
    // 网格颜色改变
    const handleSetGridColor = (color)=>{
        setGridColor(color)
        canvasProps.grid.color=color
        let svgString = encodeURIComponent(renderToStaticMarkup(
            <GridBackgroundSVG height={gridSize*20} width={gridSize*20} strokeColor={getHexColor(gridColor)} />)
        );
        canvasProps.grid.url = svgString
        setCanvasProps(canvasProps)
        autoSaveSettingInfo(canvasProps,nodes,groups,links)
    }
    // 位置和尺寸改变
    const onInputPositionXChange = (value)=>{node.x = value;updateNodes(node)}
    const onInputPositionYChange = (value)=>{node.y = value;updateNodes(node)}
    const onInputSizeWChange = (value)=>{
        node.width = value;updateNodes(node)
    }
    const onInputSizeHChange = (value)=>{node.height = value;updateNodes(node)}
    // 旋转角度改变
    const onInputRotateChange = (value)=>{node.rotate = value;updateNodes(node)}
    const onInputChange = (value)=>{
        node.x = value;
    }
    const parserInputValue = (value)=>{
        let reg = /(\D+)\s(\d+)\s(\D+)/
        let r = value.match(reg);
        return r&&r[2]
    }

    // 渲染自定义页面设置
    const renderPageSetting = ()=>{
            return (
                <>
                <h3 style={{borderBottom:'2px solid #ccc',paddingBottom:10}}>页面设置</h3>
                <div className="self-setting-size">
                    <span>
                        <p>W</p>
                        <InputNumber min={640} max={1920} value={canvasProps.width} onChange={onCanvasWChange} />
                    </span>
                    <span>
                        <p>H</p>
                        <InputNumber min={480} max={1080} value={canvasProps.height} onChange={onCanvasHChange} />
                    </span>
                    <span><p>&nbsp;</p><Button type="link" icon="retweet"/></span>
                </div>
                <Collapse
                    defaultActiveKey={['1']}
                    onChange={handleCollapseKey}
                    bordered={true}
                    accordion={false}
                >
                    <Panel header="预设尺寸" key="1">
                        <ul className="bant-list-items">
                            <li className="bant-list-item">
                                <div className="bant-list-item-extra">
                                    <div className="preview-box"></div>
                                </div>
                                <div className="bant-list-item-main">
                                    <div className="bant-list-item-meta"><h3>16:9</h3></div>
                                    <div className="bant-list-item-meta-content">
                                            {pageSizes.map((size,key)=>{
                                                return <a
                                                    onClick={()=>handleCanvasChange(size.key)}
                                                    key={key}
                                                    className="canvas-size-row">{size.text}</a>
                                            })}
                                    </div>
                                </div>
                            </li>
                            <li className="bant-list-item">
                                <div className="bant-list-item-extra">
                                    <div className="preview-box box-four-to-three"></div>
                                </div>
                                <div className="bant-list-item-main">
                                    <div className="bant-list-item-meta"><h3>4:3</h3></div>
                                    <div className="bant-list-item-meta-content">
                                        {pageSizes2.map((size,key)=>{
                                            return <a  onClick={()=>handleCanvasChange(size.key)}
                                                key={key} className="canvas-size-row">{size.text}</a>
                                        })}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </Panel>
                    <Panel header="背景" key="2">
                        <div className="components-box">
                            <ul>
                                <li style={{display:'flex'}}>背景颜色：<ColorsPicker  onSetColor={handleSetBgColor}/></li>
                                <li style={{display:'flex'}}>背景图片：<UploadBgImg/></li>
                                <li>
                                    <p style={{textAlign:'left'}}>预设图片：</p>
                                    <div className="preinstall-bg-img">
                                        {preImages.map((image,key)=>{
                                            return (
                                                <div key={key} className="pre-mini-img" onClick={()=>handlePreBgImg(image)}>
                                                    <img src={image.img} alt=""/>
                                                    {canvasProps.backgroundImageKey == image.key?<Button
                                                        className="pre-img-selected-icon"
                                                        size="small" type="primary" shape="circle" icon="check" />:''}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </li>
                                <li className="grid-setting">
                                    <Checkbox  checked={showGrid} onChange={handleChangeGrid} >网格</Checkbox>
                                    <InputNumber
                                        value={gridSize}
                                        min={10}
                                        max={100}
                                        formatter={value => `${value}px`}
                                        parser={value => value.replace('px', '')}
                                        onChange={handleChangeGridSize}
                                    />
                                    <ColorsPicker onSetColor={handleSetGridColor}/>
                                </li>
                            </ul>
                        </div>
                    </Panel>
                </Collapse>
                </>
            )
    }
    // 渲染组件属性
    const renderCompSetting = ()=>{
        return (
            <Tabs defaultActiveKey="1" onChange={onTabChange}>
                <TabPane tab="样式" key="1">
                    <div className="nodePanel">
                        <div className="aa">
                            <div className="nodePanel-box-collapse">
                                <Collapse
                                    defaultActiveKey={['1']}
                                    onChange={handleCollapseKey}
                                    bordered={true}
                                    accordion={false}
                                >
                                    <Panel header="位置和尺寸" key="1">
                                        <div className="components-box">
                                            <InputNumber
                                                style={{width:110}}
                                                value={node&&node.x}
                                                formatter={value => `X ${value} px`}
                                                parser={parserInputValue}
                                                onChange={onInputPositionXChange}
                                            />
                                            <InputNumber
                                                style={{width:110}}
                                                value={node&&node.y}
                                                min={10}
                                                max={2042}
                                                formatter={value => `Y ${value} px`}
                                                parser={parserInputValue}
                                                onChange={onInputPositionYChange}
                                            />
                                        </div>
                                        <div className="components-box">
                                            <InputNumber
                                                style={{width:110}}
                                                value={node&&node.width}
                                                formatter={value => `W ${value} px`}
                                                parser={parserInputValue}
                                                onChange={onInputSizeWChange}
                                            />
                                            <InputNumber
                                                style={{width:110}}
                                                value={node&&node.height}
                                                min={10}
                                                max={1080}
                                                formatter={value => `H ${value} px`}
                                                parser={parserInputValue}
                                                onChange={onInputSizeHChange}
                                            />
                                        </div>
                                        <div className="components-box">
                                            <InputNumber
                                                style={{width:110}}
                                                value={node&&node.rotate}
                                                min={-360}
                                                max={360}
                                                formatter={value => `旋转 ${value} deg`}
                                                parser={parserInputValue}
                                                onChange={onInputRotateChange}
                                            />
                                        </div>
                                    </Panel>
                                    <Panel header="文本" key="2">
                                        <div className="components-box">
                                            <div className="components-box-inner">
                                                <label>字体</label>
                                                <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                                                    <Option value="jack">Jack</Option>
                                                    <Option value="lucy">Lucy</Option>
                                                    <Option value="disabled" disabled>
                                                        Disabled
                                                    </Option>
                                                    <Option value="Yiminghe">yiminghe</Option>
                                                </Select>
                                            </div>
                                            <div className="components-box-inner">
                                                <label>字体</label>
                                                <InputNumber
                                                    style={{width:120}}
                                                    defaultValue={12}
                                                    min={12}
                                                    max={72}
                                                    formatter={value => `${value}px`}
                                                    parser={value => value.replace(/\[X|px]/g, '')}
                                                    onChange={onInputChange}
                                                />
                                            </div>
                                            <div className="components-box-inner">
                                                <label>颜色</label>
                                                <ColorsPicker/>
                                            </div>
                                            <div className="components-box-inner">
                                                <label>对齐</label>
                                                <ButtonGroup>
                                                    <Button type="default"  icon="align-left" />
                                                    <Button type="default"  icon="align-center" />
                                                    <Button type="default"  icon="align-right" />
                                                </ButtonGroup>
                                            </div>
                                        </div>
                                    </Panel>
                                    <Panel header="外观" key="3" style={{height:600}}>
                                        <div className="components-box">
                                            <div className="components-box-inner">
                                                <label>填充</label>
                                                <ColorsPicker
                                                    defaultColor={node.style?.backgroundColor}
                                                    onSetColor={handleSetBoxBgColor}/>
                                            </div>
                                            <div className="components-box-inner">
                                                <label>边框</label>
                                                <ColorsPicker
                                                    defaultColor={node.style?.borderColor}
                                                    onSetColor={handleSetBoxBorderColor}/>
                                                <InputNumber
                                                    value={node.style?.borderWidth}
                                                    min={0}
                                                    max={4}
                                                    formatter={value => `${value}px`}
                                                    parser={value => value.replace('px', '')}
                                                    onChange={handleSetBoxBorderWidth}
                                                />
                                            </div>
                                        </div>
                                    </Panel>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="数据" key="2">
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>
        )
    }

    return (
        <div className="editor-property">
            {isSetting&&renderPageSetting()}
            {isCompSetting&&renderCompSetting()}
        </div>
    )
})
export default RenderPropertySidebar;