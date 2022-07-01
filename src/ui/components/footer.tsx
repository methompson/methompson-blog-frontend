export function BlogFooter() {
  const now = new Date();
  return (
    <footer className='blogFooter w-full flex justify-center bg-red-600 text-red-100 dark:bg-red-900 dark:text-red-300 text-lg font-bold'>
      <div className='container py-8 px-4'>
        <h3>Copyright 2007-{now.getFullYear()}</h3>
        <h3>Mat Thompson</h3>
      </div>
    </footer>);
}