import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// components
// import { DoubleActionButton } from '../../components/Button/DoubleActionButton';
// assets
import { addRejectedProject } from '../../services/redux/actions/uiActions';
import { showInterestInRoulette } from '../../services/redux/actions/projectActions';
// helpers
const selectProjects = (state) => state.projects

// currently rerendering 5x
export const Roulette = () => {
  const [currProject, setCurrProject] = useState(null);
  const [currIndex, setCurrIndex] = useState(null);
  const { availableProjects, isLoaded } = useSelector(selectProjects);

  useEffect(() => {
    const showAvailableProjects = () => {
      setCurrProject(availableProjects[0]);
      setCurrIndex(0);
    };
    showAvailableProjects();
  }, [isLoaded]);

  useEffect(() => {
    // how do i eliminate the need to fetch all projects again?
    // not doing anything
  }, [currIndex]);

  const rouletteButtonProps = {
    availableProjects,
    currIndex,
    currProject,
    setCurrIndex,
    setCurrProject,
  };

  if (!currProject) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <ProjectInfo project={currProject} />
      <RouletteButtons rouletteButtonProps={rouletteButtonProps} />
    </div>
  );
};

const ProjectInfo = ({ project }) => {
  return (
    <>
      <div className="roulette-visual">I am an image</div>
      <p>{project.title}</p>
      <p>{project.description}</p>
      <div className="roulette-tools">
        <p> Built with:</p>
        {project.tools?.map((tool) => (
          <p>{tool}</p>
        ))}
      </div>
      <p>{`Looking for collaborators who can commit at least X hours per week`}</p>
    </>
  );
};

const RouletteButtons = ({ rouletteButtonProps }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blacklisted_projects, finishedRegistration, user } = useSelector((state) => state.ui);
  const { availableProjects, currIndex, currProject, setCurrIndex, setCurrProject } =
    rouletteButtonProps;

  const declineProject = () => {
    const blacklistedProjects = [...blacklisted_projects, currProject._id];
    const body = {
      rejected_projects: [...user.rejected_projects, currProject._id],
    };

    dispatch(addRejectedProject(user._id, body, blacklistedProjects));
    skipProject();
  };

  const showInterest = () => {
    const { _id: projectId, interested_applicants } = currProject;
    const { _id: userId, interested_projects } = user;
    const blacklistedProjects = [...blacklisted_projects, currProject._id];
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

    dispatch(showInterestInRoulette(body, blacklistedProjects));
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {finishedRegistration ? (
        <>
          {/* <DoubleActionButton
            leftText="I'll Pass"
            leftOnClick={declineProject}
            rightText="I'm Interested"
            rightOnClick={showInterest}
          /> */}
          {availableProjects.length === 1 ? null : (
            <button onClick={skipProject}>Skip for now</button>
          )}
          <button onClick={redirectToCreateProject}> Create my own</button>
        </>
      ) : (
        <>
          {availableProjects.length === 1 ? null : (
            <button onClick={skipProject}>Skip for now</button>
          )}
        </>
      )}
    </div>
  );
};
