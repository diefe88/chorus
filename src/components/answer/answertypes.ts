import * as React from 'react';

export interface IAnswerProps extends React.InputHTMLAttributes<HTMLElement | HTMLInputElement>
{
    /**
     * A required key that uniquely identifes the question option
     */
    key: string;

    /**
     * The label of the question option
     */
    label?: string;
}