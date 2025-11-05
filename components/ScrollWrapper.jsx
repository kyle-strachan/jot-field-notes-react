// ScrollWrapper.js
import React from "react";
import {
    Keyboard,
    TouchableWithoutFeedback,
    Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ScrollWrapper({ children, style }) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView
                contentContainerStyle={style}
                enableOnAndroid
                extraScrollHeight={5}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {children}
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    );
}
