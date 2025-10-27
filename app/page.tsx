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
      // Check if DATABASE_URL is available
      if (!process.env.DATABASE_URL) {
        console.log('DATABASE_URL not found, skipping database operation');
        return;
      }
      
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
      // Don't throw error to prevent server crash
      console.log('Continuing without database operation');
    }
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
     
      {/* Navigation Bar */}
      <nav className="flex items-center mb-6 px-4 bg-blue-50">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <AcmeLogo /> 
        </Link>
        <div className="hidden md:flex items-center space-x-10 ml-8">
          <Link href="/services" className="text-gray-700 font-bold hover:text-blue-600 transition-colors">
            Services
          </Link>
          <Link href="/products" className="text-gray-700 font-bold hover:text-blue-600 transition-colors">
            Projects
          </Link>
          <Link href="/about-us" className="text-gray-700 font-bold hover:text-blue-600 transition-colors">
            About Us
          </Link>
          <Link href="/contact-us" className="text-gray-700 font-bold justify-end hover:text-blue-600 transition-colors">
            Contact Us
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6 ml-auto">
          <Link href="/login" className="text-gray-700 font-bold hover:text-blue-600 transition-colors">
            Login
          </Link>
          <Link href="/demo-request" className="text-gray-700 font-bold hover:text-blue-600 transition-colors">
            Demo request
          </Link>
        </div>
      </nav>

      
      
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Empower your business with Juwara Solutions.</strong> We build smart, reliable software.{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
            Juwara Solutions creates smart, reliable websites and apps that help your business grow. From automation and performance optimization to custom digital experiences,
            </a>
            we provide the tools and technology to help you stand out and scale with confidence—whether you’re just starting or expanding.
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

      {/* FAQ Section */}
      <div className="mt-12 mb-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>

          {/* FAQ Items */}
          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <button 
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors"
                aria-expanded="false"
                aria-controls="faq-1"
                data-faq-toggle
              >
                <span className="text-lg font-semibold text-gray-900">What services does Juwara Solutions offer?</span>
                <svg 
                  className="w-5 h-5 text-gray-500 transform transition-transform duration-200 rotate-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  data-faq-icon
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div 
                id="faq-1" 
                className="px-6 pb-4 text-gray-700 leading-relaxed max-h-0 overflow-hidden transition-all duration-300 ease-in-out hidden"
                data-faq-content
                style={{ maxHeight: '0', display: 'none' }}
              >
                <p>Juwara Solutions specializes in custom software development, web applications, mobile apps, and digital transformation consulting. We help businesses streamline their operations with smart, reliable technology solutions tailored to their specific needs.</p>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <button 
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors"
                aria-expanded="false"
                aria-controls="faq-2"
                data-faq-toggle
              >
                <span className="text-lg font-semibold text-gray-900">How long does a typical project take?</span>
                <svg 
                  className="w-5 h-5 text-gray-500 transform transition-transform duration-200 rotate-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  data-faq-icon
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div 
                id="faq-2" 
                className="px-6 pb-4 text-gray-700 leading-relaxed max-h-0 overflow-hidden transition-all duration-300 ease-in-out hidden"
                data-faq-content
                style={{ maxHeight: '0', display: 'none' }}
              >
                <p>Project timelines vary depending on complexity and scope. Simple web applications typically take 2-4 weeks, while comprehensive business solutions can take 2-6 months. We provide detailed project timelines during our initial consultation and keep you updated throughout the development process.</p>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <button 
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors"
                aria-expanded="false"
                aria-controls="faq-3"
                data-faq-toggle
              >
                <span className="text-lg font-semibold text-gray-900">Do you provide ongoing support and maintenance?</span>
                <svg 
                  className="w-5 h-5 text-gray-500 transform transition-transform duration-200 rotate-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  data-faq-icon
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div 
                id="faq-3" 
                className="px-6 pb-4 text-gray-700 leading-relaxed max-h-0 overflow-hidden transition-all duration-300 ease-in-out hidden"
                data-faq-content
                style={{ maxHeight: '0', display: 'none' }}
              >
                <p>Yes! We offer comprehensive support and maintenance packages to ensure your applications run smoothly. Our support includes bug fixes, security updates, performance optimization, and feature enhancements. We also provide 24/7 monitoring and emergency support for critical applications.</p>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <button 
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors"
                aria-expanded="false"
                aria-controls="faq-4"
                data-faq-toggle
              >
                <span className="text-lg font-semibold text-gray-900">What technologies do you work with?</span>
                <svg 
                  className="w-5 h-5 text-gray-500 transform transition-transform duration-200 rotate-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  data-faq-icon
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div 
                id="faq-4" 
                className="px-6 pb-4 text-gray-700 leading-relaxed max-h-0 overflow-hidden transition-all duration-300 ease-in-out hidden"
                data-faq-content
                style={{ maxHeight: '0', display: 'none' }}
              >
                <p>We work with modern technologies including React, Next.js, Node.js, Python, TypeScript, and cloud platforms like AWS and Azure. Our team stays current with the latest frameworks and tools to deliver cutting-edge solutions. We also specialize in database technologies like PostgreSQL, MongoDB, and Redis.</p>
              </div>
            </div>

            {/* FAQ Item 5 */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <button 
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors"
                aria-expanded="false"
                aria-controls="faq-5"
                data-faq-toggle
              >
                <span className="text-lg font-semibold text-gray-900">How do I get started with a project?</span>
                <svg 
                  className="w-5 h-5 text-gray-500 transform transition-transform duration-200 rotate-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  data-faq-icon
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div 
                id="faq-5" 
                className="px-6 pb-4 text-gray-700 leading-relaxed max-h-0 overflow-hidden transition-all duration-300 ease-in-out hidden"
                data-faq-content
                style={{ maxHeight: '0', display: 'none' }}
              >
                <p>Getting started is easy! Simply contact us through our dashboard or reach out directly. We'll schedule a free consultation to discuss your project requirements, goals, and timeline. After understanding your needs, we'll provide a detailed proposal with project scope, timeline, and pricing.</p>
              </div>
            </div>
          </div>
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

      {/* FAQ JavaScript */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const faqToggles = document.querySelectorAll('[data-faq-toggle]');

              faqToggles.forEach(toggle => {
                const content = toggle.nextElementSibling;
                const icon = toggle.querySelector('[data-faq-icon]');
                
                content.style.display = 'none';
                content.style.maxHeight = '0';
                icon.classList.add('rotate-0');
                toggle.setAttribute('aria-expanded', 'false');

                toggle.addEventListener('click', function() {
                  const isExpanded = this.getAttribute('aria-expanded') === 'true';

                  if (isExpanded) {
                    content.style.maxHeight = '0';
                    setTimeout(() => {
                      content.style.display = 'none';
                    }, 300);
                    icon.classList.remove('rotate-180');
                    icon.classList.add('rotate-0');
                    this.setAttribute('aria-expanded', 'false');
                  } else {
                    content.style.display = 'block';
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.classList.remove('rotate-0');
                    icon.classList.add('rotate-180');
                    this.setAttribute('aria-expanded', 'true');
                  }
                });
              });
            });
          `
        }}
      />
    </main>
  );
}