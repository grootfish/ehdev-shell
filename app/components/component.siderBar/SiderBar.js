/**
 * SiderBar Component
 * @author ryan.bian
 */
import React, { Component, createElement } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Layout, Menu, Icon, Avatar } from 'antd/es/';

import styles from './index.less';

import { GLOBAL_NAV_CONFIG } from '../../CONFIG';

const { Sider } = Layout;
const { Item } = Menu;

@withRouter
export default class SiderBar extends Component {
  static __ANT_LAYOUT_SIDER = true
  static propTypes = {
    history: PropTypes.object.isRequired,
  }
  state = {
    collapsed: true,
    selectedKey: null,
  }
  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
    });
  }
  onSelectMenu = ({ item, key }) => {
    this.props.history.replace(key);
    this.setState({
      selectedKey: key,
    });
  }
  backToHome = () => {
    this.props.history.replace('/');
    this.setState({
      selectedKey: null,
    });
  }
  renderTrigger() {
    const { collapsed } = this.state;
    let iconType;
    if (collapsed) {
      iconType = 'right-circle-o';
    } else {
      iconType = 'left-circle-o';
    }
    return (
      <div>
        <Icon
          type={iconType}
          style={{
            fontSize: 18,
          }}
        />
      </div>
    );
  }
  render() {
    const { history } = this.props;
    const { collapsed, selectedKey } = this.state;
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
        width={100}
        trigger={this.renderTrigger()}
      >
        <button
          type="button"
          className={styles.SiderBar__avatar}
          onClick={this.backToHome}
        >
          <Avatar icon="user" size={collapsed ? 'default' : 'large'} />
        </button>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onSelect={this.onSelectMenu}
          theme={'dark'}
        >
          {
            GLOBAL_NAV_CONFIG.map(d => (
              <Item key={d.to}>
                <Icon type={d.icon} />
                <span>{d.text}</span>
              </Item>
            ))
          }
        </Menu>
      </Sider>
    );
  }
}
