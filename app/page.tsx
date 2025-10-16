import AcmeLogo from './ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { ClientThemeToggle } from './ui/client-theme-toggle';
import { CommentsDisplay } from './ui/comments-display';
import styles from './ui/home.module.css';
import { neon } from '@neondatabase/serverless';

export default function Page() {
  async function create(formData: FormData) {
    'use server';
    
    try {
      // Connect to the Neon database
      const sql = neon(`${process.env.DATABASE_URL}`);
      const comment = formData.get('comment');
      
      // Validate comment
      if (!comment || comment.toString().trim() === '') {
        throw new Error('Comment cannot be empty');
      }
      
      // Insert the comment from the form into the Postgres database
      await sql`INSERT INTO comments (comment) VALUES (${comment})`;
      
      console.log('Comment inserted successfully:', comment);
    } catch (error) {
      console.error('Error inserting comment:', error);
      throw error;
    }
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className={styles.shape}/>
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Juwara Solutions.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Juwara Solutions
            </a>
            , brought to you by Juwara Solutions.
          </p>
          <Link
            href="/dashboard"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Go to Dashboard</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
      </div>
      
      {/* Comments Form Section */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Leave a Comment</h2>
        <form action={create} className="space-y-4">
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Your Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your comment here..."
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Submit Comment
          </button>
        </form>
      </div>
      
      {/* Comments Display */}
      <CommentsDisplay />
      
      {/* Professional Theme Toggle Footer - Left Corner */}
      <footer className="mt-8 py-4">
        <div className="flex items-center justify-start space-x-3">
          <ClientThemeToggle />
          <div className="flex flex-col">
            <div className="text-sm text-gray-600 font-medium">
              Theme
            </div>
            <div className="text-xs text-gray-500">
              Light • Dark • Transparent
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}