import React from 'react';
import styled from 'styled-components';
import { H6, TrezorImage } from '@trezor/components';
import { FormattedMessage } from 'react-intl';

import { State } from '@suite-types/index';
import { OnboardingActions } from '@suite/types/onboarding/onboarding';
import { OptionsList } from '@suite/components/onboarding/Options';
import {
    StepWrapper,
    StepHeadingWrapper,
    StepBodyWrapper,
} from '@suite/components/onboarding/Wrapper';
import * as STEP from '@suite/constants/onboarding/steps';

import l10nMessages from './index.messages';

const OptionWrapper = styled.div`
    text-align: center;
`;

const DEVICE_HEIGHT = 130;

interface Props {
    onboardingActions: OnboardingActions;
    device: State['onboarding']['connect']['device'];
    asNewDevice: State['onboarding']['asNewDevice'];
    model: State['onboarding']['selectedModel'];
}

const SelectDeviceStep = ({ onboardingActions, model, device, asNewDevice }: Props) => {
    const actualVersion =
        device && device.features && device.features.major_version
            ? device.features.major_version
            : null;

    return (
        <StepWrapper>
            <StepHeadingWrapper>
                <FormattedMessage {...l10nMessages.TR_SELECT_YOUR_DEVICE_HEADING} />
            </StepHeadingWrapper>
            <StepBodyWrapper>
                <OptionsList
                    options={[
                        {
                            content: (
                                <OptionWrapper data-test="select-device-1">
                                    <TrezorImage
                                        style={{ margin: '15px' }}
                                        model={1}
                                        height={DEVICE_HEIGHT}
                                    />
                                    <H6>
                                        <FormattedMessage {...l10nMessages.TR_MODEL_ONE} />
                                    </H6>
                                </OptionWrapper>
                            ),
                            value: 1,
                            key: 1,
                        },
                        {
                            content: (
                                <OptionWrapper data-test="select-device-2">
                                    <TrezorImage
                                        style={{ margin: '15px' }}
                                        model={2}
                                        height={DEVICE_HEIGHT}
                                    />
                                    <H6>
                                        <FormattedMessage {...l10nMessages.TR_MODEL_T} />
                                    </H6>
                                </OptionWrapper>
                            ),
                            value: 2,
                            key: 2,
                        },
                    ]}
                    selected={actualVersion || model}
                    onSelect={(value: number) => {
                        onboardingActions.selectTrezorModel(value);
                        onboardingActions.goToNextStep(
                            asNewDevice ? STEP.ID_UNBOXING_STEP : STEP.ID_CONNECT_STEP,
                        );
                    }}
                />
            </StepBodyWrapper>
        </StepWrapper>
    );
};

export default SelectDeviceStep;
