import React from 'react';
import SelectLanguage from './SelectLanguage';
import RepoGrid from './RepoGrid';
import {fetchPopularRepos} from '../utils/api';

export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null,
    }
   this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(() => (
      {selectedLanguage: lang})
    );

    fetchPopularRepos(lang)
      .then(repos => {
        this.setState(() => ({repos: repos}))
      })
      .catch(console.error.bind(console));
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {/*<p>Selected Language: {this.state.selectedLanguage}</p>*/}
        {/*{JSON.stringify(this.state.repos, null, 2)}*/}
        {!this.state.repos
          ? <p>LOADING...</p>
          : <RepoGrid repos={this.state.repos} />}
      </div>
    );
  }
}
