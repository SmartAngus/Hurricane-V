import React,{ useRef,useState } from 'react'
import { Tabs, Collapse, Select, Input, Tooltip, Icon,InputNumber, Button } from 'antd'
import * as _ from 'lodash'
import ColorsPicker from './ColorsPicker'
import "../components/NodePanel.scss";
import "./RenderPropertySidebar.scss"



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
}
// 定义页面尺寸
const pageSizes = [
    {key:'1060*520',text:'1060*520(推荐)',width:1060,height:520},
    {key:'1920*1080',text:'1920*1080',width:1920,height:1080},
    {key:'1440*900',text:'1440*900',width:1440,height:900},
    {key:'1366*768',text:'1366*768',width:1366,height:768},
    {key:'self',text:'自定义',width:null,height:null},
]

const RenderPropertySidebar = React.forwardRef((props:OptionsProperty, ref)=>{
    const sidebarRef = useRef(null)
    const {selectedNodes,nodes,updateNodes} = props;
    const [isSelf,setIsSelf] = useState(false)
    let isCompSetting= false
    let isSetting = false

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
                <h3>页面设置</h3>
                <Collapse
                    defaultActiveKey={['1']}
                    onChange={handleCollapseKey}
                    bordered={true}
                    accordion={false}
                >
                    <Panel header="页面尺寸" key="1">
                        <div className="components-box">
                            <Select style={{width:'100%'}} defaultValue="1366*768" onChange={handleChange}>
                                {pageSizes&&pageSizes.map((item,key)=>{
                                    return   <Option value={item.key} key={key}>{item.text}</Option>
                                })}
                            </Select>
                            {isSelf&&(
                                <div style={{marginTop:12}}>
                                    <InputNumber
                                        style={{width:110,float:'left',marginRight:20}}
                                        defaultValue={1024}
                                        min={1024}
                                        max={1960}
                                        formatter={value => `W ${value}`}
                                        parser={value => value.replace('W', '')}
                                        onChange={onInputChange}
                                    />
                                    <InputNumber
                                        style={{width:110}}
                                        defaultValue={640}
                                        min={640}
                                        max={1080}
                                        formatter={value => `H ${value}`}
                                        parser={value => value.replace('H', '')}
                                        onChange={onInputChange}
                                    />
                                </div>
                            )}
                        </div>
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