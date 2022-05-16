import React from 'react'

import { useState } from "react";


const Forms = (props) => {

    


 const [url, setUrl] = useState('');
 const [title, setTitle] = useState('');
 const [author, setAuthor] = useState('');
 const [price, setPrice] = useState('');

 const submitHandler = (e) => {
    e.preventDefault();

 if(!url || !title || !author || !price  ) {
    alert('Please fill up the form')
    return

}
props.addBook(url, title, author, price);

setUrl('')
setTitle('')
setAuthor('')
setPrice('')
};

return ( 
   <body>
      <div className='text center mt-5'>
         <form   onSubmit={submitHandler} style={{ maxwidth:"480px" }}  > 
         <h1 className='h3 mb-3 font-weight-normal'>Add Book</h1>
         <label className='jt'>Enter url</label>
         <input type="text" class="form-control mb-3" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="img url" required autofocus/>
         <label className='title'>Enter title</label>
         <input type="text" class="form-control mb-3" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" required autofocus/>
         <label className='author'>Enter author's name</label>
         <input type="text" class="form-control mb-3" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="author" required autofocus/>
         <label className='price'>Enter price</label>
         <input type="text" class="form-control" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="price" required autofocus/>
         <div className='mt-3'> 
         <button className='btn btn-lg btn-primary'>Add Book</button>
         </div>
         </form>
      </div>
   </body>
)
}
   
   
   export default Forms;
   
  