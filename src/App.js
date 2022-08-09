import React, { useEffect, useState } from 'react';
import { Button, Layout } from 'antd';
import './App.css';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import RequestsList from './components/requests/RequestsList';
import Map from './components/map/Map';
import Divider from './components/devider/Divider';

function App() {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(400);

  const onMouseMove = e => {
    if (isResizing) {
      let offsetRight =
        document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
      const minWidth = 50;
      const maxWidth = 600;
      // if (offsetRight > minWidth && offsetRight < maxWidth) {
      //   setWidth(offsetRight);
      // }
      setWidth(e.clientX);

      e.preventDefault();
    }
  };

  const onMouseDown = e => {
    setIsResizing(true);
  };

  const onMouseUp = e => {
    setIsResizing(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Content className="main">
          <RequestsList width={width} />
          <Divider onMouseDown={onMouseDown} />
          <Map />
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
