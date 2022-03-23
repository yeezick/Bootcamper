import React from 'react';
import parseHtml from 'html-react-parser';
import { handleChange } from '../../services/utils/formHandlers';
import { SingleActionButton } from '../Button/SingleActionButton';
import { TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export const Form = ({ formData, formState }) => {
  const { button, handlers, inputs } = formData;
  const [stateObject, setterFunction, handleSubmit] = formState;

  return (
    // form
    <View>
      {inputs.map((input) => (
        <View key={input.name} className="input-wrapper">
          {/* select wrapper */}
          <View>
            <Text>PARSE HTML: {input.name}</Text>
          </View>
          <label htmlFor={input.name}>{parseHtml(input.labelText)}</label>
          {input.type === 'select' ? (
            <>
              <Picker
                selectedValue={input.options[0]}
                // onValueChange={(e) => handleChange(e, input.name, setterFunction)}
              >
                {input.options.map((option) => (
                  <Picker.Item label={input.name} value={option} />
                ))}
              </Picker>
            </>
          ) : (
            <View>
              <Text>{input.name}</Text>
              <TextInput
                placeholder={input.name}
                value={stateObject[input.name]}
                onChangeText={(e) => console.log(e)}
              />
            </View>
            //   onChange={(e) => handleChange(e, input.name, setterFunction)}
            //   type={input.type}
            //   required={input.required ? true : null}
          )}
        </View>
      ))}
      {/* button takes handle submit */}
      <SingleActionButton text={button.text} type="submit" />
    </View>
  );
};
