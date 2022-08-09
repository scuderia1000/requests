import React, { useMemo } from 'react';
import { Select, Space, Table, Tag } from 'antd';
import './style.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectCount } from '../../features/counter/counterSlice';
import { requests, requestsCount, requestsTableData } from '../../store/requestsSlice';
import { Option } from 'antd/es/mentions';
import { loadingPoints } from '../../store/loadingPointsSlice';
import { unloadingPoints } from '../../store/unloadingPointsSlice';

// const columns = [
//   {
//     title: 'Название',
//     dataIndex: 'name',
//     key: 'name',
//     // render: (text) => <a>{text}</a>,
//   },
//   {
//     title: 'Точка загрузки',
//     dataIndex: 'loadingPointId',
//     // dataIndex: ['loadingPoint', 'name'],
//     key: 'loadingPointId',
//     // key: 'loadingPoint',
//     render: (text) => {
//       console.log('text', text);
//
//       return (
//         <Select defaultValue="lucy" style={{ width: 120 }}>
//           <Option value="jack">Jack</Option>
//           <Option value="lucy">Lucy</Option>
//           <Option value="disabled" disabled>
//             Disabled
//           </Option>
//           <Option value="Yiminghe">yiminghe</Option>
//         </Select>
//       );
//     },
//   },
//   {
//     title: 'Точка разгрузки',
//     dataIndex: ['unloadingPoint', 'name'],
//     key: 'unloadingPoint',
//   },
// ];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const PointSelect = ({ pointId, isLoadingPoints = true }) => {
  const pointsData = useSelector(isLoadingPoints ? loadingPoints : unloadingPoints);

  return (
    <Select defaultValue={pointsData?.[pointId].name} style={{ width: 120 }}>
      {Object.keys(pointsData)?.map((id) =>
        (<Select.Option key={id} value={pointsData?.[id].name}>
          {pointsData?.[id].name}
        </Select.Option>))}
    </Select>
  );
};
const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'Точка загрузки',
    dataIndex: 'loadingPointId',
    key: 'loadingPointId',
    render: (loadingPointId) => <PointSelect pointId={loadingPointId} isLoadingPoints />
  },
  {
    title: 'Точка разгрузки',
    dataIndex: 'unloadingPointId',
    key: 'unloadingPointId',
    render: (unloadingPointId) => <PointSelect pointId={unloadingPointId} isLoadingPoints={false} />
  },
];


const RequestsList = ({ width }) => {
  const requestData = useSelector(requestsTableData);
  const loadingPointsData = useSelector(loadingPoints);
  const dispatch = useDispatch();
  console.log('requestData', requestData);



  return (
    <Table className="table" columns={columns} dataSource={requestData} style={width ? { width } : {}}/>
  );
};

export default RequestsList;
