  // SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;


interface IERC20Token {
   function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}
 
 contract  Thriftbooks {
    
    uint internal booksLength = 0;
    uint256 internal booksId = 0;
    address internal cUsdTokenAddress =  0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    event addBookEvent(address indexed owner, uint256 bookId);    
    event likeBookEvent(address indexed userAddress, uint256 index);
    event dislikeBookEvent(address indexed userAddress, uint256 index);
    event deleteBookEvent(uint256 bookId);
    event buyBookEvent(address indexed seller, address indexed buyer, uint256 index);

    struct  Book {
        address payable owner;
        uint256 bookId;
        string url;
        string title;
        string author;
         uint price;
         uint likesCount;
         
      
    }
      mapping (uint =>  Book) internal books;
      mapping(uint256 => mapping(address => bool)) likes; // books liked by all users

      //  function use to add books
     function  addBook(
        string memory _url, 
        string memory _title,
         string memory _author,
        uint _price
       
        
        
    ) public {
         uint _likesCount = 0;

         books [booksLength] =  Book(
            payable(msg.sender),
            booksId,
            _url,
            _title,
            _author,
            _price,
             _likesCount
            
             
        );

        emit addBookEvent(msg.sender, booksId);
        booksLength++;
        booksId++;
    
    }

    // return book details with key @index from books mapping
     function getBook(uint _index) public view returns (
        address payable,
        uint256,
        string memory,
        string memory,  
        string memory,
        uint,
        uint
        
      
    ) {
        return (  
            books[_index].owner,
            books[_index].bookId,
              books[_index].url,
            books[_index].title, 
             books[_index].author,
              books[_index].price,
               books[_index].likesCount


                   
        );
    }

    // delete book with key @_index from books mapping
    function deleteBook(uint _index) external {
	        require(msg.sender == books[_index].owner, "Only owner can delete book");      
            uint256 bookId = books[_index].bookId;      
            books[_index] = books[booksLength - 1];// replace the index to delete with the last valid book item
            delete books[booksLength - 1]; // reset the last valid book item to the default value
            booksLength--; // reduce the total books count

            emit deleteBookEvent(bookId);
	    }

        // transfer book ownershop to function caller
          function buyBook(uint _index) public payable  {
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            books[_index].owner,
             books[_index].price
          ),
          "Transfer failed."
        );

        address seller = books[_index].owner;
        address buyer = msg.sender;

       books[_index].owner = payable(msg.sender);

       emit buyBookEvent(seller, buyer, _index);
         
    }

    // like a book
     function Like (uint _index)public{
         bool hasLiked = likes[books[_index].bookId][payable(msg.sender)];
         // un-like a book if the user has previously liked it
         if (hasLiked) {
             likes[books[_index].bookId][payable(msg.sender)] = false;
            books[_index].likesCount--; 
            emit dislikeBookEvent(msg.sender, _index);
         } else {
             // like the book with index @_index
             likes[books[_index].bookId][payable(msg.sender)] = true;
             books[_index].likesCount++;
             emit likeBookEvent(msg.sender, _index);
         }        
    } 

    // get the count of the total available books
    function getbooksLength() public view returns (uint) {
        return (booksLength);
    }
}


