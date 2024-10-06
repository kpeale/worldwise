import { combineReducers, createStore } from 'redux';
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const initialStateCustomer = {
  fullname: '',
  nationalID: '',
  createdAt: '',
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

store.dispatch({ type: 'account/deposit', payload: 500 });
store.dispatch({ type: 'account/withdraw', payload: 200 });
store.dispatch({
  type: 'account/requestLoan',
  payload: { amount: 1000, purpose: 'buy a car' },
});

function deposit(amount) {
  return { type: 'account/deposit', payload: amount };
}
function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  };
}
function payLoan() {
  return {
    type: 'account/payLoan',
  };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(500));
store.dispatch(payLoan());

function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payLoan: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updatename(fullName) {
  return {
    type: 'updatename',
    payload: { fullName },
  };
}

store.dispatch(createCustomer('kpeale', '22222'));
