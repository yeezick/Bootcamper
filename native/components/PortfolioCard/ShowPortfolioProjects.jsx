import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { SinglePortfolioProject } from './SinglePortfolioProject';
import { uiActions } from '../../services/redux/slices/uiSlice';
import { updateUser } from '../../services/api/users';
import { useEffect } from 'react';

export const ShowPortfolioProjects = ({ currUser, navigation }) => {
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
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>PORTFOLIO</Text>
        {currUser?.portfolio_projects?.map((project, idx) => (
          <SinglePortfolioProject
            key={`portfolioProject-${idx}`}
            project={project}
            updateEditedProject={updateEditedProject}
            navigation={navigation}
          />
        ))}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#2F3030',
    borderRadius: 3,
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  }
})