import React, { useEffect } from 'react'
import BottomTabNavigation from "../../navigations/BottomTabNavigation"
import { useDispatch } from 'react-redux';
import { getTodos } from '../../../features/todos/todoThunks';

const HomeMain = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodos());
  }, []);
  return (
    <BottomTabNavigation />
  )
}

export default HomeMain