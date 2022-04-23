/**
 * Params:
 * - Project ID
 *
 * * check if Project owner is redux user
 * * create 2 lists in state; one to hold each role; pass to ROLE COMPONENT
 *
 * ROLE COMPONENT
 * * only show 3 users initially
 * * "Load more" will show all other users
 * * OnPress user: lead to Applicant profile with custom modal component
 * * Add "application_message" to schema
 */
import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
export const Applications = () => {
  const soloProject = useSelector((state) => state.projects.allProjects[0]);
  const reduxUserID = useSelector((state) => state.ui.user._id);
  const [engineers, setEngineers] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [verifiedOwner, toggleVerifiedOwner] = useState(false);

  useEffect(() => {
    if (soloProject.owner === reduxUserID) {
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
      <View>
        <Text>Applications</Text>
      </View>
    );
  } else {
    return <Text> LOADING OR UNAUTHORIZED </Text>;
  }
};
