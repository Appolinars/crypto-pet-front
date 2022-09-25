import { useRouter } from 'next/router';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import CoinPicker from '@/components/common/coinPicker/CoinPicker';
import Checkbox from '@/components/ui/checkbox/Checkbox';
import Input from '@/components/ui/input/Input';
import Loader from '@/components/ui/loader/Loader';

import { createNote } from '@/redux/note/noteActions';
import {
  newNoteErrorSelector,
  newNoteLoadingSelector,
  newNoteSuccessSelector,
} from '@/redux/note/noteSelectors';
import { resetNewNote } from '@/redux/note/noteSlice';

import { useCoinPriceQuery } from '@/services/crypto/cryptoService';

import { handleInputChange } from '@/utils/index';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';

import { INote } from '@/types/noteTypes';
import { useToastError } from '@/hooks/useToastError';

const Note: FC = () => {
  const [skip, setSkip] = useState<boolean>(true);
  const [allowChangePrice, setAllowChangePrice] = useState<boolean>(false);
  const [noteData, setNoteData] = useState<INote>({
    coin: '',
    price: '',
    amount: '',
  });

  const isLoading = useAppSelector(newNoteLoadingSelector);
  const isSucces = useAppSelector(newNoteSuccessSelector);
  const error = useAppSelector(newNoteErrorSelector);

  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const { data: coinPrice, refetch } = useCoinPriceQuery(noteData.coin, { skip });

  useToastError(error);

  useEffect(() => {
    if (noteData.coin) {
      setSkip(false);
      refetch();
    }
  }, [noteData.coin, refetch]);

  useEffect(() => {
    if (coinPrice) {
      setNoteData({
        ...noteData,
        price: coinPrice,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinPrice]);

  useEffect(() => {
    if (isSucces) push('/dashboard');
  }, [isSucces, push, dispatch]);

  useEffect(() => {
    return () => {
      setNoteData({
        coin: '',
        price: '',
        amount: '',
      });
      dispatch(resetNewNote());
    };
  }, [dispatch]);

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    allowChangePrice ? handleInputChange(e, setNoteData) : e.preventDefault();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { coin, price, amount } = noteData;

    if (!coin || !price || !amount) {
      return toast.error('Please add all fields');
    }

    const data = {
      coin: coin,
      price: +price,
      amount: +amount,
    };
    dispatch(createNote(data));
  };

  return (
    <div className="container flex flex-col justify-center content-center h-full">
      <h1 className="text-2xl font-bold text-center mx-auto mb-8 max-w-md">
        Create a new note about your cryptocurrency purchase
      </h1>
      <form className="max-w-md w-full mx-auto card-block p-5" onSubmit={handleSubmit}>
        <div className="flex items-center mb-4">
          <p className="mr-2">Pick a coin:</p>
          <CoinPicker
            value={noteData.coin}
            onChange={(coin) => setNoteData({ ...noteData, coin })}
          />
        </div>
        <div className="mb-4">
          <Input
            containerClass="mb-1"
            name="price"
            value={noteData.price}
            onChange={handlePriceChange}
            type="number"
            placeholder="Price"
            readOnly
          />
          <div className="pl-2">
            <Checkbox
              text="I want to set my own price"
              checked={allowChangePrice}
              onChange={() => setAllowChangePrice((prev) => !prev)}
            />
          </div>
        </div>
        <Input
          containerClass="mb-7"
          name="amount"
          value={noteData.amount}
          onChange={(e) => handleInputChange(e, setNoteData)}
          type="number"
          placeholder="Amount"
        />
        <button className="btn w-full relative">
          Submit {isLoading && <Loader className="absolute right-2 top-[50%] translate-y-[-50%]" />}
        </button>
      </form>
    </div>
  );
};

export default Note;
