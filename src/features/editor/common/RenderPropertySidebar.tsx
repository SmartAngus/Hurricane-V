import React,{ useRef,useState } from 'react'
import { Tabs, Collapse, Select, Input, Tooltip, Icon,InputNumber } from 'antd'
import * as _ from 'lodash'
import ColorsPicker from './ColorsPicker'
import "../components/NodePanel.scss";
import "./RenderPropertySidebar.scss"



const { TabPane } = Tabs
const Panel = Collapse.Panel;
const {Option} = Select

export class OptionsProperty  {
    id?:number;
    name?:string;
    selectedNodes?:any;
    nodes?:any;
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
    const {selectedNodes,nodes} = props;
    const [isSelf,setIsSelf] = useState(false)
    let isCompSetting= false
    let isSetting = false

    // 存的是node的id，是一个数组
    // // console.log("selectedNodes==",selectedNodes)
    // // console.log("nodes==",nodes)
    const node = _.find(nodes, n => n.id === selectedNodes[0]);
    console.log("selectNode==",node)
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
    const onInputChange = (value)=>{

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
                    accordion
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
                                    accordion
                                >
                                    <Panel header="页面尺寸" key="1">
                                        <div className="components-box">sss</div>
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