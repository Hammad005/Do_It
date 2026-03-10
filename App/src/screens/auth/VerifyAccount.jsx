import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../../utils/colors';
import { ICON } from '../../utils/icons';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS } from '../../utils/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../../components/modal/CustomModal';

const VerifyAccount = () => {
    const [data, setAuthData] = useState({
        code: '',
    });
    const [modalVisible, setModalVisible] = useState(false);

    const handleVerify = () => {
        const formData = new FormData();
        formData.append('code', data.code);

        setModalVisible(true);
    };
    return (
        <>
        <CustomModal
        visible={modalVisible}
        title={`test@mail.com is verified`}
        navigate={'HomeMain'}
        onClose={() => setModalVisible(false)}
      />
        <LinearGradient
            colors={[colors.bgColor1, colors.bgColor2]}
            style={styles.mainContainer}
        >
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    scrollEnabled={false}
                    style={{ flex: 1 }}
                >
                    <View style={styles.container}>
                        <Text style={styles.mainTitle}>Verify account</Text>

                        {/* Box */}
                            <LinearGradient
                                colors={[colors.boxColor2, colors.boxColor3]}
                                style={styles.box}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <View style={styles.logoContainer}>
                                <Text style={styles.titleLogo}>Do It</Text>
                                </View>
                                <Text style={styles.smallText}>By verifying your account, you data will be secured and be default you are accepting our terms and policies</Text>

                                {/* Code Input */}
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        keyboardType="decimal-pad"
                                        value={data.code}
                                        onChangeText={text => setAuthData({ ...data, code: text })}
                                        placeholder="Verification code"
                                        placeholderTextColor={colors.authInputPlaceholder}
                                        style={styles.input}
                                    />
                                </View>

                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={handleVerify}
                                    activeOpacity={0.85}
                                >
                                    <Text style={styles.btnText}>Verify</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
        </>
    );
};

export default VerifyAccount;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    mainTitle: {
        textAlign: 'center',
        fontSize: 30,
        color: colors.white,
        fontFamily: FONTS.MEDIUM,
    },
    box: {
        justifyContent: 'center',
        alignItems: "center",
        minHeight: 468,
        borderRadius: 10,
        marginTop: 48,
        padding: 42,
    },
    logoContainer: {
        height: 63    
    },
    titleLogo: {
        fontSize: 36,
        color: colors.white,
        fontFamily: FONTS.LOGO_FONT,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    smallText: {
        fontSize: 16,
        color: colors.white,
        fontFamily: FONTS.MEDIUM,
        marginTop: 50

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 5,
        marginTop: 55,
        paddingHorizontal: 10,
        width: '100%',
    },
    input: {
        flex: 1,
        height: 42,
        fontFamily: FONTS.REGULAR,
        fontSize: 18,
        paddingTop: 0,
        paddingBottom: 0,
        color: '#000',
        textAlign: 'center',
    },
    btn: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 23,
        width: "100%"
    },
    btnText: {
        color: colors.white,
        fontFamily: FONTS.MEDIUM,
        fontSize: 18,
        letterSpacing: 1,
    },
    textInLineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 19,
        gap: 5,
    },
});
