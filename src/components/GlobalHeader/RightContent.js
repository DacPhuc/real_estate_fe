import React, { Component } from 'react';
import { Icon, Tooltip, Button } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import { router } from 'umi';
import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from './index.less';
import Avatar from './AvatarDropdown';

class GlobalHeaderRight extends Component {
  render() {
    const { theme, layout, status, loadAuthen } = this.props;
    let className = styles.right;

    if (theme === 'dark' && layout === 'topmenu') {
      className = `${styles.right}  ${styles.dark}`;
    }

    return !loadAuthen ? (
      <div className={className}>
        {status ? null : (
          <Button
            type="primary"
            icon="login"
            className={styles.login}
            onClick={() => {
              router.push('/login');
            }}
          >
            Sign in
          </Button>
        )}
      </div>
    ) : null;
  }
}

export default connect(({ settings, login }) => ({
  status: login.status,
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
