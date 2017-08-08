import React from 'react';

export default class ProfileHeader extends React.Component {

	render() {
		return (
			<div className="row user-header p-y-2">
	      <div className="col-md-offset-2 col-md-8 p-y-4">
	        <div className="media">
            <div className="media-left">
              <a href="#">
                <img
									className="media-object"
									src="images/rick-aguayo-profile-pic.jpg"
									alt="profile-pic"
								/>
              </a>
            </div>
            <div className="media-body p-l-6">
              <h2 className="media-heading m-t-15">Rick.Aguayo</h2>
              <h4><strong>Rick Aguayo</strong> Student & Gambler</h4>
              <ul className="header-ul">
                <li><strong>59</strong> posts</li>
                <li><strong>819k</strong> followers</li>
                <li><strong>71</strong> following</li>
              </ul>
            </div>
          </div>
        </div>
	    </div>
		);
	}
}
