import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
// assets
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProjects } from '../../services/redux/slices/projectActions';

// currently rerendering 5x
export const Roulette = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currProject, setCurrProject] = useState(null);
  const [currIndex, setCurrIndex] = useState(null);
  const { projects, isLoaded } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchAllProjects());
    setCurrProject(projects[0]);
    setCurrIndex(0);
  }, [isLoaded]);

  useEffect(() => {
    console.log('new project', currProject);
  }, [currProject]);

  console.log('project', currProject);
  const declineProject = () => {
    /* on click should 
      - add this project to blacklisted projects
      - add to user's rejected_projects

      then move on to next item
      */
    console.log('declining');
  };

  const showInterest = () => {
    /* on click should 
      projects: 
      interested_applicants
      
      user: 
      - interested_projects
      -
      then move on to next item
      */
    console.log('show interest');
  };

  const skipProject = () => {
    let newIndex = currIndex + 1;
    if (newIndex === projects.length - 1) {
      newIndex = 0;
    }
    setCurrProject(projects[newIndex]);
    setCurrIndex(newIndex);
  };

  const redirectToCreateProject = () => {
    navigate('/projects/:id/edit');
  };

  if (!currProject) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <header>Roulette</header>
      <div className="roulette-visual">I am an image</div>
      <p>{currProject.title}</p>
      <p>{currProject.description}</p>
      <div className="roulette-tools">
        <p> Built with:</p>
        {/* map thru tools */}
      </div>
      <p>{`Looking for collaboratos who can commit at least X hours per week`}</p>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button onClick={declineProject}>I'll Pass</button>
        <button onClick={showInterest}>I'm interested</button>
        <button onClick={skipProject}>Skip for now</button>
        <button onClick={redirectToCreateProject}> Create my own</button>
      </div>
    </div>
  );
};
