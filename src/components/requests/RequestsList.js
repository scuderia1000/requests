import React, { useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { requestsTableData, selectRequest } from '../../store/requestsSlice';
import PointSelect from '../select/PointSelect';
import { clearRoute } from '../../store/pointsSlice';
import './style.css';

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
  const [selectedRowId, setSelectedRowId] = useState(undefined);
  const requestData = useSelector(requestsTableData);
  const dispatch = useDispatch();

  const handleRowClick = ({ id }) => () => {
    if (id === selectedRowId) {
      setSelectedRowId(undefined);
      dispatch(selectRequest({ id, isSelected: false }));
      dispatch(clearRoute());
    } else {
      setSelectedRowId(id);
      dispatch(selectRequest({ id, isSelected: true }));
    }
  };

  return (
    <Table className="table"
           columns={columns}
           dataSource={requestData}
           style={width ? { width: `${width}%` } : {}}
           onRow={(record) => {
             return {
               onClick: handleRowClick(record),
             };
           }}
           rowClassName={(record) => record.id === selectedRowId ? 'selected' : ''}
           pagination={{
             hideOnSinglePage: true,
           }}
    />
  );
};

export default RequestsList;
