// @flow
import React from 'react';
import DrawerLayoutAndroid from 'DrawerLayoutAndroid';


class DrawerLayout extends React.Component {
  _drawer: ?DrawerLayoutAndroid;

  constructor(props: any, context: any) {
    super(props, context);

    this.handleBackButton = this.handleBackButton.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  render() {
    const { drawerPosition, ...props } = this.props;
    const { Right, Left } = DrawerLayoutAndroid.positions;
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { this._drawer = drawer; }}
        {...props}
        drawerPosition={drawerPosition === 'right' ? Right : Left}
        onDrawerOpen={() => this.onDrawerOpen()}
        onDrawerClose={() => this.onDrawerClose()}
      />
    );
  }

  componentWillUnmount() {
    this.context.removeBackButtonListener(this.handleBackButton);
    this._drawer = null;
  }

  handleBackButton(): boolean {
    this.closeDrawer();
    return true;
  }

  onDrawerOpen() {
    this.context.addBackButtonListener(this.handleBackButton);
    this.props.onDrawerOpen && this.props.onDrawerOpen();
  }

  onDrawerClose() {
    this.context.removeBackButtonListener(this.handleBackButton);
    this.props.onDrawerClose && this.props.onDrawerClose();
  }

  closeDrawer() {
    this._drawer && this._drawer.closeDrawer();
  }

  openDrawer() {
    this._drawer && this._drawer.openDrawer();
  }
}


DrawerLayout.contextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};

export default DrawerLayout;
