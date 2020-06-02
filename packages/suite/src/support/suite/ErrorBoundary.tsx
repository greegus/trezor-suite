import React from 'react';
import styled from 'styled-components';
import * as Sentry from '@sentry/browser';
import { H1, P, Button } from '@trezor/components';
import { connect } from 'react-redux';
import { AppState } from '@suite/types/suite';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 20px;
`;

const Buttons = styled.div`
    display: flex;
`;

const StyledButton = styled(Button)`
    margin: 12px;
`;

// Cant use hook https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes

interface StateProps {
    error: Error | null | undefined;
}

const mapStateToProps = (state: AppState) => ({
    log: state.log,
    analytics: state.analytics,
});

type Props = ReturnType<typeof mapStateToProps>;

class ErrorBoundary extends React.Component<Props, StateProps> {
    constructor(props: Props) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error: Error | null, _errorInfo: object) {
        const log = JSON.stringify(this.props.log.entries, null, 2);
        console.log('log', log);
        Sentry.configureScope(scope => {
            scope.setExtra('log', log);
            scope.setUser({ id: this.props.analytics.instanceId });
        });
        this.setState({ error });
        // todo: not in development and in production only if user opts in.
        // Sentry.withScope(scope => {
        //     scope.setExtras(errorInfo);
        // });
    }

    render() {
        if (this.state.error) {
            // render fallback UI
            return (
                <Wrapper>
                    <H1>Error occurred</H1>
                    <P>It appears something is broken. You might let us know by sending report</P>
                    <P>{this.state.error.message}</P>
                    {/* <P>{this.state.error.stack}</P> */}

                    <Buttons>
                        <StyledButton
                            onClick={() => {
                                Sentry.showReportDialog();
                            }}
                        >
                            Send report
                        </StyledButton>

                        <StyledButton
                            icon="REFRESH"
                            onClick={() => {
                                // @ts-ignore global.ipcRenderer is declared in @desktop/preloader.js
                                const { ipcRenderer } = global;
                                if (ipcRenderer) {
                                    // relaunch desktop app
                                    ipcRenderer.send('restart-app');
                                } else {
                                    window.location.reload();
                                }
                            }}
                        >
                            Reload window
                        </StyledButton>
                    </Buttons>
                </Wrapper>
            );
        }

        // when there's not an error, render children untouched
        return this.props.children;
    }
}

export default connect(mapStateToProps)(ErrorBoundary);

// In case we would like to translate these. Not possible now, ErrorBoundary is not nested in
// IntlProvider. Not sure if we need so much to have this translated here.

// import { Translation } from '@suite-components/Translation';
//

// TR_ERROR_OCCURRED: {
//     id: 'TR_ERROR_OCCURRED',
//     defaultMessage: 'Error occurred',
// },
// TR_IT_APPEARS_SOMETHING_IS_BROKEN: {
//     id: 'TR_IT_APPEARS_SOMETHING_IS_BROKEN',
//     defaultMessage: 'It appears something is broken. You might let us know by sending report',
// },
// TR_SEND_REPORT: {
//     id: 'TR_SEND_REPORT',
//     defaultMessage: 'Send report',
// },
// TR_RELOAD_WINDOW: {
//     id: 'TR_RELOAD_WINDOW',
//     defaultMessage: 'Reload window',
// },
