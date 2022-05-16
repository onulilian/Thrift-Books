import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { useState, useEffect, useCallback } from "react";




import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";
import IERC from "./contract/IERC.abi.json";
import Thriftbook from  './contract/Thriftbook.abi.json';
import Books from './components/Books';
import Forms from './components/Forms';


const ERC20_DECIMALS = 18;


const contractAddress = "0xDc26987B1E905ee42e4fe4a8869e13DFAF6156E8";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";



function App() {

  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [books, setBooks] = useState([]);

  const connectToWallet = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Error Occurred");
    }
  };

  useEffect(() => {
    connectToWallet();
  }, []);

  useEffect(() => {
    if (kit && address) {
      getBalance();
     
    }
  }, [kit, address]);

  useEffect(() => {
    if (contract) {
      getBook();
    }
  }, [contract]);  



  const getBalance = (async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
      const contract = new kit.web3.eth.Contract(Thriftbook, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  });

  const getBook = (async () => {
    const booksLength = await contract.methods.getbooksLength().call();
    const _buk = []
    for (let index = 0; index < booksLength; index++) {
      console.log(booksLength);
      let _books = new Promise(async (resolve, reject) => {
      let book = await contract.methods.getBook(index).call();

      resolve({
        index: index,
        owner: [0],
        url: book[1],
        title: book[2],
        author: book[3],
        price: book[4],
        like: book[5]

                
      });
    });
    _buk.push(_books);
  }
  const books = await Promise.all(_buk);
  setBooks(books);
  console.log(books)
});

  const buyBook = async (_index,) => {
    try {
      const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
    
      
      await cUSDContract.methods
        .approve(contractAddress, books[_index].price)
        .send({ from: address });
      await contract.methods.buyBook(_index).send({ from: address });
      getBook();
      getBalance();
    } catch (error) {
      console.log(error)
    }};

  
  

const addBook = async (  _url, _title, _author, price ) => {
  const _price = new BigNumber(price).shiftedBy(ERC20_DECIMALS).toString();
  try {
    await contract.methods
      .addBook(_url, _title, _author, _price)
      .send({ from: address });
     getBook();
  } catch (error) {
    console.log(error);
  }
};
 
const DeleteBook = async (_index) => {
  try {
    await contract.methods.deleteBook(_index).send({ from: address });
    getBook();
    getBalance();
  } catch (error) {
    alert(error);
  }};

  const Like= async (_index) => {
    try {
      await contract.methods.Like(_index).send({ from: address });
      getBook ();
      getBalance();
    } catch (error) {
      alert.log(error);
    }};
   

  return (
    <div>
      <Navbar balance = {cUSDBalance} />
      <Books books ={books}
      buyBook = {buyBook}
      DeleteBook = {DeleteBook}
      Like= {Like}
      
       
      />
       <Forms addBook = {addBook}
       
/>
    </div>
    )


}
export default App;