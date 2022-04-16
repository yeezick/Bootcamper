import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// components
import { DoubleActionButton } from '../components/Button/DoubleActionButton';
// assets
import { addRejectedProject } from '../services/redux/actions/uiActions';
import { showInterestInRoulette } from '../services/redux/actions/projectActions';
import { Button, StyleSheet, Text, View } from 'react-native';

// currently rerendering 5x
export const Roulette = ({ navigation }) => {
  const [currProject, setCurrProject] = useState(null);
  const [currIndex, setCurrIndex] = useState(null);

  const { availableProjects, isLoaded } = useSelector((state) => state.projects);

  useEffect(() => {
    const showAvailableProjects = async () => {
      setCurrProject(availableProjects[0]);
      setCurrIndex(0);
    };
    showAvailableProjects();
  }, [isLoaded]);

  useEffect(() => {
    // used to keep available projects updated
  }, [currIndex]);

  const rouletteButtonProps = {
    availableProjects,
    currIndex,
    currProject,
    setCurrIndex,
    setCurrProject,
  };

  if (!currProject) {
    return <Text>Loading</Text>;
  }

  return (
    <View>
      <ProjectInfo project={currProject} />
      <RouletteButtons navigation={navigation} rouletteButtonProps={rouletteButtonProps} />
    </View>
  );
};

const ProjectInfo = ({ project }) => {
  return (
    // classname="roulette-visual"
    <View>
      <Text>I am an image</Text>
      <Text>{project.title}</Text>
      <Text>{project.description}</Text>
      <View className="roulette-tools">
        <Text> Built with:</Text>
        {project.tools?.map((tool) => (
          <Text>{tool}</Text>
        ))}
      </View>
      <Text>{`Looking for collaborators who can commit at least X hours per week`}</Text>
    </View>
  );
};

const RouletteButtons = ({ navigation, rouletteButtonProps }) => {
  const dispatch = useDispatch();
  const { blacklisted_projects, finishedRegistration, user } = useSelector((state) => state.ui);
  const { availableProjects, currIndex, currProject, setCurrIndex, setCurrProject } =
    rouletteButtonProps;

  const declineProject = async () => {
    const blacklistedProjects = [...blacklisted_projects, currProject._id];
    const body = {
      rejected_projects: [...user.rejected_projects, currProject._id],
    };

    dispatch(addRejectedProject(user._id, body, blacklistedProjects));
    skipProject();
  };

  const showInterest = async () => {
    const { _id: projectId, interested_applicants } = currProject;
    const { _id: userId, interested_projects } = user;
    const blacklistedProjects = [...blacklisted_projects, currProject._id];
    const body = {
      project: {
        projectId,
        projectUpdate: {
          interested_applicants: [...interested_applicants, userId], // user ID , or a user instance // [...interested_applicants, {userID: userId, message?: 'hello'}]
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
    navigation.navigate('CreateProject');
  };

  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      {finishedRegistration ? (
        <>
          <DoubleActionButton
            leftText="I'll Pass"
            leftOnClick={declineProject}
            rightText="I'm Interested"
            rightOnClick={showInterest}
          />
          {availableProjects.length === 1 ? null : (
            <Button title="Skip for now" onPress={skipProject} />
          )}
          <Button title="Create my own" onPress={redirectToCreateProject} />
        </>
      ) : (
        <>
          {availableProjects.length === 1 ? null : (
            <Button title="Skip for now" onClick={skipProject} />
          )}
        </>
      )}
    </View>
  );
};
