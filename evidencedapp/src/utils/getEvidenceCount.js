import store from "../redux/store";

export const EVIDENCE_COUNT = "EVIDENCE_COUNT"; // action type

// action creator (dispatch sends this to redux reducer)
function evidenceCount(data) {
  return {
    type: EVIDENCE_COUNT,
    payload: data
  };
}

//
//  set up the blockchain shadow contract, user address, and user zombie count.  Put into redux store.
//

async function getEvidenceCount(CoC, userAddress) {
  // get number of zombies owned by the user account

  //let userEvidenceCount = +(await CoC.methods // + convert a string to an integer
  //  .balanceOf(userAddress)
  //  .call());

  // do a binary search to estimate total zombie count.
  // It is a real shame that the Cryptozombies contract doesn't totally comply with ERC720 to include a function
  // that returns totalZombieount.

  // var high = 8192;
  // var low = 0;
  // var middle = 4096;
  //
  // while (low < high) {
  //   try {
  //     await CZ.methods.zombies(middle).call();
  //     low = middle + 1;
  //     middle = Math.floor(low + (high - low) / 2);
  //   } catch {
  //     high = middle - 1;
  //     middle = Math.floor(low + (high - low) / 2);
  //   }
  // }

  // put state data into the REDUX store for easy access from other pages and components

  let totalEvidenceCount = +(await CoC.methods.item_count().call());

  let data = {
    totalEvidenceCount,     // from binary search
    userEvidenceCount: 0          // EC7 shorthand for totalZombieCount:totalZombieCount because of same variable name
  };
  store.dispatch(evidenceCount(data));


}

export default getEvidenceCount;
