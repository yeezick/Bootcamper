import { Button, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import uuid from 'react-native-uuid';
import { handleToggle } from '../../services/utils/handlers';

export const Applicants = ({ navigation }) => {
  const soloProject = useSelector((state) => state.projects.allProjects[0]);
  const reduxUserID = useSelector((state) => state.ui.user._id);
  const [engineers, setEngineers] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [verifiedOwner, toggleVerifiedOwner] = useState(false);

  useEffect(() => {
    if (soloProject && soloProject.owner === reduxUserID) {
      toggleVerifiedOwner(true);
    } else {
      toggleVerifiedOwner(false);
      return;
    }

    const filterRoles = (role) => {
      return soloProject.interested_applicants?.filter((applicant) => applicant.role === role);
    };

    setEngineers(() => filterRoles('Software Engineer'));
    setDesigners(() => filterRoles('UX Designer'));
  }, [reduxUserID, soloProject]);

  if (verifiedOwner) {
    return (
      <ScrollView>
        <Text>Applications</Text>
        <RoleList
          applicants={engineers}
          navigation={navigation}
          role={'Software Developers'}
          soloProject={soloProject}
        />
        <Text>{'\nJUST A DIVIDER \n DONT MIND ME \n DELETE ME AFTER \n'}</Text>
        <RoleList
          applicants={designers}
          navigation={navigation}
          role={'UX Designers'}
          soloProject={soloProject}
        />
      </ScrollView>
    );
  } else {
    return <Text> LOADING OR UNAUTHORIZED </Text>;
  }
};

const RoleList = ({ applicants, navigation, role, soloProject }) => {
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
        <Text>{role}</Text>
        {visibleList.map((applicant) => (
          <TouchableOpacity
            key={uuid.v4()}
            onPress={() => {
              navigation.navigate('UserProfile', {
                ownerViewingApplicant: true,
                project: soloProject,
                userID: applicant._id,
              });
            }}
          >
            <View>
              <View>
                <Text>IMAGE</Text>
              </View>
              <Text>{`${applicant.first_name} ${applicant.last_name}`}</Text>
              <Text>{applicant.role}</Text>
              <Text>PERSONAL MESSAGE FROM APPLICANT</Text>
            </View>
          </TouchableOpacity>
        ))}
        {!loadMore && applicants.length > 3 && (
          <Button title="Load more..." onPress={() => handleToggle(toggleLoadMore)} />
        )}
      </View>
    );
  } else {
    return <Text>Loading or no applicants.</Text>;
  }
};
