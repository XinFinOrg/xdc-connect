import _ from "lodash";

import * as types from "../actions/types";
import * as actions from "../actions";
import { VALID_CHAINS } from "../helpers/constant";
import { IsHex } from "../helpers/math";

export const NetworkValidation = (store) => (next) => (action) => {
  next(action);

  if (
    [
      types.WALLET_CONNECTED,
      types.WALLET_CHAIN_CHANGED,
      types.WALLET_ADDRESS_CHANGED,
    ].includes(action.type)
  ) {
    const { address } = action.payload;
    if (_.isUndefined(address)) store.dispatch(actions.WalletDisconnected());
    else {
      let { chain_id } = action.payload;
      if (!_.isUndefined(chain_id)) {
        if (String(chain_id).startsWith("0x") && IsHex(chain_id))
          chain_id = parseInt(chain_id, 16);

        if (VALID_CHAINS.includes(chain_id)) {
          store.dispatch(actions.NetworkValid());
        } else {
          store.dispatch(actions.NetworkInValid());
        }
      }
    }
  }
};
