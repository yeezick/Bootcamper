import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Touchable } from 'react-native';
import { useSelector } from 'react-redux';
import { SingleActionButton } from '../components/Button/SingleActionButton';

export const UserDashboard = ({ navigation }) => {
  const { allProjects } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.ui);

  const { _id: userId, member_of_projects: projectIds } = user;
  const [myProjects, setMyProjects] = useState([]);

  const filterProjects = (allProjects) => {
    let projects = allProjects.filter(
      (project) => projectIds.indexOf(project._id) >= 0 || project.owner === userId
    );
    return projects;
  };

  useEffect(() => {
    setMyProjects(filterProjects(allProjects));
  }, [user]);

  const startProjectPayload = {
    handler: () => navigation.navigate('AddPortfolioProjects'),
    title: 'Start a Project'
  }

  return (
    <ScrollView>
      <View style={styles.fullPageContainer}>
      <Text style={styles.logo}>Bootcamper</Text>
      <View style={styles.section}>
        <Text style={styles.subtitle}>My Projects:</Text>
        {myProjects.map((project, idx) => {
          return (
            <ProjectBanner
              key={`myProject-${project._id}`}
              navigation={navigation}
              projectID={project._id}
              role={project.owner === userId ? 'Project Owner' : 'Collaborator'}
              title={project.title}
            />
          );
        })}
      </View>
      <View style={styles.centered}>
        <SingleActionButton  type="long" style="light" payload={startProjectPayload}></SingleActionButton>
      </View>
      </View>
    </ScrollView>
  );
};

const ProjectBanner = ({ title, role, projectID, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('SingleProject', {
          projectID: projectID,
        })
      }
    >
      <View style={styles.banner}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text>{role}</Text>
        </View>
        <Image style={styles.image}></Image>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  banner: {
    alignSelf: 'center',
    backgroundColor: '#cccccc',
    borderRadius: 5,
    margin: 7,
    padding: 10,
    width: '90%',
    // height: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
  }, 
  centered: {
    alignSelf: 'center',
    marginVertical: 30,
  },
  image: {
    backgroundColor: '#313131',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  logo: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: "900",
    margin: 20,
  },
  subtitle: {
    marginHorizontal: 20,
    marginVertical: 15,
    fontSize: 22,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 5,
  }
});
