import { FC, useMemo } from 'react';

import Loader from '@/components/ui/loader/Loader';

import { deleteNote } from '@/redux/note/noteActions';
import { isNoteDeletingSelector } from '@/redux/note/noteSelectors';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';

import { INotesTableItem } from './NotesTable.interface';

import TrashIcon from '@/svg/trash.svg';

const NotesTableItem: FC<INotesTableItem> = ({ note, coinPrice }) => {
  const dispatch = useAppDispatch();

  const isDeleting = useAppSelector(isNoteDeletingSelector);

  const profitPercentage = useMemo(() => {
    const balance = (+note.price / coinPrice) * 100 - 100;

    if (balance > 0) {
      return `${balance.toFixed(2)}`;
    } else if (balance < 0) {
      return `+${balance.toFixed(2).toString().substring(1)}`;
    }

    return '0';
  }, [note.price, coinPrice]);

  const profit = useMemo(() => {
    const diference = coinPrice - +note.price;

    if (diference < 0) {
      return `${diference.toFixed(2)}$`;
    } else if (diference > 0) {
      return `+$${diference.toFixed(2).toString().substring(1)}`;
    }

    return '$0';
  }, [coinPrice, note.price]);

  const date = useMemo(
    () =>
      new Date(note.createdAt).toLocaleDateString('en-CA', {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit',
      }),
    [note.createdAt]
  );

  return (
    <tr className="border-t border-t-gray-600 text-left">
      <td>{date}</td>
      <td>{note.coin}</td>
      <td>{note.price}</td>
      <td>{coinPrice}</td>
      <td>
        {note.amount}
        <span className="block opacity-70 text-xs">${(+note.price * +note.amount).toFixed(2)}</span>
      </td>
      <td className={+note.price > coinPrice ? 'text-red-500' : 'text-green-500'}>
        {profitPercentage}%<span className="block opacity-90 text-xs">{profit}</span>
      </td>
      <td>
        <button
          className="group"
          aria-label="Delete item"
          onClick={() => dispatch(deleteNote(note._id))}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader />
          ) : (
            <TrashIcon className="stroke-red-700 transition-transform will-change-transform group-hover:scale-125" />
          )}
        </button>
      </td>
    </tr>
  );
};

export default NotesTableItem;
