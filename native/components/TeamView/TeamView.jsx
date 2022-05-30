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
      <View>
        <Text
          style={styles.member}
        >{`Owner: ${owner.first_name} ${owner.last_name}, ${owner.role}`}</Text>
      </View>
      {team.map((member) => (
        <View key={member._id}>
          <Text
            style={styles.member}
          >{`${member.first_name} ${member.last_name}, ${member.role}`}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  member: {
    margin: 2,
  },
});
