import { useEffect } from 'react';
import { Button, Modal, Text, View } from 'react-native';
import { handleTextChange } from '../../services/utils/handlers.js';
import { updateUserAndProject } from '../../services/api/projects.js';
import { fetchAllProjects } from '../../services/redux/actions/projectActions.js';

export const OwnerOptions = ({ setReviewStatus }) => {
  return (
    <View>
      <Text>{'REQUEST TO JOIN MESSAGE GOES HEREN LOREM IPSUM LATINN MORE LATIN IPSUM LOREM'}</Text>
      <Button
        title="Approve Request"
        onPress={() => {
          handleTextChange(true, 'renderDecisionModal', setReviewStatus);
          handleTextChange(true, 'ownerDecision', setReviewStatus);
        }}
      />
      <Button
        title="Reject Request"
        onPress={() => {
          handleTextChange(true, 'renderDecisionModal', setReviewStatus);
          handleTextChange(false, 'ownerDecision', setReviewStatus);
        }}
      />
    </View>
  );
};

export const DecisionModal = ({ applicant, navigation, reviewStatus, setReviewStatus }) => {
  const { _id: userID, first_name, interested_projects } = applicant;
  const { ownerDecision, renderDecisionModal } = reviewStatus;
  const {
    _id: projectID,
    team_members: projectMembers,
    interested_applicants,
  } = reviewStatus.ownerProject;

  let requestBody = {
    project: {
      projectID,
      projectUpdate: {
        // interested applicants has full applicant object
        interested_applicants: interested_applicants.filter((applicant) => applicant._id != userID),
      },
    },
    user: {
      userID,
      userUpdate: {
        // interested proejcts ONLY has project ID
        interested_projects: interested_projects.filter(
          (interestedProjectID) => interestedProjectID != projectID
        ),
      },
    },
  };

  useEffect(() => {
    if (ownerDecision) {
      setTimeout(() => {
        addToTeam();
        endReviewSequence();
      }, 5000);
    }
  }, [ownerDecision]);

  const endReviewSequence = () => {
    handleTextChange(false, 'renderDecisionModal', setReviewStatus);
    handleTextChange(false, 'ownerViewingApplicant', setReviewStatus);
    navigation.navigate('Applicants', {
      projectID,
    });
  };

  const rejectApplicant = async () => {
    await updateUserAndProject(requestBody);
    fetchAllProjects();
    endReviewSequence();
  };

  const addToTeam = async () => {
    requestBody = {
      ...requestBody,
      project: {
        ...requestBody.project,
        team_members: [...projectMembers, userID],
      },
    };
    await updateUserAndProject(requestBody);
    fetchAllProjects();
  };

  return (
    <Modal visible={renderDecisionModal}>
      <View>
        {ownerDecision ? (
          <Text>{`${first_name} has been added to your project!`}</Text>
        ) : (
          <>
            <Text>{`Reject ${first_name}`}</Text>
            <Button title="Yes, reject." onPress={rejectApplicant} />
            <Button
              title="Cancel"
              onPress={() => handleTextChange(false, 'renderDecisionModal', setReviewStatus)}
            />
          </>
        )}
      </View>
    </Modal>
  );
};

// export const AboutBox = (text, title) => {
//   return (
//       <View style={styles.wordContainer}>
//           <Text style={styles.title}>{title}</Text>
//           <Text style={styles.words}>{text}</Text>
//       </View>
//  )
// }

// hesitant to add this here since I'm not sure if we're keeping fun fun facts, if we are then it would make sense to make this code more dry
