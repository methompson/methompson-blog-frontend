interface CardProps {
  children: React.ReactNode | React.ReactNode[];
}

export function Card(props: CardProps) {
  return <figure className='flex rounded-xl p-6 m-8 ring-1 ring-slate-200 dark:ring-slate-600 shadow-lg dark:shadow-slate-900'>
    { props.children }
  </figure>;
}

export function FullHeightCard(props: CardProps) {
  return <figure className='flex grow rounded-xl p-6 m-8 ring-1 ring-slate-200 dark:ring-slate-600 shadow-lg dark:shadow-slate-900'>
    { props.children }
  </figure>;
}