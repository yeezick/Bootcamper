import { useDispatch } from 'react-redux';
import { Text, View } from 'react-native';
import { SinglePortfolioProject } from './SinglePortfolioProject';
import { uiActions } from '../../services/redux/slices/uiSlice';
import { updateUser } from '../../services/api/users';

export const ShowPortfolioProjects = ({ currUser }) => {
  const dispatch = useDispatch();

  const updateEditedProject = async (editedProject, updateType) => {
    const { portfolio_projects, _id: userID } = currUser;
    const { project_id: currentId } = editedProject;
    let copyPortfolioProjects = [...portfolio_projects];

    if (updateType === 'remove project') {
      copyPortfolioProjects = portfolio_projects.filter(
        (project) => project.project_id !== currentId
      );
    } else {
      const editedIdx = portfolio_projects.findIndex((project) => project.project_id === currentId);
      copyPortfolioProjects[editedIdx] = editedProject;
    }

    const res = await updateUser(userID, { portfolio_projects: copyPortfolioProjects });
    dispatch(uiActions.updateUser(res));
  };
  return (
    currUser?.portfolio_projects?.length > 0 && (
      // className="show-portfolio-wrapper
      <View>
        <Text> Your Portfolio Projects</Text>
        {currUser?.portfolio_projects?.map((project, idx) => (
          <SinglePortfolioProject
            key={`portfolioProject-${idx}`}
            project={project}
            updateEditedProject={updateEditedProject}
          />
        ))}
      </View>
    )
  );
};
