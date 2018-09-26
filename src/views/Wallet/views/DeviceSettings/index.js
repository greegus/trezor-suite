import React from 'react';
import styled from 'styled-components';
import { H2 } from 'components/Heading';
import Icon from 'components/Icon';
import colors from 'config/colors';
import Button from 'components/Button';
import P from 'components/Paragraph';
import Link from 'components/Link';
import ICONS from 'config/icons';
import { connect } from 'react-redux';

const Section = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const Row = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledP = styled(P)`
    padding: 10px 0 15px 0;
    text-align: center;
`;

const DeviceSettings = () => (
    <Section>
        <Row>
            <Icon
                size={60}
                color={colors.WARNING_PRIMARY}
                icon={ICONS.WARNING}
            />
            <H2>Device settings is under construction</H2>
            <StyledP isSmaller>Please use Bitcoin wallet interface to change your device settings</StyledP>
            <Link href="https://wallet.trezor.io/">
                <Button>Take me to the Bitcoin wallet</Button>
            </Link>
        </Row>
    </Section>
);

export default connect(null, null)(DeviceSettings);
