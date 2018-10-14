import * as React from 'react';
import { Dispatch } from 'redux';
import { connect} from 'react-redux';
import { PlanEmotion } from './PlanEmotion';
import { PlanStep } from './PlanStep';
import { ReasonToVote } from './ReasonToVote';
import { default as StartOverButton, StartOverButtonType } from './StartOverButton';
import { ALL_QUESTION_IDS, IConnectedReduxProps, IQuestionAndAnswer, QuestionId, QUESTIONS, recordPlanPage, VotingStateId } from '../store';
import { getPlanPageSubHeaderText }from '../strings';

import './Plan.css';

interface IPlanProps {
	answers: IQuestionAndAnswer[],
	votingStateId: VotingStateId,
}

interface IPropsFromDispatch {
	recordPlanPage: typeof recordPlanPage,
}

export interface IIndexHolder {
	index: number;
}

class Plan extends React.Component<IPlanProps & IPropsFromDispatch & IConnectedReduxProps, any> {
	public render() {
		const indexHolder = { index: 0 } as IIndexHolder;
		const subHeaderText = getPlanPageSubHeaderText();

		return (
			<div>
				<div className="Plan-header Gradient-background">
                	<h1 className="voteplan-title">VotePlan</h1>
                	<div className="plan-sub-header-text VotingVoices-serif">{subHeaderText}</div>
				</div>

				<div className="App plan-page-body">
					{ALL_QUESTION_IDS.map(
						(questionId: QuestionId) => {
							const answer = this.props.answers.find(qa => qa.questionId === questionId);

							if (answer !== undefined) {
								const question = QUESTIONS.find(q => q.id === questionId);

								const planStepId = question!.resultingPlanStep(answer!.answerId);

								if (planStepId !== undefined) {
									if (questionId === QuestionId.ReasonToVote) {
										return <ReasonToVote planStepId={planStepId!} />
									}
									else if (questionId === QuestionId.Emotion) {
										return <PlanEmotion {...this.props} planStepId={planStepId!} votingStateId={this.props.votingStateId} />
									}
									else {
										return <PlanStep {...this.props} indexHolder={indexHolder} planStepId={planStepId!} votingStateId={this.props.votingStateId} />
									}
								}
								else {
									return <React.Fragment />
								}
							}
							else {
								return <React.Fragment />
							}
						}
					)}

					<StartOverButton type={StartOverButtonType.Filled} {...this.props} />
				</div>
			</div>
		);
	}

	public componentDidMount() {
		this.props.recordPlanPage(this.props.answers);
		window.scroll(0, 0);
	}
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	recordPlanPage: (answers: IQuestionAndAnswer[]) => dispatch(recordPlanPage(answers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Plan);