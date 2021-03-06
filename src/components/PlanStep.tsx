import * as React from 'react';
import { connect} from 'react-redux';
import { IIndexHolder } from './Plan';
import { IConnectedReduxProps, IQuestionnaireState, PlanStepId, VotingStateId } from '../store';
import { getPlanStepStrings, planStepHeaderFormattedString, StringId } from '../strings';
import { default as CallToAction } from './CallToAction';

import plan_circle_on from './plan_circle_on.png';

import './PlanStep.css';

interface IPlanStepProps {
	indexHolder: IIndexHolder,
	planStepId: PlanStepId,
	votingStateId: VotingStateId,
}

interface IPropsFromState {
    getString: (id: StringId) => string;
}

class PlanStep extends React.Component<IPlanStepProps & IPropsFromState & IConnectedReduxProps, any> {
	public render() {
		const { indexHolder, planStepId, votingStateId } = this.props;

		const { header, text, callToAction, link } = getPlanStepStrings(planStepId, votingStateId);

		const fullHeaderString = planStepHeaderFormattedString(indexHolder.index, this.props.getString(header));

		// Increment the index holder so that the next plan step uses the next number.
		indexHolder.index++;
		
		return (
			<div key={planStepId}>
				<div className="plan-step-header VotingVoices-sans-serif">{this.checkboxElement()}{fullHeaderString}</div>
				<div className="plan-step-text VotingVoices-serif" dangerouslySetInnerHTML={ { __html: this.props.getString(text)} } />

				{ this.showBallotReady(planStepId) ?
					this.ballotReadyWidget(callToAction, link) :
					( <CallToAction {...this.props} callToAction={callToAction} link={link} /> ) }
			</div>
		);
	}

	private checkboxElement(): JSX.Element {
		return <img className="plan-step-checkbox" src={plan_circle_on} />
	}

	private showBallotReady(planStepId: PlanStepId) {
		return (planStepId === PlanStepId.ResearchBallotIssues || planStepId === PlanStepId.ReviewBallotIssues);
	}

	private ballotReadyWidget(callToAction: StringId | undefined, link: StringId | undefined): JSX.Element {
		return (
			<iframe className="ballotReady-widget" style={ { backgroundColor: "transparent", border: "none", overflow: "hidden" } } scrolling="no" src="https://www2.ballotready.org/widget/address_search" width="100%">
				<CallToAction {...this.props} callToAction={callToAction} link={link} />
			</iframe>
		);
	}
}

const mapStateToProps = (state: IQuestionnaireState) => ({
    getString: state.getString,
});

export default connect(mapStateToProps)(PlanStep);