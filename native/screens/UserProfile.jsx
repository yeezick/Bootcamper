import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShowPortfolioProjects } from '../components/PortfolioCard/ShowPortfolioProjects.jsx';
import { uiActions } from '../services/redux/slices/uiSlice';
import { getOneUser } from '../services/api/users';
import { Button, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { handleTextChange } from '../services/utils/handlers.js';

export const UserProfile = ({ route, navigation }) => {
  const { user: reduxUser } = useSelector((state) => state.ui);
  const [reviewStatus, setReviewStatus] = useState({
    renderDecisionModal: false,
    ownerViewingApplicant: false,
    ownerDecision: false,
    ownerSubmittedDecision: false,
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

  const dispatch = useDispatch();
  const validUrl = `http://${reduxUser.portfolio_link}`;
  const { about, email, fun_fact, first_name, last_name, role, _id: currUserID } = currUser;
  const { ownerViewingApplicant, ownerSubmittedDecision } = reviewStatus;

  useEffect(() => {
    const toggleReviewSequence = () => {
      if (route.params.ownerViewingApplicant && !ownerSubmittedDecision) {
        handleTextChange(true, 'ownerViewingApplicant', setReviewStatus);
      }
    };
    toggleReviewSequence();
  }, []);

  useEffect(() => {
    const setUser = async () => {
      if (!route.params || route.params.userID === reduxUser._id) {
        setCurrUser(reduxUser);
      } else {
        const res = await getOneUser(route.params.userID); // must be tested
        setCurrUser(res);
      }
      dispatch(uiActions.toggleEditMode());
    };
    setUser();
  }, [route.params]);

  const handleEditMode = () => {
    dispatch(uiActions.toggleEditMode(true));
    navigation.navigate('EditProfile', {
      userID: currUserID,
    });
  };

  return (
    <ScrollView>
      {reduxUser._id === currUser._id && (
        <Button title="toggle edit mode" onPress={handleEditMode} />
      )}

      {ownerViewingApplicant && <OwnerOptions setReviewStatus={setReviewStatus} />}

      <DecisionModal
        applicantName={currUser.first_name}
        reviewStatus={reviewStatus}
        setReviewStatus={setReviewStatus}
      />

      <View>
        <Text>
          {first_name} {last_name}
        </Text>
        <Text>{role}</Text>
      </View>

      <Text> I AM AN IMAGE</Text>

      <View>
        <Text>{email}</Text>
        <Text>PORTFOLIO LINK</Text>
      </View>

      <View>
        <Text>{about}</Text>
      </View>

      <View>
        <Text>{fun_fact}</Text>
      </View>

      <ShowPortfolioProjects currUser={currUser} />
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

const DecisionModal = ({ applicantName, reviewStatus, setReviewStatus }) => {
  const { ownerDecision, renderDecisionModal } = reviewStatus;

  useEffect(() => {
    if (ownerDecision) {
      setTimeout(() => {
        handleTextChange(false, 'renderDecisionModal', setReviewStatus);
        handleTextChange(false, 'ownerViewingApplicant', setReviewStatus);
      }, 5000);
    }
  }, [ownerDecision]);

  return (
    <Modal visible={renderDecisionModal}>
      <View>
        {ownerDecision ? (
          <Text>{`${applicantName} has been added to your project!`}</Text>
        ) : (
          <>
            <Text>{`Reject ${applicantName}`}</Text>
            <Button
              title="Yes, reject."
              onPress={() => {
                handleTextChange(false, 'renderDecisionModal', setReviewStatus);
                handleTextChange(false, 'ownerViewingApplicant', setReviewStatus);
              }}
            />
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
