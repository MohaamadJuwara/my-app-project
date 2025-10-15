import Link from 'next/link';
import { notFound } from 'next/navigation';

// Blog posts data
const blogPosts = {
  'getting-started-nextjs': {
    title: "Getting Started with Next.js",
    content: `
      Next.js is a powerful React framework that makes it easy to build full-stack web applications.
      
      ## Key Features
      
      - **Server-Side Rendering (SSR)**: Improve performance and SEO
      - **Static Site Generation (SSG)**: Pre-render pages at build time
      - **API Routes**: Build API endpoints alongside your frontend
      - **File-based Routing**: Organize your pages with the file system
      - **Built-in CSS Support**: Import CSS files, CSS modules, and more
      
      ## Getting Started
      
      To create a new Next.js project, run:
      
      \`\`\`bash
      npx create-next-app@latest my-app
      cd my-app
      npm run dev
      \`\`\`
      
      This will create a new Next.js application and start the development server.
    `,
    date: "2024-01-15"
  },
  'building-responsive-dashboards': {
    title: "Building Responsive Dashboards",
    content: `
      Creating responsive dashboards that work seamlessly across all devices is crucial for modern web applications.
      
      ## Design Principles
      
      - **Mobile-First Approach**: Start with mobile design and scale up
      - **Flexible Grid Systems**: Use CSS Grid and Flexbox for layouts
      - **Touch-Friendly Interfaces**: Ensure buttons and interactions work on touch devices
      - **Progressive Disclosure**: Show important information first, details on demand
      
      ## Technical Implementation
      
      - Use CSS media queries for responsive breakpoints
      - Implement flexible typography with clamp() functions
      - Optimize images with Next.js Image component
      - Test on real devices and various screen sizes
    `,
    date: "2024-01-10"
  },
  'modern-css-techniques': {
    title: "Modern CSS Techniques",
    content: `
      Modern CSS offers powerful features that can significantly improve your development workflow and user experience.
      
      ## CSS Grid and Flexbox
      
      These layout systems have revolutionized how we create responsive designs:
      
      - **CSS Grid**: Perfect for two-dimensional layouts
      - **Flexbox**: Ideal for one-dimensional layouts and component alignment
      
      ## CSS Custom Properties
      
      CSS variables (custom properties) enable dynamic theming and better maintainability:
      
      \`\`\`css
      :root {
        --primary-color: #3b82f6;
        --secondary-color: #10b981;
      }
      \`\`\`
      
      ## Modern Selectors
      
      New selectors like :is(), :where(), and :has() provide more powerful ways to target elements.
    `,
    date: "2024-01-05"
  }
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/blog"
            className="text-blue-600 hover:text-blue-800 mb-6 inline-block"
          >
            ← Back to Blog
          </Link>
          
          <article className="bg-white rounded-lg shadow-md p-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              <p className="text-gray-600">{post.date}</p>
            </header>
            
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-gray-900">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('```')) {
                  return null; // Skip code block markers for now
                }
                if (paragraph.trim() === '') {
                  return <br key={index} />;
                }
                return (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}