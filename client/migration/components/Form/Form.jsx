import { handleTextChange, handleToggle } from '../../services/utils/handlers';
import { SingleActionButton } from '../Button/SingleActionButton';
import { Text, TextInput, View, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export const Form = ({ formData, formState }) => {
  const { button, inputs } = formData;
  const [stateObject, setterFunction, handleSubmit] = formState;

  const submitForm = {
    handler: handleSubmit,
    title: button.text,
  };

  return (
    <View>
      {inputs.map((input) => (
        <View key={input.name} className="input-wrapper">
          <Text>{input.labelText}</Text>
          {input.type === 'select' ? (
            <Picker
              selectedValue={stateObject[input.name] ? stateObject[input.name] : 'Select a role'}
              onValueChange={(selectedValue) => {
                handleTextChange(selectedValue, input.name, setterFunction);
              }}
            >
              {input.options.map((option) => (
                <Picker.Item key={`${input.name}-${option}`} label={option} value={option} />
              ))}
            </Picker>
          ) : input.type === 'switch' ? (
            <Switch
              value={stateObject[input.name]}
              onValueChange={(e) => handleTextChange(e, input.name, setterFunction)}
            />
          ) : (
            <TextInput
              placeholder={input.name}
              value={stateObject[input.name]}
              onChangeText={(e) => handleTextChange(e, input.name, setterFunction)}
            />
          )}
        </View>
      ))}
      <SingleActionButton payload={submitForm} />
    </View>
  );
};
