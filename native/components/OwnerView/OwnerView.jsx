import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/api/users';

export function OwnerView({ project }) {
  const [applicants, setApplicants] = useState([]);
  const navigation = useNavigation();

  const showUser = (applicantID) => {
    navigation.navigate('UserProfile', {
      userID: applicantID,
    });
  };

  const showApplicants = (project, applicants) => {
    navigation.navigate('Applicants', {
      project: project,
      applicants: applicants,
    });
  };
  useEffect(() => {
    const getApplicants = async () => {
      if (project.interested_applicants?.length) {
        const interested = await getAllUsers();
        setApplicants(
          interested.filter((user) => project.interested_applicants.includes(user._id))
        );
      }
    };
    getApplicants();
  }, []);

  return (
    <View>
      {project.interested_applicants?.length ? (
        <View>
          <Text>These users are interested in joining the project:</Text>
          {applicants.slice(0, 3).map((applicant) => (
            <Pressable key={applicant._id} onPress={() => showUser(applicant._id)}>
              <Text
                style={styles.applicant}
              >{`${applicant.first_name} ${applicant.last_name}, ${applicant.role}`}</Text>
            </Pressable>
          ))}
          {project.interested_applicants.length > 3 ? (
            <Pressable onPress={() => showApplicants(project, applicants)}>
              <Text>{`See all ${project.interested_applicants.length} applicants`}</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  applicant: {
    marginLeft: 5,
    marginVertical: 2,
  },
});
