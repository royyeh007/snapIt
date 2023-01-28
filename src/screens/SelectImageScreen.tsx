/**
 * Created by Dima Portenko on 30.06.2021
 */
import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {DemoButton, DemoResponse} from '../components/ui';
// import * as ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
// import {ImagePickerResponse} from 'react-native-image-picker/src/types';
import {SelectScreenNavigationProps} from '../navigation/Navigator';

import * as routes from '../navigation/routes';

type SelectImageScreenProps = {
  navigation: SelectScreenNavigationProps;
};

export const SelectImageScreen = ({navigation}: SelectImageScreenProps) => {
  const {width: windowWidth} = useWindowDimensions();
  const [aspectRatio, setAspectRation] = useState(1);
  const [response, setResponse] = useState<any | null>(null);

  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      // ImagePicker.launchCamera(options, setResponse);
      ImagePicker.openCamera(options).then(image => {
        console.log(image);
        setResponse(image)
        setAspectRation(response.height / response.width);
      });
    } else {
      // ImagePicker.launchImageLibrary(options, setResponse);
      ImagePicker.openPicker(options).then(image => {
        setResponse(image)
        setAspectRation(response.height / response.width);
      });
    }
  }, []);

  const onProcessImage = () => {
    if (response) {
      navigation.navigate(routes.PROCESS_IMAGE_SCREEN, {
        uri: ('file://' + response?.path),
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, flexDirection: 'column-reverse'}}>
        <View style={{flexDirection: 'row', paddingBottom: 8}}>
          <DemoButton key="Process Image" onPress={onProcessImage}>
            {'Process Image'}
          </DemoButton>
        </View>
        <View style={{flexDirection: 'row', paddingVertical: 8}}>
          <DemoButton
            key="Take Image"
            onPress={() =>
              onButtonPress('capture', {
                mediaType: 'photo',
                width: 1000, 
                height: 800, 
                cropping: true, 
                includeBase64: false, 
                compressImageQuality: 1
              })
            }>
            {'Take Image'}
          </DemoButton>
          <DemoButton
            key="Select Image"
            onPress={() =>
              onButtonPress('library', {
               width: 1000, 
               height: 800, 
               cropping: true, 
               includeBase64: false, 
               compressImageQuality: 1
              })
            }>
            {'Select Image'}
          </DemoButton>
        </View>
        {/* <View style={{paddingHorizontal: 8}}>
          <DemoResponse>{response}</DemoResponse>
        </View> */}
        {response &&
         
            <View key={response.path} style={styles.image}>
            <Image
            source={{ uri: response.path }}
            style={[styles.image, {width: windowWidth, height: windowWidth * aspectRatio }]}
          />
            </View>
          }
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    marginVertical: 90,
    alignItems: 'center'
  },
});
