import React from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { withStyles } from '@material-ui/core/styles'
import { styles } from '../styles/styles'

function BookRating(props, classes) {

	return (
		<div className={classes.bookRating}>
			<StarRatingComponent
				name={Math.random().toString(36)}
				className={classes.bookRatingStar}
				starCount={5}
				value={props.value}
				editing={false}
				starColor="#ffb400"
				emptyStarColor="#ffb400"
				renderStarIcon={(index, value) => {
					return <span className={index <= value ? 'fa fa-star' : 'fa fa-star-o'}/>;
				}}
				renderStarIconHalf={() => <span className="fa fa-star-half-full"/>}
			/>
		<span className={classes.bookRatingCounter}>({props.count})</span>
		</div>
	)
}


export default withStyles(styles)(BookRating)
