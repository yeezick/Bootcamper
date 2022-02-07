import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../../services/redux/slices/counterSlice';

export const SingleProject = () => {
  const { increment, addMore } = counterActions;
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.counter);

  const [amount, setAmount] = useState(0);

  const addOne = () => {
    dispatch(increment());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMore(amount));
  };

  return (
    <div>
      <h1>counter: {count}</h1>
      <button onClick={addOne}> ++++</button>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setAmount(e.target.value)} value={amount} />
        <button> add more </button>
      </form>
    </div>
  );
};
