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
  header = false,
}: ContainerProps) => {
  if (screen) {
    const height = header ? 'h-100vh' : 'h-[calc(100vh - 100px)]';
    const lottieViewStyle = {width: 200, height: 200};
    return (
      <SafeAreaView
        className={`bg-light-background dark:bg-dark-background ${height}`}
        {...safeAreViewProps}>
        <View {...scrollViewProps}>
          <View className={'container px-4 h-screen ' + viewClassname}>
            {initializing ? (
              <LottieView
                source={animationPath}
                style={lottieViewStyle}
                autoPlay
                loop
              />
            ) : (
              children
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return <View className="container px-4 py-2">{children}</View>;
};
