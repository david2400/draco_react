'use client';

import {useId, useState} from 'react';
import {createPortal} from 'react-dom';
import {FinderHubModalData} from '@/types/formSchema';

interface FinderHubModalProps {
  modalData?: FinderHubModalData;
}

export const FinderHubModal = ({modalData}: FinderHubModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalId = useId();

  if (!modalData) {
    return null;
  }

  const {titleOpenModal, titleCloseModal, content, modalLink} = modalData;

  const overlay = isOpen ? document.getElementById('modal-overlay-root') ?? createOverlayRoot() : null;

  return (
    <>
      <button
        type='button'
        className='inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-600 hover:text-white'
        onClick={() => setIsOpen(true)}
        aria-haspopup='dialog'
        aria-expanded={isOpen}
        aria-controls={modalId}
      >
        <span aria-hidden='true'>★</span>
        {titleOpenModal}
      </button>
      {isOpen && overlay
        ? createPortal(
            <div
              className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xl'
              role='dialog'
              aria-modal='true'
              id={modalId}
            >
              <div className='relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/95 via-indigo-50/80 to-white/90 shadow-[0_30px_80px_-30px_rgba(79,70,229,0.7)] backdrop-blur-2xl'>
                <header className='flex items-center justify-between border-b border-white/40 px-8 py-6'>
                  <div className='flex flex-col gap-1'>
                    <span className='text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500/80'>Guía rápida</span>
                    <h2 className='text-2xl font-semibold text-slate-900'>{titleCloseModal ?? titleOpenModal}</h2>
                  </div>
                  <button
                    type='button'
                    className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-indigo-100 bg-white/70 text-base font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white'
                    onClick={() => setIsOpen(false)}
                  >
                    ×
                  </button>
                </header>
                <div className='space-y-6 overflow-y-auto px-8 py-8'>
                  {content?.map(item => (
                    <article
                      key={item.title}
                      className='flex flex-col gap-4 rounded-2xl border border-indigo-100/60 bg-white/75 p-5 shadow-inner backdrop-blur-sm md:flex-row md:items-start md:gap-6'
                    >
                      {item.img ? (
                        <img
                          src={item.img}
                          alt={item.title ?? 'Imagen informativa'}
                          className='h-24 w-24 flex-shrink-0 rounded-2xl border border-indigo-100 bg-indigo-50/70 object-contain p-3 shadow-sm'
                        />
                      ) : null}
                      <div className='space-y-2'>
                        {item.title ? <h3 className='text-lg font-semibold text-slate-900'>{item.title}</h3> : null}
                        {item.description ? <p className='text-sm text-slate-600'>{item.description}</p> : null}
                      </div>
                    </article>
                  ))}
                </div>
                <footer className='flex flex-col gap-3 border-t border-white/40 bg-white/60 px-8 py-6 sm:flex-row sm:items-center sm:justify-between'>
                  {modalLink ? (
                    <a
                      href={modalLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500'
                    >
                      <span aria-hidden='true'>→</span>
                      {modalLink}
                    </a>
                  ) : (
                    <span className='text-xs text-slate-400'>Explora más consejos para optimizar tu publicación.</span>
                  )}
                  <button
                    type='button'
                    className='inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl'
                    onClick={() => setIsOpen(false)}
                  >
                    Entendido
                  </button>
                </footer>
              </div>
            </div>,
            overlay,
          )
        : null}
    </>
  );
};

const createOverlayRoot = () => {
  if (typeof document === 'undefined') return null;
  const root = document.createElement('div');
  root.id = 'modal-overlay-root';
  document.body.appendChild(root);
  return root;
};
