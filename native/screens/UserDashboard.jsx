import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity} from "react-native";
import { useSelector } from 'react-redux';


export const UserDashboard = ({navigation}) => {
  const { allProjects } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.ui);

  const { _id: userId, member_of_projects: projectIds } = user
  const [myProjects, setMyProjects] = useState([]);

  const filterProjects = (allProjects) => {
    let projects = allProjects.filter((project) => projectIds.indexOf(project._id) >= 0 || project.owner === userId)
    return projects
  };

  useEffect(() => {
    setMyProjects(filterProjects(allProjects))
  },[user]);

  
  return (
    <ScrollView>
      <Text>Bootcamper logo Placeholder</Text>
      <View>
        <Text>My Projects:</Text>
          {myProjects.map((project)=> {
            return (
              <ProjectBanner 
                title={project.title}
                role={project.owner === userId ? "Project Owner" : "Collaborator"}
                projectID={project._id}
                navigation={navigation}
              />
            )
        })}
      </View>
      <Button 
        title="Start a Project" 
        onPress={() => navigation.navigate('CreateProject')} 
      />
    </ScrollView>
  );
};


const ProjectBanner = ({title, role, projectID, navigation}) => {
  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('SingleProject', {
        projectID: projectID,
      })}>
        <View>
          <Text>{title}</Text>
          <Text>{role}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

})

