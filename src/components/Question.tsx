import * as React from 'react';
import { Dispatch } from 'redux';
import { connect} from 'react-redux';

import { Answer } from './Answer';
import { AnswerId, answerQuestion, IConnectedReduxProps, IQuestionnaireState, QuestionId } from '../store';
import { getQuestionFullLabel, getString } from '../strings';

import './Question.css';

interface IQuestionProps {
    questionId: QuestionId,
    answers: AnswerId[],
}

interface IPropsFromDispatch {
    answerQuestion: typeof answerQuestion,
}

class Question extends React.Component<IQuestionProps & IConnectedReduxProps & IPropsFromDispatch, any> {
    public render(): JSX.Element {
        const { questionId, answers } = this.props;
        const label = getString(getQuestionFullLabel(questionId));

        return (
            <div>
                <div className="question-label VotingVoices-serif">{label}</div>
                <div className="answer-group">
                    {answers.map(
                        (answerId: AnswerId) => {
                            return (<Answer onClick={this._onClick(answerId)} answerId={answerId} key={answerId} />);
                        }
                    )}
                </div>
            </div>
        );
    }

    private _onClick = (answerId: AnswerId) => {
        return (ev: React.MouseEvent<HTMLElement | HTMLInputElement>) => {
            const { questionId, answers } = this.props;

            const answer = answers.find((o: AnswerId) => o === answerId );

            this.props.answerQuestion(questionId, answer!); 
        };
    };
}

const mapStateToProps = (state: IQuestionnaireState) => ({ });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    answerQuestion: (questionId: QuestionId, answerId: AnswerId) => dispatch(answerQuestion(questionId, answerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);