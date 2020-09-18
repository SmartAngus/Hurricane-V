import React from 'react';
import './App.scss';
import EditorDemo from './features/editor'
import { renderRoutes } from "react-router-config"
import {BrowserRouter} from 'react-router-dom'
import EditorPreview from './features/editor/preview'



const Root = ({ route }:any) => (
    <>
        {/* child routes won't render without this */}
        {renderRoutes(route.routes)}
    </>
);

const Home = ({ route }:any) => (
    <div>
        <h2>Home</h2>
    </div>
);

const Child = ({ route }:any) => (
    <div>
        <h2>Child</h2>
        {/* child routes won't render without this */}
        {renderRoutes(route.routes, { someProp: "these extra props are optional" })}
    </div>
);

const GrandChild = ({ someProp }:{someProp:any}) => (
    <div>
        <h3>Grand Child</h3>
        <div>{someProp}</div>
    </div>
);
const routes:any = [
    {
        component: Root,
        routes: [
            {
                path: "/",
                exact: true,
                component: Home
            },
            {
                path: "/editor",
                exact: true,
                component: EditorDemo
            },
            {
                path: "/child/:id",
                component: Child,
                routes: [
                    {
                        path: "/child/:id/grand-child",
                        component: GrandChild
                    }
                ]
            },
            {
                path: '/editor/preview',
                component: EditorPreview,
                exact: true,
            }
        ]
    }
];
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          {renderRoutes(routes)}
      </BrowserRouter>
    </div>
  );
}

export default App;
