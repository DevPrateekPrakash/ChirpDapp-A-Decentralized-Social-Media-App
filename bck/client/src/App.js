
import './App.css';
import {useState, useEffect} from "react";
import Sidebar from "./Sidebar"
import Feed from "./Feed"
import Widgets from "./Widgets"



function App() {
  const [currentAccount, setCurrentAccount]= useState('')
  const [correctNetwork, setCorrectNetwork]= useState(false)
  const connectWallet = async()=>{
    try{
      const {ethereum} = window
      if(!ethereum){
        console.log('metamask not detected')
        return
      }
      let chainId= await ethereum.request({method: 'eth_chainId'})
      console.log('connected to chain:' + chainId)
      const sepoliaChainId= '0x4268'
      if(chainId !== sepoliaChainId){
        alert('you are not connected to HoleSky network')
        setCorrectNetwork(false)
        return
      } else{
        setCorrectNetwork(true)
      }
      const accounts = await ethereum.request({method: 'eth_requestAccounts'})
      console.log("found account", accounts[0])
      setCurrentAccount(accounts[0])
    }
    catch(error){
      console.log("error connecting to Metamask", error)
    }
  }

  useEffect(() => {
    connectWallet()
  })

  return (
    // BEM
    <div>
    {currentAccount === '' ? (
      <button
      className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
      onClick={connectWallet}
      >
      Connect Wallet
      </button>
      ) : correctNetwork ? (
        <div className="app">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      ) : (
      <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
      <div>----------------------------------------</div>
      <div>Please connect to the Rinkeby Testnet</div>
      <div>and reload the page</div>
      <div>----------------------------------------</div>
      </div>
    )}
    </div>

  );
}

export default App;
