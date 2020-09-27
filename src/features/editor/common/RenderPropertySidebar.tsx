import React,{ useRef,useState,useContext } from 'react'
import { Tabs, Collapse, Select, Input, Tooltip, Icon,InputNumber, Button,Radio } from 'antd'
import * as _ from 'lodash'
import ColorsPicker from './ColorsPicker'
import "../components/NodePanel.scss";
import "./RenderPropertySidebar.scss"
import { ThemeContext } from "../constants/defines";



const { TabPane } = Tabs
const Panel = Collapse.Panel;
const {Option} = Select
const ButtonGroup = Button.Group;

export class OptionsProperty  {
    id?:number;
    name?:string;
    selectedNodes?:any;
    nodes?:any;
    updateNodes?:any;
    setCanvasProps?:any;
    // 看版样式
    canvasProps?:any;
    autoSaveSettingInfo?:(canvasProps:any)=>void
}
// 定义页面尺寸
const pageSizes = [
    {key:'1060*520',text:'1060*520',width:1060,height:520},
    {key:'1920*1080',text:'1920*1080',width:1920,height:1080},
    {key:'1440*900',text:'1440*900',width:1440,height:900},
    {key:'1366*768',text:'1366*768',width:1366,height:768},
]

const RenderPropertySidebar = React.forwardRef((props:OptionsProperty, ref)=>{
    const sidebarRef = useRef(null)
    const defaultCanvasProps = useContext(ThemeContext)
    console.log(defaultCanvasProps)
    const {selectedNodes,nodes,updateNodes,canvasProps,setCanvasProps,autoSaveSettingInfo} = props;
    const [isSelf,setIsSelf] = useState(false)
    let isCompSetting= false
    let isSetting = false
    console.log("首次加载cavas==",canvasProps)
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
        console.log(`selected ${value}`);
        if(value === 'self'){
            setIsSelf(true)
        }else{
            setIsSelf(false)
        }
    }
    const handleCanvasChange = (value) => {
        console.log(`selected ${value}`);
        const canvasSize = _.find(pageSizes,s=>s.key===value)
        defaultCanvasProps.height=canvasSize.height;
        defaultCanvasProps.width=canvasSize.width;
        setCanvasProps(defaultCanvasProps)
        console.log(defaultCanvasProps)
        autoSaveSettingInfo(defaultCanvasProps)

        if(value === 'self'){
            setIsSelf(true)
        }else{
            setIsSelf(false)
        }
    }
    //屏幕尺寸变化
    const onCanvasWChange=(value)=>{
        defaultCanvasProps.width=value;
        setCanvasProps(defaultCanvasProps)
        autoSaveSettingInfo(defaultCanvasProps)
    }
    const onCanvasHChange=(value)=>{
        defaultCanvasProps.height=value;
        setCanvasProps(defaultCanvasProps)
        autoSaveSettingInfo(defaultCanvasProps)
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
        console.log(value)
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
                                    <div className="preview-box"></div>
                                </div>
                                <div className="bant-list-item-main">
                                    <div className="bant-list-item-meta"><h3>16:9</h3></div>
                                    <div className="bant-list-item-meta-content">
                                        {pageSizes.map((size,key)=>{
                                            return <a  key={key} className="canvas-size-row">{size.text}</a>
                                        })}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </Panel>
                    <Panel header="背景" key="2">
                        <div className="components-box">
                            背景颜色：<ColorsPicker/>
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