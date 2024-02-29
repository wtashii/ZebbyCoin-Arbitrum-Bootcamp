import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0xF81f277aecb391Ce3F37B362C1eeF9b6113FbB03",
        abi as any,
        signer
    );
}