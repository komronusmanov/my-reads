import React, {Component} from 'react'
import * as BooksAPI from '../utils/BooksAPI'
import { Link } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import BookRating from './Rating'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { withStyles } from '@material-ui/core/styles'
import { styles } from '../styles/styles'

class BookInfo extends Component {

  state = {
    book: {},
    loading: true,
  }

  componentWillMount() {
    this.getBook()
  }

  getBook = () => {
    BooksAPI.get(this.props.id).then((book) => {
      this.setState({book: book, loading: false})
    })
  }

  render() {

    const { book, loading } = this.state
    const { classes, updateOption } = this.props

    if (loading === true) {
      return (
        <div className={classes.loading}>
          <ScaleLoader
            size={120}
            color={'#795548'}
            />
          Loading
        </div>
      )
    }

    return (
      <div>
        <div className={classes.bookShelf}>
          <Typography
            className={classes.bookinfoTitle}
            variant='display1'
            >{book.title}
          </Typography>
        </div>
        <div className={classes.bookInfo}>
          <Card className={classes.bookDetails}>
            <div className={classes.booktop}>
              <img
                className='book-cover-big'
                alt='Book Cover'
                src={book.imageLinks
                  ? book.imageLinks.thumbnail
                  : "http://dummyimage.com/256x386/292929/e3e3e3&text=No Cover Available"}
                  />
                <div className='book-shelf-changer'>
                  <select
                    onChange={(event) => updateOption(book, event.target.value)}
                    value={book.shelf}>
                    <option value='none' disabled>Move to...</option>
                    <option value='currentlyReading'>Currenty Reading</option>
                    <option value='wantToRead'>Want To Read</option>
                    <option value='read'>Read</option>
                    <option value='none'>None</option>
                  </select>
                </div>
              </div>
              <CardContent>
                <Typography
                  className={classes.writtenBy}>
                  <b>Written By:</b>
                </Typography>
                {book.authors && book.authors.map((author, index) => (
                  <Typography
                    key={index}
                    className={classes.writtenBy}>
                    {author}
                  </Typography>
                ))}
                <Typography
                  className={classes.publishedBy}>
                  <b>Published By:</b>
                </Typography>
                <Typography
                  className={classes.publishedBy}>
                  {book.publisher} on {book.publishedDate}
                </Typography>
                <Typography
                  className={classes.subtitle}>
                  {book.subtitle}
                </Typography>
                <Typography
                  className={classes.description}>
                  {book.description}
                </Typography>
                <div
                  className={classes.bookRatingContainer}
                  style={{fontSize: '20px'}}>
                  Book's Rating:
                  <BookRating
                    value={book.averageRating}
                    count={book.ratingsCount}
                    />
                </div>
              </CardContent>
              <CardActions >
                <Button
                  className={classes.buttons}
                  href={book.previewLink}
                  variant='outlined'>
                  Preview
                </Button>
                <Button
                  className={classes.buttons}
                  href={book.canonicalVolumeLink}
                  variant='outlined'>
                  Buy Online
                </Button>
              </CardActions>
            </Card>
          </div>
          <Button
            className={classes.searchbutton}
            variant='fab'
            aria-label='return'
            component={Link}
            to="/">
            <ArrowBack/>
          </Button>
        </div>
      )
    }
  }

  export default withStyles(styles)(BookInfo)
