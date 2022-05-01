import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function OwnerView({ project }) {
  const navigation = useNavigation();
  const showUser = (applicantID) => {
    navigation.navigate('UserProfile', {
      userID: applicantID,
    });
  };
  const showApplicants = (id) => {
    navigation.navigate('Applicants', {
      projectID: id,
    });
  };

  return (
    <View>
      {project.interested_applicants?.length ? (
        <View>
          <Text>These users are interested in joining the project:</Text>
          {project.interested_applicants.slice(0, 3).map((applicant) => (
            <Pressable key={applicant._id} onPress={() => showUser(applicant._id)}>
              <Text>{`${applicant.first_name} ${applicant.last_name}, ${applicant.role}`}</Text>
            </Pressable>
          ))}
          {project.interested_applicants.length > 3 ? (
            <Pressable onPress={() => showApplicants(project._id)}>
              <Text>{`See all ${project.interested_applicants.length} applicants`}</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
