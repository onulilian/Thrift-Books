import React from 'react';

const Books = (props) => {
  return (

    <div className='container'>
      <div class="row justify-content-center" > 
      {props.books.map((book)=> (
      <div className='col-md-4'>
      <div class="card shadow" style={{ width:"20rem" }} key={book.index}>
        <div className='inner'> <img class="card-img-top" src={book.url} alt="img"/></div>
  <div class="card-body text-center">
    <h1 className='title'>{book.title}</h1>
    <h5 class="card-body">{book.author}</h5>
    <p class="card-text">{book.price / 1000000000000000000}cUSD</p>
    {/* other users can buy book except the owner */}
    {props.userWa !== book.owner && (
      <a href="/#" class="btn btn-success"  onClick={() => props.buyBook(book.index)}>Buy Book</a>
    ) }

    <a href='/#' class="btn btn-success"   onClick={ ()=> props.Like(book.index)}>Like book</a>

    {/* only owner can delete book */}
    {props.userWa === book.owner && (
      <a href='/#' class="btn btn-success"   onClick={ ()=> props.DeleteBook(book.index)}>Delete Book</a>
    ) }
   
    
    
  </div>
</div>

      </div>
       ))};
      </div>
   
    </div>
  );
}
export default Books;