"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";
import './globals.css'
export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");
  const [showClickMe, setShowClickMe] = useState(false);

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };
  
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  
  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.toMint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
      setMintingAmount(undefined);
    } catch (e: any) {
      let errorMessage = "Failed to Mint ZebbyCoin";
      if (e.data) {
        const decodedError = contract.interface.parseError(e.data);
        errorMessage += `: ${decodedError?.args}`;
      }
      alert(errorMessage);
    }
  };
  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };
 
  const [stakingAmount, setStakingAmount] = useState<number>();
  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.toStake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
      setStakingAmount(undefined); 
    } catch (e: any) {
      let errorMessage = "Failed to Stake ZebbyCoin";
      if (e.data) {
        const decodedError = contract.interface.parseError(e.data);
        errorMessage += `: ${decodedError?.args}`;
      }
      alert(errorMessage);
    }
  };
  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };
  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.toWithdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
 
  const importToken = async() => {
    const {ethereum} = window as any;
    const tokenAddress = "0xc3EfF6b8211f3b594e112EA17e99fC13bc54A36C";
    const tokenSymbol = "ZBC";
    const tokenDecimal = 18;
    const tokenImage = "https://cdn.discordapp.com/attachments/698854559812157470/1212758914681278555/token-icon.png?ex=65f300c1&is=65e08bc1&hm=62213b8abe76626475a917b53e6e5c694252dd0037bfb75c169c3fd6ef1dde88&";

    try{
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimal,
            image: tokenImage,
          },
        },
      });
    }
    catch(error){
      console.log(error);
    }
  };



return (
    <main   style={{
      display: 'flex',
      fontSize: '25px',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "Courier New, monospace",
      minHeight: '100vh',
      backgroundImage: `url('https://cdn.discordapp.com/attachments/698854559812157470/1212745018977296415/Zebby-Bg.png?ex=65f2f3d0&is=65e07ed0&hm=c787ed22b376b07c2caa78152ac5c8958561e226d4be1c29e5e50e7a367036d0&')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',}}>


      <div
          onClick={() => window.open('https://sepolia.arbiscan.io/address/0xc3EfF6b8211f3b594e112EA17e99fC13bc54A36C#writeContract', '_blank')}
          style={{ display: "flex", justifyContent: "center", position: 'relative' }}
          onMouseEnter={() => setShowClickMe(true)}
          onMouseLeave={() => setShowClickMe(false)}
        >
          <Image
            src="https://cdn.discordapp.com/attachments/698854559812157470/1212758914681278555/token-icon.png?ex=65f300c1&is=65e08bc1&hm=62213b8abe76626475a917b53e6e5c694252dd0037bfb75c169c3fd6ef1dde88&"
            alt="Zebby Coin"
            width={600}
            height={600}
            style={{
              transition: "transform 0.2s ease-in-out", 
              transform: "scale(1)",}} 
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)"; 
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"; 
            }}
          />
          {showClickMe && (
            <p style={{
              position: 'absolute',
              bottom: '10px',
              textAlign: 'center',
              width: '100%',
              color: 'white',
              fontWeight: 'bold',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
              textShadow: '0 0 3px black, 0 0 3px black, 0 0 3px black, 0 0 3px black'
            }}>Click me!</p>
          )}
        </div>

      <button onClick={() => {connectWallet();}}
        className="p-3 bg-slate-800 text-white rounded"
        style={{
          backgroundColor:"green" ,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {walletKey != "" ? <b>Wallet Connected!</b> : <b>Connect Wallet</b> || "Connect wallet"}
      </button>

    <div>
        <button
        onClick={importToken}
        className="p-3 bg-slate-800 text-white rounded"
        style={{
          backgroundColor:"brown",
          position: "absolute",
          top: 75,
          left: 0,
        }}
      >
        <b>Import ZBC</b>
      </button>
    </div>

    <div className="border-2 border-slate-800 p-2 rounded-md flex items-center" style={{ backgroundColor: "green", marginBottom: "20px" }}>
    <form>
        <label> <b>Amount to Mint ZebbyCoin: </b> </label>
    </form>
    <input
        type="text"
        value={mintingAmount || ""}
        onChange={(e) => {
            const input = e.target.value;
            const regex = /^[0-9\b]+$/; 
            if (input === '' || regex.test(input)) {
                mintAmountChange(e);
            }
        }}
        style={{backgroundColor: "gray",color: "white",borderRadius: "10px",borderWidth: "3px",textAlign: "center",marginLeft: "10px", marginRight: "10px" }}
    />
    <button
        onClick={() => mintCoin()}
        className="p-3 text-white rounded flex items-center"
        style={{ backgroundColor: "transparent", 
        transition: "transform 0.2s ease-in-out", 
        transform: "scale(1)",}} 
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.3)"; 
      }}
      onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)"; 
      }}
    >
        <Image
            src="https://cdn.discordapp.com/attachments/698854559812157470/1212720798075322388/Mint.png?ex=65f2dd41&is=65e06841&hm=f92851dc2cacf803d56dbd078f8dfd03ea9d197e072cbc04a16f86c44d81916a&"
            alt="Mint Icon"
            width={40}
            height={40}
            className="mr-2" 
        />
        <b>MINT</b>
    </button>
    </div>

    <div className="border-2 border-slate-800 p-2 rounded-md flex items-center" style={{ backgroundColor: "brown" }}>
    <form>
        <label> <b>Amount to Steak ZebbyCoin:</b> </label><br></br>
        </form>
        <input
        type="text"
        value={stakingAmount || ""}
        onChange={(e) => {
            const input = e.target.value;
            const regex = /^[0-9\b]+$/; 
            if (input === '' || regex.test(input)) {
              stakeAmountChange(e);
            }
        }}
        style={{backgroundColor: "gray",
        color: "white",
        borderRadius: "10px",
        borderWidth: "3px",
        textAlign: "center",
        marginLeft: "10px", 
        marginRight: "10px" }}
    />
    
    <button
        onClick={() => stakeCoin()}
        className="p-3 text-white rounded flex items-center"
        style={{ backgroundColor: "transparent", 
        transition: "transform 0.2s ease-in-out", 
        transform: "scale(1)",}} 
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.3)"; 
      }}
      onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)"; 
      }}
    >
        <Image
            src="https://cdn.discordapp.com/attachments/698854559812157470/1212775003112738836/Steak.png?ex=65f30fbd&is=65e09abd&hm=dba73a294e08d2e95c4a7715357a5655f5423e0d119bc795a82d24331d316bbf&"
            alt="Mint Icon"
            width={40}
            height={40}
            className="mr-2" 
        />
        <b>STEAK</b>
    </button>
    </div>

    <div>
        <br></br>
        <br></br>
        <button 
    onClick={withdrawCoin}
    className="p-3 bg-slate-800 text-white rounded"
    style={{
        background: "linear-gradient(to right, rgba(218, 64, 151, 0.8), rgba(143, 113, 255, 0.8))",
        border: 0,
        color: "white",
        backgroundSize: "200% auto",
        transition: "transform 0.2s ease-in-out",
        transform: "scale(1)",
        animation: "moveGradient 2s ease infinite",
    }}>
    <b>WITHDRAW</b>
</button>

<style jsx>{`
    @keyframes moveGradient {
        0% {
            background-position: 0% 50%;
        }
        100% {
            background-position: 100% 50%;
        }
    }
`}</style>
    </div>
</main>

  );
}