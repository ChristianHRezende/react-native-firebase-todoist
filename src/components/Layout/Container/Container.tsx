import React from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ContainerProps} from './types';
import LottieView from 'lottie-react-native';
import animationPath from 'assets/animations/animation.json';

export const Container = ({
  children,
  safeAreViewProps,
  scrollViewProps,
  screen,
  viewClassname = '',
  initializing = false,
}: ContainerProps) => {
  if (screen) {
    return (
      <SafeAreaView
        className={'bg-light-background dark:bg-dark-background h-100vh'}
        {...safeAreViewProps}>
        <ScrollView {...scrollViewProps}>
          <View className={'container px-4 h-screen ' + viewClassname}>
            {initializing ? (
              <LottieView
                source={animationPath}
                style={{width: 200, height: 200}}
                autoPlay
                loop
              />
            ) : (
              children
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return <View className="container px-4 py-2">{children}</View>;
};
