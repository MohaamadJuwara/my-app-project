import Link from 'next/link';

// Example blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt: "Learn the basics of Next.js and how to build modern web applications.",
    date: "2024-01-15",
    slug: "getting-started-nextjs"
  },
  {
    id: 2,
    title: "Building Responsive Dashboards",
    excerpt: "Create beautiful and functional dashboards that work on all devices.",
    date: "2024-01-10",
    slug: "building-responsive-dashboards"
  },
  {
    id: 3,
    title: "Modern CSS Techniques",
    excerpt: "Explore the latest CSS features and techniques for modern web development.",
    date: "2024-01-05",
    slug: "modern-css-techniques"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">Our Blog</h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Insights, tutorials, and updates from the Juwara Solutions team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-gray-900 hover:text-blue-600 transition-colors leading-tight"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}