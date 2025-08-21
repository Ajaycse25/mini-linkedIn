import { useState } from 'react';

const CreatePost = ({ token, posts, setPosts }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://mini-linkedin-backend-tzir.onrender.com/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create post');
      }
      setPosts((prev) => (Array.isArray(prev) ? [data.post, ...prev] : [data.post]));
      setContent('');
    } catch (err) {
      console.error('Error creating post:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
      <h2 className="text-lg font-semibold text-blue-300">Create a Post</h2>
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
      ></textarea>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        Post
      </button>
    </form>
  );
};

export default CreatePost;
