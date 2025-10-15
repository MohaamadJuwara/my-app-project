import { getPosts } from '@/lib/posts'
import Link from 'next/link'
 
type PostProps = {
  post: {
    slug: string;
    title: string;
    // add other properties if needed
  };
};

export default async function Post({ post }: PostProps) {
  const posts = await getPosts()
 
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}