import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { styles } from '../styles/styles'
import { withStyles } from '@material-ui/core/styles'
import BookRating from './Rating'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

//Component showing books on shelves

class Book extends Component {

  render() {

    const { book, updateOption, classes } = this.props
    let shelfValue = (book.shelf)
    ? book.shelf
    : 'none'

    return (
      <div>
        <Card className={classes.book}>
          <div className={classes.booktop}>
            <Link to={`info/${book.id}`}>
              <img
                className='book-cover'
                alt='Book Cover'
                src={book.imageLinks
                  ? book.imageLinks.thumbnail
                  : "http://dummyimage.com/256x386/292929/e3e3e3&text=No Cover Available"}
                  />
            </Link>
            <div className='book-shelf-changer'>
              <select
                className={classes.bookshelfChanger}
                onChange={(event) => updateOption(book, event.target.value)}
                value={shelfValue}>
                <option value='none' disabled>Move to...</option>
                <option value='currentlyReading'>Currenty Reading</option>
                <option value='wantToRead'>Want To Read</option>
                <option value='read'>Read</option>
                <option value='none'>None</option>
              </select>
            </div>
          </div>
          <CardContent>
            <div className={classes.bookRatingContainer}>
              <BookRating
                value={book.averageRating}
                count={book.ratingsCount}
                />
            </div>
            <Link to={`info/${book.id}`} style={{textDecoration: 'none'}}>
              <Typography
                className={classes.bookTitle}>
                {book.title}
              </Typography>
            </Link>
            {book.authors && book.authors.map((author, index) => (
              <Typography
                key={index}
                className={classes.bookAuthors}>
                {author}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(Book)
