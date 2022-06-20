import { Button, Text, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import uuid from 'react-native-uuid';
import { handleToggle } from '../../services/utils/handlers';

export const Applicants = ({ navigation, route }) => {
  const soloProject = useSelector((state) => state.projects.allProjects[0]);
  const [currProject, setCurrProject] = useState(null);
  const [engineers, setEngineers] = useState([]);
  const [designers, setDesigners] = useState([]);

  useEffect(() => {
    const setProject = async () => {
      if (!route.params) {
        setCurrProject(soloProject); // ultimately we shouldn't need this, since this screen only comes from SingleProject screen
      } else {
        setCurrProject(route.params.project);
      }

      const filterRoles = (role) => {
        return route.params.applicants.filter((applicant) => applicant.role === role);
      };

      setEngineers(() => filterRoles('Software Engineer'));
      setDesigners(() => filterRoles('UX Designer'));
    };
    setProject();
  }, [route.params]);

  if (currProject) {
    return (
      <ScrollView>
        <RoleList
          applicants={engineers}
          navigation={navigation}
          role={'Software Engineers'}
          currProject={currProject}
        />
        <RoleList
          applicants={designers}
          navigation={navigation}
          role={'UX Designers'}
          currProject={currProject}
        />
      </ScrollView>
    );
  } else {
    return <Text> LOADING OR UNAUTHORIZED </Text>;
  }
};

const RoleList = ({ applicants, navigation, role, currProject }) => {
  const [loadMore, toggleLoadMore] = useState(false);
  const [visibleList, setVisibleList] = useState([]);

  useEffect(() => {
    if (!applicants) {
      return;
    } else if (loadMore) {
      setVisibleList(applicants);
    } else {
      setVisibleList(applicants.slice(0, 3));
    }
  }, [loadMore, applicants]);

  if (visibleList.length > 0) {
    return (
      <View>
        {loadMore && <Button title="Show less" onPress={() => handleToggle(toggleLoadMore)} />}
        <Text style={styles.largerText}>{role}</Text>
        {visibleList.map((applicant) => (
          <TouchableOpacity
            key={uuid.v4()}
            onPress={() => {
              navigation.navigate('UserProfile', {
                ownerViewingApplicant: true,
                project: currProject,
                userID: applicant._id,
              });
            }}
          >
            <View>
              <View style={styles.applicantInfo}>
                <Text>IMAGE</Text>
                <Text
                  style={styles.boldText}
                >{`${applicant.first_name} ${applicant.last_name}`}</Text>
                <Text style={styles.boldText}>{`${applicant.role}`}</Text>
              </View>
              <Text
                style={styles.applicantMessage}
              >{`here is a personal message from ${applicant.first_name} about their application for this project and expressing their interest`}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {!loadMore && applicants.length > 3 && (
          <View style={styles.buttonContainer}>
            <Button title="Load more..." onPress={() => handleToggle(toggleLoadMore)} />
          </View>
        )}
      </View>
    );
  } else {
    return <Text>Loading or no applicants.</Text>;
  }
};

const styles = StyleSheet.create({
  applicantInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  applicantMessage: {
    textAlign: 'justify',
    paddingRight: 25,
    paddingLeft: 30,
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  largerText: {
    fontSize: 16,
  },
});
