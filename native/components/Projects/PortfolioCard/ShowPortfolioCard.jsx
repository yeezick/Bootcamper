import { useDispatch } from 'react-redux';
import { addRejectedProject } from '../../../services/redux/actions/uiActions';
import { View } from 'react-native';

export const ShowPortfolioProjects = ({ currUser }) => {
  const dispatch = useDispatch();

  const updateEditedProject = (editedProject, removeProject) => {
    const { portfolio_projects, _id: userId } = currUser;
    const { project_id: currentId } = editedProject;
    let copyPortfolioProjects = [...portfolio_projects];
    if (removeProject) {
      copyPortfolioProjects = portfolio_projects.filter(
        (project) => project.project_id !== currentId
      );
    } else {
      const editedIdx = portfolio_projects.findIndex((project) => project.project_id === currentId);
      copyPortfolioProjects[editedIdx] = editedProject;
    }
    dispatch(addRejectedProject(userId, { portfolio_projects: copyPortfolioProjects }));
  };
  return (
    currUser?.portfolio_projects?.length > 0 && (
      // className="show-portfolio-wrapper
      <View>
        <Text> Your Portfolio Projects</Text>
        {currUser?.portfolio_projects?.map((project, idx) => (
          <PortfolioProject
            key={`portfolioProject-${idx}`}
            project={project}
            updateEditedProject={updateEditedProject}
          />
        ))}
      </View>
    )
  );
};
