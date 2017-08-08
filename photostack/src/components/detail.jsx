import React from 'react';
import { connect } from 'react-redux';
import { getImages } from '../action-creators';
import Spinner from './spinner';
import {withRouter} from 'react-router-dom';

export class Detail extends React.Component {

	imageUrl() {
		if (this.props.imageList.length === 0) {
			this.props.getImages();
			return '';
		} else {
			const id = this.props.match.params.id;
			return this.props.imageList[id].url;
		}
	}
	render() {
		return(
			<div>
				{this.props.isLoading ?
					<Spinner/> :
					<div className="row m-t-4">
						<div className="col-md-12">
							<img className="img-responsive center-block" src={this.imageUrl()} />
						</div>
					</div>
				}
			</div>

		);
	}
}

function mapStateToProps(state) {
  return {
    imageList: state.get('imageList').toJS(), //Immutable.js - .toJS() to convert to raw JS object from List
    isLoading: state.getIn(['view', 'isLoading']) //Immutable.js - .getIn() to retrieve a nested state value from Map
  };
}

function mapDispatchToProps(dispatch) {
	return {
		getImages: () => dispatch(getImages())
	}
}

export const DetailContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
