import { useSelector } from "react-redux";
import _ from 'lodash';
import { useSelector } from 'react-redux';
export const GetState = () => {
  const state = useSelector((state) => _.get(state, "employees", ""));
};

export const GetMessages = () => {
  return useSelector((state) => state);
};
