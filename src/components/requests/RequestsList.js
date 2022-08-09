import React, { useMemo } from 'react';
import { Table } from 'antd';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { requestsTableData } from '../../store/requestsSlice';
import { loadingPoints } from '../../store/loadingPointsSlice';
import PointSelect from '../select/PointSelect';

const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Точка загрузки',
    dataIndex: 'loadingPointId',
    key: 'loadingPointId',
    render: (pointId, record, index) =>
      <PointSelect pointId={pointId}
                   isLoadingPoints
                   record={record}
                   index={index}
      />
  },
  {
    title: 'Точка разгрузки',
    dataIndex: 'unloadingPointId',
    key: 'unloadingPointId',
    render: (pointId, record, index) =>
      <PointSelect pointId={pointId}
                   isLoadingPoints={false}
                   record={record}
                   index={index}
      />
  },
];


const RequestsList = ({ width }) => {
  const requestData = useSelector(requestsTableData);
  const loadingPointsData = useSelector(loadingPoints);
  const dispatch = useDispatch();

  return (
    <Table className="table" columns={columns} dataSource={requestData} style={width ? { width } : {}}/>
  );
};

export default RequestsList;
