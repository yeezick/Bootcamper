import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
// assets
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProjects } from '../../services/redux/slices/projectActions';
import { updateUserAndProject } from '../../services/api/projects';
import { updateUser } from '../../services/api/users';

// currently rerendering 5x
export const Roulette = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currProject, setCurrProject] = useState(null);
  const [currIndex, setCurrIndex] = useState(null);
  const { projects, isLoaded } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchAllProjects());
    setCurrProject(projects[0]);
    setCurrIndex(0);
  }, [isLoaded]);

  useEffect(() => {
    console.log('new project', currProject);
  }, [currProject]);

  console.log('user', user);
  const declineProject = async () => {
    /* on click should 
      - add this project to blacklisted projects
      - add to user's rejected_projects

      then move on to next item
    */
    //  currently replacing user object with rejectedProjects in redux User store and adding the new project at the end
    // put method is not allowing the new project id to be ADDED to the user's rejected projects
    const body = {
      rejected_projects: [...user.rejected_projects, currProject._id],
    };
    const res = await updateUser(user._id, body);
    console.log('res', res);
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
    skipProject();
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
