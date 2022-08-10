import React, { useMemo } from 'react';
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

  const disabledPointId = useMemo(() => {
    if (isLoadingPoints) {
      return record.unloadingPointId;
    }
    return record.loadingPointId;
  }, [isLoadingPoints, record.loadingPointId, record.unloadingPointId]);

  const handleChange = (value) => {
    dispatch(changeLoadingPoint(getChangedData(value)));
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Select defaultValue={pointsData?.[pointId].name} style={{ width: 200 }} onChange={handleChange}>
        {Object.keys(pointsData)?.map((id) => {
            return (
              <Select.Option key={id} value={id} disabled={+id === disabledPointId}>
                {pointsData?.[id].name}
              </Select.Option>
            );
          }
        )
        }
      </Select>
    </div>
  );
};

export default PointSelect;
