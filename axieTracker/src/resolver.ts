
import { Address, BigInt } from "@graphprotocol/graph-ts";
import {  Transfer } from "../generated/Axie/Axie"
import { RoninUser, Axie } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
    let recv = event.params._to;
    let axieID = event.params._tokenId;

    registerUser(recv,axieID);
    registerAxie(axieID,recv);
  
}


function registerUser(user:Address, axie:BigInt):RoninUser{
    let newUser = RoninUser.load(user.toHexString());

    if(newUser == null){
        newUser = new RoninUser(user.toHexString());
        newUser.axie = axie.toString();
        newUser.save();
        return newUser;
    }

    return newUser;
}

function registerAxie(axie:BigInt,user:Address):Axie{
    let newAxie = Axie.load(axie.toString());

    if(newAxie == null){
        newAxie = new Axie(axie.toString());
        newAxie.user = user.toHexString();
        newAxie.save();
        return newAxie;
    }
    return newAxie;
}