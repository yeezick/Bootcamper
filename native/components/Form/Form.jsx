import { handleTextChange } from '../../services/utils/handlers';
import { SingleActionButton } from '../Button/SingleActionButton';
import { Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export const Form = ({ formData, formState }) => {
  const { button, handlers, inputs } = formData;
  const [stateObject, setterFunction, handleSubmit] = formState;

  const submitForm = {
    handler: handleSubmit,
    text: button.text,
    type: 'api',
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
          ) : (
            <TextInput
              placeholder={input.name}
              value={stateObject[input.name]}
              onChangeText={(e) => handleTextChange(e, input.name, setterFunction)}
            />
          )}
        </View>
      ))}
      <SingleActionButton text={button.text} payload={submitForm} />
    </View>
  );
};
