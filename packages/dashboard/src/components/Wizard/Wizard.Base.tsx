import * as React from 'react';
import { IWizardProps, IWizardStyles, IWizardStyleProps } from './Wizard.types';
import { SubwayNav } from '../SubwayNav/SubwayNav';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStepToShow } from './Wizard.utils';
import { TransitionGroup, Transition, TransitionStatus } from 'react-transition-group';
import { wizardAnimationDurationMilliSec } from './Wizard.animation';
import { IProcessedStyleSet } from 'office-ui-fabric-react';

const getClassNames = classNamesFunction<IWizardStyleProps, IWizardStyles>();

/** Component for Wizard Base */
export class WizardBase extends React.Component<IWizardProps, {}> {
  private lastStepIndexShown: number;
  private clickedForward: boolean;
  private isSubStep: boolean;
  private isFirstSubStep: boolean;

  constructor(props: IWizardProps) {
    super(props);

    const wizardStepProps = this.props.stepToShow ? this.props.stepToShow : getStepToShow(this.props);
    this.lastStepIndexShown = wizardStepProps.index!;
  }

  public render(): React.ReactNode {
    const { steps } = this.props;

    if (steps.length === 0) {
      throw new Error('Wizard must have atleast one step.');
    }

    // if the step to render is already passed in, use that
    const wizardStepProps = this.props.stepToShow ? this.props.stepToShow : getStepToShow(this.props);

    this.clickedForward = this.lastStepIndexShown <= wizardStepProps.index! ? true : false;
    this.isSubStep = wizardStepProps.isSubStep!;
    this.isFirstSubStep = wizardStepProps.isFirstSubStep!;

    const wizardStyleProps = {
      theme: this.props.theme!,
      isSubStep: wizardStepProps.isSubStep!,
      isFirstSubStep: wizardStepProps.isFirstSubStep!
    };

    const classNames = getClassNames(this.props.styles!, wizardStyleProps);

    const contentAnimKey = 'contentSectionAnim-' + wizardStepProps.id;
    const contentSectionKey = 'contentSection-' + wizardStepProps.id;
    const contentTitleKey = 'contentTitle-' + wizardStepProps.id;
    const contentKey = 'content-' + wizardStepProps.id;
    let contentAnimationToApply: string = '';
    let titleAnimationToApply: string = '';

    const returnElement = (
      <div className={classNames.wizardContentNavContainer}>
        <div className={classNames.subwayNavSection}>
          <SubwayNav steps={steps} wizardComplete={this.props.wizardComplete} />
        </div>
        <div className={classNames.contentSectionContainer}>
          <TransitionGroup component={null}>
            <Transition timeout={wizardAnimationDurationMilliSec} key={contentAnimKey}>
              {(state: TransitionStatus) => {
                let hideScroll;
                if (state === 'entering' || state === 'exiting') {
                  titleAnimationToApply = this.isFirstSubStep || !this.isSubStep ? this._getTitleAnimationToApply(state, classNames) : '';

                  if (this.isSubStep) {
                    contentAnimationToApply = this._getSubStepAnimationToApply(state, classNames);
                  } else {
                    contentAnimationToApply = this._getContentAnimationToApply(state, classNames);
                  }
                  hideScroll = true;
                } else if (state === 'exited') {
                  hideScroll = false;
                }
                return (
                  <div key={contentSectionKey} className={classNames.contentSection} {...hideScroll && { style: { overflow: 'hidden' } }}>
                    <div key={contentTitleKey} className={classNames.contentTitle + ` ${titleAnimationToApply}`}>
                      {wizardStepProps.wizardContent!.contentTitleElement}
                    </div>
                    <div key={contentKey} className={classNames.content + ` ${contentAnimationToApply}`}>
                      {wizardStepProps.wizardContent!.content}
                    </div>
                  </div>
                );
              }}
            </Transition>
          </TransitionGroup>
        </div>
      </div>
    );

    // Update the step index showing
    this.lastStepIndexShown = wizardStepProps.index!;

    return returnElement;
  }

  private _getContentAnimationToApply(state: string, classNames: IProcessedStyleSet<IWizardStyles>): string {
    let animationToApply;
    if (this.clickedForward) {
      animationToApply = state === 'entering' ? classNames.stepSlideUpEnterActive : classNames.stepSlideUpExitActive;
    } else {
      animationToApply = state === 'entering' ? classNames.stepSlideDownEnterActive : classNames.stepSlideDownExitActive;
    }

    return animationToApply;
  }

  private _getTitleAnimationToApply(state: string, classNames: IProcessedStyleSet<IWizardStyles>): string {
    let animationToApply;
    if (this.clickedForward) {
      animationToApply = state === 'entering' ? classNames.titleSlideUpEnterActive : classNames.titleSlideUpExitActive;
    } else {
      animationToApply = state === 'entering' ? classNames.titleSlideDownEnterActive : classNames.titleSlideDownExitActive;
    }

    return animationToApply;
  }

  private _getSubStepAnimationToApply(state: string, classNames: IProcessedStyleSet<IWizardStyles>): string {
    let animationToApply;
    if (this.clickedForward) {
      animationToApply = state === 'entering' ? classNames.stepSlideLeftEnterActive : classNames.stepSlideLeftExitActive;
    } else {
      animationToApply = state === 'entering' ? classNames.stepSlideRightEnterActive : classNames.stepSlideRightExitActive;
    }

    return animationToApply;
  }
}
