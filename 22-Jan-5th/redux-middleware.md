# Redux-Middleware
[그림1]  
리덕스 미들웨어는 액션을 디스패치했을 때, 리듀서에서 이를 처리하기 전에 설정된 작업을 실행하도록 도와줍니다. 액션과 리듀서의 사이에 있는 중간자라 볼 수 있습니다. 액션을 콘솔에 남기거나, 액션을 취소 및 추가, 변형 하는 등 다양한 역할을 수행할 수 있습니다. 주로 리덕스에서 비동기 작업을 실행할 때 사용합니다. 주요 라이브러리로는 [redux-thunk](https://github.com/reduxjs/redux-thunk), [redux-observable](https://redux-observable.js.org/), [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware), [redux-saga](https://redux-saga.js.org/) 가 있습니다.

## Redux Middleware의 구조
```javascript
// store.js
import { applyMiddleware, createStore } from 'redux';
import reducer from './reducers/reducer';

function actionLogger(store) { // middleware는 store를 인자로 받는다
  return (next) => { // next는 다음 middleware를 가리킨다
    return (action) => { // dispatch 된 action을 인자로 받는다
      /* 이 middleware에서 수행할 동작 */ 
      console.log('입력받은 Action : ', action);

      const returnValue = next(action); // 다음 middleware에게 action을 넘겨준다
      // 이 미들웨어가 마지막 미들웨어면 action이 실제로 dispatch 된다
      return returnValue; // 결과를 reducer에게 전달한다 
    }
  }
}

const store = createStore(reducer, applyMiddleware(actionLogger)); 
// createStore의 2번째 인자는 enhancement로 미들웨어를 인자로 받는다
// applyMiddleware 함수에 넣어서 인자로 포함시킨다
// 여러 미들웨어를 포함시킬 경우 applyMiddleware(mw1, mw2, mw3, ...); 

export default store;
```
`action`이 `dispatch` 되는 경우 해당 액션을 로그로 출력하는 미들웨어를 작성했습니다. 미들웨어는 함수의 형태를 하고 있습니다. applyMiddleware에 입력된 순서대로 실행되며, 처음 호출된 미들웨어가 `return`할 때, `action`이 `reducer`에게 넘어가며 실제로 `dispatch`됩니다.

## Redux Middleware가 필요한 이유
```javascript
// src/non-middleware/UserListContainer.js
export default function UserListContainer() {
  const users = useSelector(state => state.users_none.data);
  const dispatch = useDispatch();
  const getUsers = useCallback(async() => {
    try {
      dispatch(getUsersStart());
      const res = await axios.get('https://api.github.com/users'); // component에서 외부함수를 호출
      dispatch(getUsersSuccess(res.data));
    } catch (error) {
      dispatch(getUsersFail(error));
    }
  }, [dispatch]);

  return <UserList users={users} getUsers={getUsers} />
}
```
redux middleware를 사용하지 않으면 비동기 로직을 컴포넌트에서 사용해야하는 문제가 있습니다. 왜냐하면 redux는 불변성과 순수함수의 규칙을 지켜야 동작하기 때문입니다. 외부의 비동기 로직을 사용하는 경우 순수함수가 훼손되고 불변성이 지켜지지 않아, redux가 정상적으로 동작하지 않습니다.

## Redux Thunk
이러한 비동기 작업을 처리하기 위해 개발한 것이 redux-thunk 라이브러리입니다. 여기서 `thunk`란 특정 작업을 나중에 하도록 미루기 위해 함수형태로 감싼 것을 지칭합니다.
```javascript
const x = 1 + 2; // 특정 작업

const foo = () => 1 + 2; // thunk
```
이 경우 `foo()`가 호출될 때까지 연산 작업이 미루어집니다.

```javascript
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if(typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}
```



2. redux-thunk
3. redux-promise-middleware
4. 