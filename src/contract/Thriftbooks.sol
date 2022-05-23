  // SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


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
    address internal cUsdTokenAddress =  0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct  Book {
        address payable owner;
        string url;
        string title;
        string author;
         uint price;
         uint like;
         
      
    }
      mapping (uint =>  Book) internal books;
      //  function use to add books
     function  addBook(
        string memory _url, 
        string memory _title,
         string memory _author,
        uint _price
       
        
        
    ) public {
         uint _like = 0;

         books [booksLength] =  Book(
            payable(msg.sender),
            
            _url,
            _title,
            _author,
            _price,
             _like
            
             
        );

        booksLength++;
    
    }

    //function is used to edit  book
     function editBook(
        uint256 _index,
        string memory _url,
        string memory _title,
        string memory _author,
        uint _price
      
    ) public {
          uint _like = books[_index].like;
        require(msg.sender == books[_index].owner, "Error"); 
        books[_index] =  Book(
            payable(msg.sender),
            _url,
            _title,
            _author,
            _price,
             _like
            
        );
    }

     function getBook(uint _index) public view returns (
        address payable,
        string memory,
        string memory,  
        string memory,
        uint,
        uint
        
      
    ) {
        return (  
            books[_index].owner,
              books[_index].url,
            books[_index].title, 
             books[_index].author,
              books[_index].price,
               books[_index].like


                   
        );
    }

    function deleteBook(uint _index) external {
	        require(msg.sender == books[_index].owner, "Only owner can delete book");
	        delete(books[_index]);
	    }

          function buyBook(uint _index) public payable  {
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            books[_index].owner,
             books[_index].price
          ),
          "Transfer failed."
        );

       books[_index].owner = payable(msg.sender);
         
    }

     function Like (uint _index)public{
        books[_index].like ++;
    } 

    function getbooksLength() public view returns (uint) {
        return (booksLength);
    }
}


