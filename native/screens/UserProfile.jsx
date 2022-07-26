import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShowPortfolioProjects } from '../components/PortfolioCard/ShowPortfolioProjects.jsx';
import { uiActions } from '../services/redux/slices/uiSlice';
import { getOneUser } from '../services/api/users';
import { Button, Image, Modal, ScrollView, StyleSheet, Text, Linking, TouchableOpacity, View } from 'react-native';
import { handleTextChange } from '../services/utils/handlers.js';
import { updateUserAndProject } from '../services/api/projects.js';
import { fetchAllProjects } from '../services/redux/actions/projectActions.js';
import { Octicons } from '@expo/vector-icons';

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
  const { about, email, fun_fact, first_name, last_name, role, _id: currUserID } = currUser;
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
    <ScrollView contentContainerStyle={styles.screenContainer}>
      {reduxUser._id === currUser._id && (
        // <Button title="EDIT PROFILE" onPress={handleEditMode} />
        <TouchableOpacity style={styles.iconButtonContainer} onPress={handleEditMode} >
          <View style={styles.iconButton}>
            <Octicons name="pencil" size={20} />
          </View>
          <Text style={styles.buttonText}>EDIT PROFILE</Text>
        </TouchableOpacity>
      )}

      {ownerViewingApplicant && <OwnerOptions setReviewStatus={setReviewStatus} />}

      {renderDecisionModal && (
        <DecisionModal
          applicant={currUser}
          navigation={navigation}
          reviewStatus={reviewStatus}
          setReviewStatus={setReviewStatus} />
      )}
      <Image style={styles.profilePhoto}/>
      <View style={styles.userHeader}>
        <Text style={styles.userName}>{first_name} {last_name}</Text>
        <Text>{role}</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.title}>ABOUT USER</Text>
        <Text style={styles.text}>{about}</Text>
      </View>

      <TouchableOpacity 
        style={styles.sectionContainer} 
        onPress={() => Linking.openURL(validUrl)}>
        <Text style={styles.title}>
          VISIT {first_name.toUpperCase()} {last_name.toUpperCase()}'S PORTFOLIO
        </Text>
      </TouchableOpacity>

      <View>
        <Text>{fun_fact}</Text>
      </View>

      <ShowPortfolioProjects currUser={currUser} navigation={navigation}/>
      
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
  buttonText: {
    fontSize: 12,
  },
  iconButton: {
    borderWidth: 2,
    borderRadius: 100,
    padding: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 15,
    color: 'black',
  },
  iconButtonContainer: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    marginTop: 5,
  },
  profilePhoto: {
    backgroundColor: '#C4C4C4',
    borderRadius: 80,
    width: 140,
    height: 140,
    top: -50,
  },
  screenContainer: {
    alignItems: 'center',
    width: '100%',
    margin: 0
  },
  sectionContainer: {
    backgroundColor: '#2F3030',
    borderRadius: 3,
    padding: 10,
    width: 340,
    marginTop: 15,
  },
  text: {
    color: 'white',
    marginVertical: 5,
    fontSize: 12,
  },
  title: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  userHeader: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    top: -40,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
  }
})