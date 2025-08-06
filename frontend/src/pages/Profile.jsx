import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized. Please log in.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Something went wrong.');
        }

        setUser(data.user || null);
        setPosts(Array.isArray(data.posts) ? data.posts : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleDeletePost = async (postId) => {


    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete post.');
      }
      setPosts(prev => prev.filter(p => p._id !== postId));
    } catch (err) {
      alert("Error deleting post: " + err.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-300">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-400">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Your Profile</h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Go to Community
        </button>
      </div>

      <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg mb-6">
        <p className="mb-2"><span className="font-semibold text-blue-300">Name:</span> {user?.name}</p>
        <p className="mb-2"><span className="font-semibold text-blue-300">Email:</span> {user?.email}</p>
        <p><span className="font-semibold text-blue-300">Bio:</span> {user?.bio || <span className="text-gray-500">No bio provided.</span>}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Your Posts</h2>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="bg-[#1e1e1e] p-5 shadow rounded-md mb-5 relative">
              <h3 className="text-xl font-semibold mb-2 text-blue-200">{post.title}</h3>
              <p className="text-gray-300 mb-3">{post.content}</p>
              <p className="text-sm text-gray-500">
                Posted on: {new Date(post.createdAt).toLocaleString()}
              </p>
              <button
                onClick={() => handleDeletePost(post._id)}
                className="absolute top-4 right-4 text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400">You haven't created any posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
