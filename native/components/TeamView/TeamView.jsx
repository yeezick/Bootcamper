import { StyleSheet, Text, View } from 'react-native';

export const TeamView = ({ project }) => {
  return (
    <View className="team-view">
      <Text>Team Members:</Text>
      <View style={styles.memberCard}>
        <Text>{`${project.owner.first_name} ${project.owner.last_name}`}</Text>
        <Text>{project.owner.role}</Text>
      </View>
      {project.team_members.map((member) => (
        <View style={styles.memberCard}>
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
