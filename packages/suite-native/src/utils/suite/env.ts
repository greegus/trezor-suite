/**
 * override for suite/utils/env - getUserAgent
 */
export const getUserAgent = () => {
    // todo: find a way how to tell userAgent equivalent on mobile
    // https://www.npmjs.com/package/react-native-device-info
    return 'some mobile device';
};

export const isMobile = () => true;
