import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { uiActions } from '../../services/redux/slices/uiSlice';
import { getOneUser } from '../../services/api/users';
import { Linking, ScrollView, Text, View } from 'react-native';
import { handleTextChange } from '../../services/utils/handlers.js';
import { styles } from './styles';
import { OwnerOptions, DecisionModal } from './helpers.jsx';

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
