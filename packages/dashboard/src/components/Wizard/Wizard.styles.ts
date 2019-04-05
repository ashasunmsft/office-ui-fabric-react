import { IWizardStyles, IWizardStyleProps } from './Wizard.types';
import {
  contentSlideUpOutAnimation,
  contentSlideUpInAnimation,
  contentSlideDownOutAnimation,
  contentSlideDownInAnimation,
  titleSlideUpOutAnimation,
  titleSlideUpInAnimation,
  titleSlideDownOutAnimation,
  titleSlideDownInAnimation,
  contentSlideLeftInAnimation,
  contentSlideLeftOutAnimation,
  contentSlideRightInAnimation,
  contentSlideRightOutAnimation
} from './Wizard.animation';

export const subwayNavWidth = 303;
export const subwayNavPadding = 48;

export const getWizardStyles = (props: IWizardStyleProps): IWizardStyles => {
  const retVal: IWizardStyles = {
    wizardContentNavContainer: {
      display: 'flex',
      flexDirection: 'row',
      height: '100%'
    },
    subwayNavSection: {
      width: `${subwayNavWidth}px`,
      paddingLeft: `${subwayNavPadding}px`,
      paddingTop: `${subwayNavPadding}px`,
      paddingBottom: `${subwayNavPadding}px`,
      borderRight: `1px solid ${props.theme.semanticColors.bodyDivider}`,
      overflowY: 'auto'
    },
    contentSectionContainer: {
      flex: 1,
      position: 'relative',
      overflow: 'hidden'
    },
    contentSection: {
      flex: 1,
      boxSizing: 'border-box',
      paddingTop: `37px`,
      paddingLeft: `${subwayNavPadding}px`,
      paddingBottom: `${subwayNavPadding}px`,
      flexDirection: 'column',
      position: 'absolute',
      overflowY: 'auto',
      height: '100%',
      top: 0
    },
    contentTitle: {},
    content: {},
    stepSlideUpEnterActive: { ...contentSlideUpInAnimation, transform: 'translateY(790px)', opacity: 0 },
    stepSlideUpExitActive: contentSlideUpOutAnimation,
    stepSlideDownEnterActive: contentSlideDownInAnimation,
    stepSlideDownExitActive: contentSlideDownOutAnimation,
    titleSlideUpEnterActive: { ...titleSlideUpInAnimation, transform: 'translateY(790px)', opacity: 0 },
    titleSlideUpExitActive: titleSlideUpOutAnimation,
    titleSlideDownEnterActive: titleSlideDownInAnimation,
    titleSlideDownExitActive: titleSlideDownOutAnimation,
    stepSlideLeftEnterActive: { ...contentSlideLeftInAnimation, transform: 'translateX(500px)', opacity: 0 },
    stepSlideLeftExitActive: contentSlideLeftOutAnimation,
    stepSlideRightEnterActive: contentSlideRightInAnimation,
    stepSlideRightExitActive: contentSlideRightOutAnimation
  };

  return retVal;
};
