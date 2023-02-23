import { useState, useEffect } from 'react';
import './App.css';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import {ethers} from 'ethers';
import FileUpload from './components/FileUpload';
import Display from './components/Display';
import Modal from './components/Modal';
// account 5 is used to deploy

function App() {
  const [account , setAccount] = useState("");
  const [contract , setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen , setModalOpen] = useState(false);
  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // console.log(Upload);
    const loadProvider = async()=>{
      if(provider){
        // this will automatically open the metamask
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
        // let contractAddress =  '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
        const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
        // console.log(contract);
        setContract(contract);
        setProvider(provider);
       }
       else{
        alert("metamask is not installed");
       }
    }
    provider && loadProvider();
    
  },[]);
  return (
    <>
    {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}
      <div className="App">
      <h1 style={{ color: "white" }}>Gdrive 3.0</h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <p style={{color: "white"}}> Account : {account ? account : "account not connected"}</p>
        <FileUpload account = {account} provider={provider} contract={contract}/>
        <Display contract={contract} account = {account} />
    </div>
    </>
    
  );
}

export default App;
