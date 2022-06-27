import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ShowPortfolioProjects } from '../components/PortfolioCard/ShowPortfolioProjects.jsx';
import { uiActions } from '../services/redux/slices/uiSlice';
import { getOneUser } from '../services/api/users';
import { Button, Linking, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { handleTextChange } from '../services/utils/handlers.js';
import { updateUserAndProject } from '../services/api/projects.js';
import { fetchAllProjects } from '../services/redux/actions/projectActions.js';

export const UserProfile = ({ route, navigation }) => {
  const [reviewStatus, setReviewStatus] = useState({
    renderDecisionModal: false,
    ownerViewingApplicant: false, // is it best practice to leave "owner" or to remove it? (save 5 keystrokes)
    ownerDecision: false,
    ownerSubmittedDecision: false,
    ownerProject: null,
  });
  const [currUser, setCurrUser] = useState({
    first_name: '',
    last_name: '',
    role: '',
    email: '',
    about: '',
    fun_fact: '',
    portfolio_link: '',
  });

  const { user: reduxUser } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const validUrl = `http://${reduxUser.portfolio_link}`;
  const {
    about,
    email,
    fun_fact,
    first_name,
    last_name,
    portfolio_link,
    role,
    _id: currUserID,
  } = currUser;
  const { ownerViewingApplicant, ownerSubmittedDecision, renderDecisionModal } = reviewStatus;

  useEffect(() => {
    if (route.params && currUserID != route.params.project.owner) {
      const toggleReviewSequence = () => {
        const userInInterestedApplicants = route.params.project.interested_applicants.filter(
          (applicant) => applicant._id === currUser._id
        );
        if (route.params.ownerViewingApplicant && !ownerSubmittedDecision) {
          handleTextChange(true, 'ownerViewingApplicant', setReviewStatus);
          handleTextChange(route.params.project, 'ownerProject', setReviewStatus);
        } else if (route.params.ownerViewingApplicant && userInInterestedApplicants.length > 0) {
          setReviewStatus({
            renderDecisionModal: false,
            ownerViewingApplicant: true, // is it best practice to leave "owner" or to remove it? (save 5 keystrokes)
            ownerDecision: false,
            ownerSubmittedDecision: false,
            ownerProject: route.params.project,
          });
        }
      };
      toggleReviewSequence();
    }
  }, [route.params]);

  useEffect(() => {
    const setUser = async () => {
      if (!route.params && !reduxUser) {
        setCurrUser({
          first_name: 'NO',
          last_name: 'USER',
          role: '',
          email: '',
          about: '',
          fun_fact: '',
          portfolio_link: '',
        });
      } else if (!route.params || route.params.userID === reduxUser._id) {
        setCurrUser(reduxUser);
      } else {
        const res = await getOneUser(route.params.userID); // must be tested
        setCurrUser(res);
      }
      dispatch(uiActions.toggleEditMode());
    };
    setUser();
  }, [route.params, reduxUser]);

  const handleEditMode = () => {
    dispatch(uiActions.toggleEditMode(true));
    navigation.navigate('EditProfile', {
      userID: currUserID,
    });
  };

  return (
    <ScrollView>
      {reduxUser._id === currUser._id && (
        <View style={styles.editContainer}>
          <Ionicons name="create" onPress={handleEditMode} style={styles.editButton} />
          <Text>Edit Profile</Text>
        </View>
      )}

      {ownerViewingApplicant && <OwnerOptions setReviewStatus={setReviewStatus} />}

      {renderDecisionModal && (
        <DecisionModal
          applicant={currUser}
          navigation={navigation}
          reviewStatus={reviewStatus}
          setReviewStatus={setReviewStatus}
        />
      )}
      <View style={styles.nameContainer}>
        <View style={styles.placeholderImage}></View>
        <Text style={styles.name}>
          {first_name} {last_name}
        </Text>
        <Text>{role}</Text>
      </View>

      <View style={styles.wordContainer}>
        <Text style={styles.title}>ABOUT</Text>
        <Text style={styles.words}>{about}</Text>
      </View>

      <View style={styles.wordContainer}>
        <Text style={styles.title}>FUN FACT</Text>
        <Text style={styles.words}>{fun_fact}</Text>
      </View>

      <View style={styles.wordContainer}>
        <Text style={styles.portfolio} onPress={() => Linking.openURL(`${portfolio_link}`)}>
          {' '}
          Portfolio{' '}
        </Text>
      </View>
    </ScrollView>
  );
};

const OwnerOptions = ({ setReviewStatus }) => {
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

const DecisionModal = ({ applicant, navigation, reviewStatus, setReviewStatus }) => {
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

const styles = StyleSheet.create({
  editContainer: {
    alignItems: 'flex-end',
    marginRight: 5,
  },
  editButton: {
    fontSize: 45,
    marginRight: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  nameContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  placeholderImage: {
    borderRadius: 100,
    backgroundColor: '#c4c4c4',
    height: 150,
    width: 150,
  },
  portfolio: {
    color: 'white',
    fontSize: 35,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  words: {
    color: 'white',
    marginHorizontal: 10,
  },
  wordContainer: {
    backgroundColor: '#313131',
    marginHorizontal: 15,
    marginTop: 15,
  },
});
