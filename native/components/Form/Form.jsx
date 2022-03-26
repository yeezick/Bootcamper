import React from 'react';
// import parseHtml from 'html-react-parser';
import { handleChange } from '../../services/utils/formHandlers';
import { SingleActionButton } from '../Button/SingleActionButton';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export const Form = ({ formData, formState }) => {
  const { button, handlers, inputs } = formData;
  const [stateObject, setterFunction, handleSubmit] = formState;

  const submitForm = {
    path: 'UserProfile',
    text: button.text,
    type: 'reroute',
  };
  console.log('data', formData);
  console.log('state', formState);

  return (
    // form
    <View>
      {inputs.map((input) => (
        <View key={input.name} className="input-wrapper">
          {/* select wrapper */}
          <View>
            <Text>{input.labelText}</Text>
          </View>
          {/* <label htmlFor={input.name}>{parseHtml(input.labelText)}</label> */}
          {input.type === 'select' ? (
            <Picker
            // defaultValue={input.options[0]}
            // onValueChange={(e) => handleChange(e, input.name, setterFunction)}
            >
              {input.options.map((option) => (
                <Picker.Item key={`${input.name}-${option}`} label={option} value={option} />
              ))}
            </Picker>
          ) : (
            <TextInput
              placeholder={input.name}
              value={stateObject[input.name]}
              onChangeText={(e) => console.log(e)}
            />
            //  {/* onChange={(e) => handleChange(e, input.name, setterFunction)}
            //    type={input.type}
            //   required={input.required ? true : null} */}
          )}
        </View>
      ))}
      {/* button takes handle submit */}
      <SingleActionButton text={button.text} payload={submitForm} />
    </View>
  );
};
