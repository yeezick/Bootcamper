import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
// assets
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProjects } from '../../services/redux/slices/projectActions';
import { updateUserAndProject } from '../../services/api/projects';
import { addRejectedProject } from '../../services/redux/slices/uiActions';
import { projectActions } from '../../services/redux/slices/projectSlice';

// currently rerendering 5x
export const Roulette = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currProject, setCurrProject] = useState(null);
  const [currIndex, setCurrIndex] = useState(null);

  const { availableProjects, isLoaded } = useSelector((state) => state.projects);
  const { blacklisted_projects, user } = useSelector((state) => state.ui);

  // for inital render & filtering
  useEffect(() => {
    const showAvailableProjects = async () => {
      dispatch(fetchAllProjects(blacklisted_projects));
      //todo: figure out how to consider the projects that should be blacklisted for users. currently `availableProjects` reflects `allProjects` until `availableProjects` is updated on re-render
      setCurrProject(availableProjects[0]);
      setCurrIndex(0);
    };
    showAvailableProjects();
  }, [isLoaded]);

  useEffect(() => {
    // how do i eliminate the need to fetch all projects again?
  }, [currIndex, blacklisted_projects, user]);

  // console.log('user', user);
  const declineProject = async () => {
    const body = {
      rejected_projects: [...user.rejected_projects, currProject._id],
    };
    dispatch(addRejectedProject(user._id, body));

    const blackListedProjects = [...blacklisted_projects, currProject._id];
    dispatch(projectActions.updateBlacklistedProject(blackListedProjects));
    skipProject();
  };

  const showInterest = async () => {
    const { _id: projectId, interested_applicants } = currProject;
    const { _id: userId, interested_projects } = user;
    const body = {
      project: {
        projectId,
        projectUpdate: {
          interested_applicants: [...interested_applicants, userId],
        },
      },
      user: {
        userId,
        userUpdate: {
          interested_projects: [...interested_projects, projectId],
        },
      },
    };

    await updateUserAndProject(body);
    const blackListedProjects = [...blacklisted_projects, currProject._id];
    dispatch(projectActions.updateBlacklistedProject(blackListedProjects));
    skipProject();
  };

  const skipProject = () => {
    let newIndex = currIndex + 1;
    if (newIndex === availableProjects.length && availableProjects.length !== 0) {
      setCurrProject(availableProjects[0]);
      setCurrIndex(0);
    } else if (availableProjects.length === 0) {
      setCurrProject(null);
      setCurrIndex(null);
    } else {
      setCurrProject(availableProjects[newIndex]);
      setCurrIndex(newIndex);
    }
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
        {availableProjects.length === 1 ? null : (
          <button onClick={skipProject}>Skip for now</button>
        )}
        <button onClick={redirectToCreateProject}> Create my own</button>
      </div>
    </div>
  );
};
