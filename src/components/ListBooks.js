import React from 'react'
import Book from './Book'
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'
import { styles } from '../styles/styles'

//Component showing all books in different categories

const ListBooks = ({books, updateOption, classes}) => {

  //array of categories

  const shelves = ['currentlyReading', 'wantToRead', 'read']

  // function to change categories names from camelCase to formatted text

  const format = (text) => text.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())

  return (
    <div className={classes.listBooksContent}>
      <div>
        {shelves.map((shelf) =>
          <div
            className={classes.bookShelf}
            key={shelf}>
            <Typography
              className={classes.bookshelfTitle}
              variant='display1'
              >{format(shelf)}
            </Typography>
              <div className={classes.booksGrid}>
                {books.filter((book) => book.shelf === shelf )
                  .map((book) =>
                  <Book
                    key={book.id}
                    books={books}
                    book={book}
                    updateOption={updateOption}
                    />
                )}
              </div>
          </div>
        )}
      </div>
      <Button
        className={classes.searchbutton}
        variant='fab'
        aria-label='add'
        component={Link}
        to="/search">
        <AddIcon/>
      </Button>
    </div>
  )
}

export default withStyles(styles)(ListBooks)
