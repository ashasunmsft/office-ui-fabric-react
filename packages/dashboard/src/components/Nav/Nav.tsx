import * as React from 'react';
import { INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
import { INavProps, INavStyleProps, INavStyles, INavState } from './Nav.types';
import { getStyles } from './Nav.styles';
import { styled, classNamesFunction, BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { NavLink } from './NavLink';
import { NavGroup } from './NavGroup';

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();

class NavComponent extends BaseComponent<INavProps, INavState> {
  constructor(props: INavProps) {
    super(props);

    this.state = {
      isNavCollapsed: this.props.isNavCollapsed ? this.props.isNavCollapsed : false
    };

    this._onNavCollapseClicked = this._onNavCollapseClicked.bind(this);
    this._editClicked = this._editClicked.bind(this);
    this._toggleHidden = this._toggleHidden.bind(this);
  }

  public render(): JSX.Element | null {
    if (!this.props.groups || this.props.groups.length === 0) {
      return null;
    }

    const classNames = getClassNames(getStyles, { isNavCollapsed: this.state.isNavCollapsed });

    return (
      <nav role="navigation" className={classNames.root}>
        {this._renderExpandCollapseNavItem()}

        {this.props.groups.map((group: INavLinkGroup, groupIndex: number) => {
          return this._renderGroup(group, groupIndex);
        })}

        {this._renderCustomizationLinks()}
      </nav>
    );
  }

  //
  // Basic methods
  //
  private _renderExpandCollapseNavItem(): React.ReactElement<{}> | null {
    const classNames = getClassNames(getStyles);
    const isNavCollapsed = this.state.isNavCollapsed;
    const { dataHint } = this.props;
    const ariaLabel = isNavCollapsed ? 'Navigation collapsed' : 'Navigation expanded';

    return (
      <ul role={'list'} className={classNames.navGroup}>
        <li role={'listitem'} title={'NavToggle'}>
          <NavLink
            id={'NavToggle'}
            href={'#'}
            onClick={this._onNavCollapseClicked}
            ariaExpanded={!isNavCollapsed}
            dataHint={dataHint}
            dataValue={'NavToggle'}
            ariaLabel={ariaLabel}
            primaryIconName={'GlobalNavButton'}
            role="menu"
          />
        </li>
      </ul>
    );
  }

  // Start to parse the Nav Schema
  private _renderGroup(group: INavLinkGroup, groupIndex: number): React.ReactElement<{}> | null {
    if (!group || !group.links || group.links.length === 0) {
      return null;
    }

    return (
      <NavGroup
        key={'group_' + groupIndex}
        groupIndex={groupIndex}
        groupName={group.name}
        links={group.links}
        dataHint={this.props.dataHint}
        isNavCollapsed={this.state.isNavCollapsed ? this.state.isNavCollapsed : false}
      />
    );
  }

  private _renderCustomizationLinks(): React.ReactElement<{}> | null {
    const classNames = getClassNames(getStyles);
    const { enableCustomization, showMore, editString, showMoreString, showLessString } = this.props;

    if (!enableCustomization) {
      // If enable customization is not on, then don't render anything
      return null;
    }

    return (
      // If enableCustomization
      <ul role={'list'} className={classNames.navGroup}>
        <li role={'listitem'} title={'Edit navigation'}>
          <NavLink
            id={'EditNav'}
            href={'#'}
            name={editString}
            onClick={this._editClicked}
            dataHint={'Edit navigation'}
            dataValue={'NavToggle'}
            ariaLabel={'Edit navigation'}
            primaryIconName={'Edit'}
            role="menu"
          />
        </li>
        {!!showMore && showMore ? (
          <li role={'listitem'} title={'Show more'}>
            <NavLink
              id={'ShowMore'}
              href={'#'}
              name={this.props.showMore ? showMoreString : showLessString}
              onClick={this._toggleHidden}
              dataHint={'Show more'}
              dataValue={'Show more'}
              ariaLabel={'Show more'}
              primaryIconName={'More'}
              role="menu"
            />
          </li>
        ) : null}
      </ul>
    );
  }

  //
  // Event handlers
  //
  private _onNavCollapseClicked(ev: React.MouseEvent<HTMLElement>): void {
    this.setState({
      isNavCollapsed: !this.state.isNavCollapsed
    });
    console.log(this.state.isNavCollapsed);

    // inform the caller about the collapse event
    if (!!this.props.onNavCollapsedCallback && !!this.state.isNavCollapsed) {
      this.props.onNavCollapsedCallback(this.state.isNavCollapsed);
    }

    ev.preventDefault();
    ev.stopPropagation();
  }

  // TODO: make this a callback
  private _editClicked(ev: React.MouseEvent<HTMLElement>): void {
    console.log('edit clicked');
    ev.preventDefault();
    ev.stopPropagation();
  }

  // TODO: make this a callback
  private _toggleHidden(ev: React.MouseEvent<HTMLElement>): void {
    console.log('show more');
    ev.preventDefault();
    ev.stopPropagation();
  }
}

export const Nav = styled<INavProps, INavStyleProps, INavStyles>(NavComponent, getStyles);
