import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getAllUsers, getOneUser } from '../../services/api/users';

export const TeamView = ({ project }) => {
  const [owner, setOwner] = useState({});
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const getOwner = async () => {
      const projectOwner = await getOneUser(project.owner);
      setOwner(projectOwner);
    };
    const getTeamMembers = async () => {
      const teamMembers = await getAllUsers();
      setTeam(teamMembers.filter((user) => project.team_members.includes(user._id)));
    };
    getOwner();
    getTeamMembers();
  }, []);

  return (
    <View className="team-view">
      <Text>Team Members:</Text>
      <View style={styles.memberCard}>
        <Text>{`Project Owner: ${owner.first_name} ${owner.last_name}`}</Text>
        <Text>{owner.role}</Text>
      </View>
      {team.map((member) => (
        <View key={member._id} style={styles.memberCard}>
          <Text>{`${member.first_name} ${member.last_name}`}</Text>
          <Text>{member.role}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  memberCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
