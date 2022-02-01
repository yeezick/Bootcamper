import { useEffect, useState } from 'react';
// assets
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProjects } from '../../services/redux/slices/projectActions';

export const Roulette = () => {
  const dispatch = useDispatch();
  const { projects, isLoaded } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [isLoaded]);

  return (
    <div>
      Roulette
      <>
        {projects?.map((project, idx) => (
          <h1 key={`${project.title}-${idx}`}>{project.title}</h1>
        ))}
      </>
    </div>
  );
};
