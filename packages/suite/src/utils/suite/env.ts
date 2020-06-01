/**
 * method does not do much, but still it is useful as we do not
 * have navigator.userAgent in native. This way we may define
 * overrides only for simple utils and do not need to rewrite entire files
 * for example actions or middlewares
 */
export const getUserAgent = () => {
    return navigator.userAgent;
};

/**
 * suiteParsedUserAgent is set only for suite-web. it is injected into window object from browser check
 * more details in: packages/suite-data/files/browser-detection/index.js
 */
export const isMobile = () => {
    // @ts-ignore
    if (typeof window.suiteParsedUserAgent === 'undefined') return;
    // @ts-ignore
    return window.suiteParsedUserAgent.device.type === 'mobile';
};
