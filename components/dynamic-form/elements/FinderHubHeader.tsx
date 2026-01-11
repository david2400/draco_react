'use client';

import {FinderHubHeader as FinderHubHeaderType, FinderHubModalData} from '@/types/formSchema';
import {FinderHubModal} from './FinderHubModal';

interface FinderHubHeaderProps {
  header?: FinderHubHeaderType;
  modalData?: FinderHubModalData;
}

export const FinderHubHeader = ({header, modalData}: FinderHubHeaderProps) => {
  if (!header) {
    return null;
  }

  return (
    <header className='flex flex-col gap-3 rounded-2xl border border-indigo-100/60 bg-white/50 px-4 py-3 shadow-inner backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex flex-1 flex-col gap-1'>
        <h2 className='text-xl font-semibold leading-tight text-slate-900'>{header.title}</h2>
        {header.subtitle ? <p className='text-sm text-slate-500'>{header.subtitle}</p> : null}
      </div>
      {modalData ? <FinderHubModal modalData={modalData} /> : null}
    </header>
  );
};
