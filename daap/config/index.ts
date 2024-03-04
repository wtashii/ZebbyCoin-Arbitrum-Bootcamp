import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0xc3EfF6b8211f3b594e112EA17e99fC13bc54A36C",
        abi as any,
        signer
    );
}