import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { points } from '../../store/pointsSlice';
import { changeLoadingPoint } from '../../store/requestsSlice';
import { Select } from 'antd';

const PointSelect = ({ pointId, record, isLoadingPoints = true }) => {
  const dispatch = useDispatch();
  const pointsData = useSelector(points);

  const getChangedData = (pointId) => ({
    id: record.id,
    ...(isLoadingPoints ? { loadingPointId: +pointId } : { unloadingPointId: +pointId })
  });

  const handleChange = (value) => dispatch(changeLoadingPoint(getChangedData(value)));

  return (
    <Select defaultValue={pointsData?.[pointId].name} style={{ width: 200 }} onChange={handleChange}>
      {Object.keys(pointsData)?.map((id) =>
        (<Select.Option key={id} value={id}>
          {pointsData?.[id].name}
        </Select.Option>))}
    </Select>
  );
};

export default PointSelect;
