import React,{ useRef } from 'react'
import { Tabs, Collapse } from 'antd'
import * as _ from 'lodash'
import "../components/NodePanel.scss";



const { TabPane } = Tabs
const Panel = Collapse.Panel;

export class OptionsProperty  {
    id?:number;
    name?:string;
    selectedNodes?:any;
    nodes?:any;
}

const RenderPropertySidebar = React.forwardRef((props:OptionsProperty, ref)=>{
    const sidebarRef = useRef(null)
    const {selectedNodes,nodes} = props;
    // 存的是node的id，是一个数组
    // // console.log("selectedNodes==",selectedNodes)
    // // console.log("nodes==",nodes)
    const node = _.find(nodes, n => n.id === selectedNodes[0]);
    // // console.log("selectNode==",node)

    // 切换tab发生的回掉函数
    const onTabChange = () => {
        // // console.log("onTabChange")
    }
    const collapseKey = () => {

    }
    const handleCollapseKey = () => {

    }
    // // console.log()

    return (
        <div className="editor-property">
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
        </div>
    )
})
export default RenderPropertySidebar;