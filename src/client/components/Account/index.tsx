import React, { Component } from 'react';
import { getUsername } from '../../utils/auth';
import {AccuntNav} from './navigation';
import { Profile } from '../Profile/Profile';
import { combineReducers } from 'redux';

interface Props { }

interface State {
  authUsername?: string | null;
  pathname?: string | null;
}

export class Account extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      authUsername: null,
      pathname: null
    };
    this.navOnClick = this.navOnClick.bind(this)
  }
  componentDidMount() {
    getUsername(authUsername => {
      this.setState({ authUsername: authUsername });
    });
    let pathname = window.location.pathname.replace('/account/', '');
    this.setState({ pathname })
  }

  componentDidUpdate() { }

  navOnClick(){
    if(event && event.target){
      let ele = event.target as HTMLElement
      let pathname = ele!.closest('li')!.getAttribute('data-hl-nav')!
      this.setState({pathname})
      let url = window._env.url_prefix + 'account/' + pathname;
      console.log(url)
      window.history.pushState(null, '', url) 
    }
  }
  loadComponent(){
    switch(this.state.pathname){
      case 'profile':
        return <Profile authUsername={this.state.authUsername}/>;
      case 'account':
        return <div><h1>Account Component</h1></div>;
      case 'linked_accounts':
        return <div><h1>linked_accounts</h1></div>;
      case 'developer_tokens':
        return <div><h1>developer_tokens</h1></div>;
      case 'running_jobs':
        return <div><h1>running_jobs</h1></div>;
      case 'usage_agreeements':
        return <div>usage_agreeements</div>;
      default:
        return <Profile authUsername={this.state.authUsername}/>;
    } 
  }

  render() {
    return (
      <>
        <AccuntNav navOnClick={this.navOnClick} />
        {this.loadComponent()}
      </>
    )
    
  }
}