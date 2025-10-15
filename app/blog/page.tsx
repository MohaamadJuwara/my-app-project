// Example placeholder data for people
export const people = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://via.placeholder.com/50",
    TestingJuwara: "Sample Data"
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://via.placeholder.com/50",
    TestingJuwara: "Sample Data"
  }
];

// Use someData in your component

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
 
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}

function getPost(slug: string): { title: string; content: string } {
    // Example implementation, replace with actual data fetching logic
    return {
        title: `Post: ${slug}`,
        content: "This is the content of the blog post."
    };
}

function PeoplePage() {
  return (
    <div>
      <h1>People</h1>
      <ul>
        {people.map(person => (
          <li key={person.id}>
            <img src={person.avatar} alt={person.name} width={50} height={50} />
            <strong>{person.name}</strong> — {person.TestingJuwara}
          </li>
        ))}
      </ul>
    </div>
  );
}
