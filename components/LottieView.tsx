import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import LottieViewNative from 'lottie-react-native';

interface LottieViewProps {
  source: any;
  autoPlay?: boolean;
  loop?: boolean;
  style?: ViewStyle;
}

export default function LottieView({
  source,
  autoPlay = true,
  loop = true,
  style,
}: LottieViewProps) {
  const animationRef = useRef<LottieViewNative>(null);

  useEffect(() => {
    if (autoPlay && animationRef.current) {
      animationRef.current.play();
    }
  }, [autoPlay]);

  return (
    <View style={[styles.container, style]}>
      <LottieViewNative
        ref={animationRef}
        source={source}
        autoPlay={autoPlay}
        loop={loop}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});
