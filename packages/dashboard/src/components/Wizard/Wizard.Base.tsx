import * as React from 'react';
import { IWizardProps, IWizardStyles, IWizardStyleProps } from './Wizard.types';
import { SubwayNav } from '../SubwayNav/SubwayNav';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStepToShow } from './Wizard.utils';
import { CSSTransition, TransitionGroup, Transition, TransitionStatus } from 'react-transition-group';
import { wizardAnimationDurationMilliSec } from './Wizard.animation';

const getClassNames = classNamesFunction<IWizardStyleProps, IWizardStyles>();

// This returns a childFactory to provide to TransitionGroup
// tslint:disable:no-any
const childFactoryCreator = (classNames: any) => (child: any) =>
  React.cloneElement(child, {
    classNames
  });

/** Component for Wizard Base */
export class WizardBase extends React.Component<IWizardProps, {}> {
  private lastStepIndexShown: number;

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

    const wizardStyleProps = {
      theme: this.props.theme!,
      isSubStep: wizardStepProps.isSubStep!,
      isFirstSubStep: wizardStepProps.isFirstSubStep!,
      clickedForward: this.lastStepIndexShown <= wizardStepProps.index! ? true : false
    };

    // Update the step index showing
    this.lastStepIndexShown = wizardStepProps.index!;

    const classNames = getClassNames(this.props.styles!, wizardStyleProps);

    const contentAnimKey = 'contentSectionAnim-' + wizardStepProps.id;
    const contentSectionKey = 'contentSection-' + wizardStepProps.id;
    const contentTitleKey = 'contentTitle-' + wizardStepProps.id;
    const contentKey = 'content-' + wizardStepProps.id;

    let mainStepTransitionClass;
    if (wizardStyleProps.clickedForward) {
      mainStepTransitionClass = {
        enter: classNames.stepSlideUpEnter,
        enterActive: classNames.stepSlideUpEnterActive,
        exit: classNames.stepSlideUpExit,
        exitActive: classNames.stepSlideUpExitActive
      };
    } else {
      mainStepTransitionClass = {
        enter: classNames.stepSlideDownEnter,
        enterActive: classNames.stepSlideDownEnterActive,
        exit: classNames.stepSlideDownExit,
        exitActive: classNames.stepSlideDownExitActive
      };
    }

    return (
      <div className={classNames.wizardContentNavContainer}>
        <div className={classNames.subwayNavSection}>
          <SubwayNav steps={steps} wizardComplete={this.props.wizardComplete} />
        </div>
        <div className={classNames.contentSectionContainer}>
          <TransitionGroup childFactory={childFactoryCreator(mainStepTransitionClass)} component={null}>
            <Transition timeout={500} key={contentAnimKey + '0'}>
              {(state: TransitionStatus) => {
                console.log(state);
                if (state === 'entering') {
                  return <div>entering</div>;
                } else if (state === 'exiting') {
                  return <>exiting</>;
                } else {
                  return <>resting</>;
                }
              }}
            </Transition>
            <CSSTransition
              key={contentAnimKey}
              className={classNames.contentSection}
              classNames={mainStepTransitionClass}
              timeout={wizardAnimationDurationMilliSec}
            >
              <div key={contentSectionKey}>
                <div key={contentTitleKey} className={classNames.contentTitle}>
                  {wizardStepProps.wizardContent!.contentTitleElement}
                </div>
                <div key={contentKey} className={classNames.content}>
                  {wizardStepProps.wizardContent!.content}
                </div>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    );
  }
}
