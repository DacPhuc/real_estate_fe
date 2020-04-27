/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import RightContent from '@/components/GlobalHeader/RightContent';
import { connect } from 'dva';
import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import Authorized from '@/utils/Authorized';
import { formatMessage } from 'umi-plugin-react/locale';
import { isAntDesignPro } from '@/utils/utils';
import { BasicLayout as ProLayoutComponents } from '@ant-design/pro-layout';
import Link from 'umi/link';

/**
 * use Authorized check all menu item
 */

const BasicLayout = props => {
  const { dispatch, children, settings } = props;
  /**
   * constructor
   */

  useState(() => {});
  /**
   * init variables
   */

  const handleMenuCollapse = payload =>
    dispatch &&
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });

  return (
    <ProLayoutComponents
      logo={logo}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      {...props}
      {...settings}
    >
      {children}
    </ProLayoutComponents>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
