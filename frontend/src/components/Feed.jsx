import { useEffect, useState } from 'react';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const fetchFeed = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/posts/feed');
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to load feed');

      setPosts(data);
    } catch (err) {
      console.error('Error fetching feed:', err.message);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">Community Feed</h2>

      {posts.length === 0 ? (
        <p className="text-gray-400 italic">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-gray-800 rounded-lg shadow-md p-4 transition hover:scale-[1.01] hover:shadow-lg"
          >
            <p className="text-green-400 font-semibold mb-1">
              {post.userId?.name || 'Unknown User'}
            </p>
            <p className="text-gray-200 mb-2">{post.content}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
