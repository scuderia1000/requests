import React, { useEffect, useRef, useState } from 'react';
import { Layout } from 'antd';
import './App.css';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import RequestsList from './components/requests/RequestsList';
import Map from './components/map/Map';
import Divider from './components/devider/Divider';
import MapContent from './components/map/MapContent';

const minWidthPercentage = 30;
const maxWidthPercentage = 70;

function App() {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(50);

  const onMouseMove = e => {
    if (isResizing) {
      const newWidth = e.clientX / window.innerWidth * 100;
      if (newWidth >= minWidthPercentage && newWidth <= maxWidthPercentage) {
        setWidth(newWidth);
      }

      e.preventDefault();
      e.stopPropagation();
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
          <Map content={<MapContent leftWidth={width} />} />
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
