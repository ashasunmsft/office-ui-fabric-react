import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { ISubwayNavNodeProps, SubwayNavNodeState } from '../SubwayNav/SubwayNode.types';

export interface IWizardProps {
  // List of steps in the wizard
  steps: IWizardStepProps[];

  wizardComplete?: boolean;

  /* Step that is not part of navigation, only shown when wizard is complete */
  wizardCompleteStep?: IWizardStepProps;

  stepToShow?: IWizardStepProps;

  styles?: IWizardStyles;

  theme?: ITheme;
}

export interface IWizardStepProps {
  id: string;

  /**
   * Optional ID for the parent of the step.
   * to aid in data operations
   */
  parentId?: string;

  label: string;

  state: SubwayNavNodeState;

  disabled?: boolean;

  isSubStep?: boolean;

  // This property is used for animation
  isFirstSubStep?: boolean;

  // This property is used for animation
  index?: number;

  onClickStep?: (step: ISubwayNavNodeProps) => void;

  wizardContent?: IWizardContentProps;

  subSteps?: IWizardStepProps[];

  footerElement: JSX.Element;
}

export interface IWizardContentProps {
  contentTitleElement?: JSX.Element;

  content: JSX.Element;
}

export interface IWizardStepAction {
  // Defines the title of the button
  title: string;

  // Defines the function that is executed on clicking this action
  action: (currentStep: IWizardStepProps) => void;

  // Action is disabled or not
  disabled?: boolean;

  className?: string;

  currentStep?: IWizardStepProps;
}

export interface IWizardTitleProps {
  title: string;
}

// Possible states of content (or reuse SubwayNavStepState??)
export enum WizardContentState {
  NotStarted = 0,
  Completed = 1,
  Saved = 2,
  Error = 3
}

// Styles for the wizard component
export interface IWizardStyles {
  wizardContentNavContainer: IStyle;

  subwayNavSection: IStyle;

  contentSectionContainer: IStyle;

  contentSection: IStyle;

  contentTitle: IStyle;

  content: IStyle;

  // React transition classes
  stepSlideUpEnterActive: IStyle;

  stepSlideUpExitActive: IStyle;

  stepSlideDownEnterActive: IStyle;

  stepSlideDownExitActive: IStyle;

  titleSlideUpEnterActive: IStyle;

  titleSlideUpExitActive: IStyle;

  titleSlideDownEnterActive: IStyle;

  titleSlideDownExitActive: IStyle;

  stepSlideLeftEnterActive: IStyle;

  stepSlideLeftExitActive: IStyle;

  stepSlideRightEnterActive: IStyle;

  stepSlideRightExitActive: IStyle;
}

export interface IWizardStyleProps {
  isSubStep: boolean;

  isFirstSubStep: boolean;

  clickedForward: boolean;

  theme: ITheme;
}
