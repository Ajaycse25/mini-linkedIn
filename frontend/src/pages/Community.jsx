import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CreatePost from '../components/createPost.jsx';
import Feed from '../components/Feed.jsx';

const Community = () => {
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    if (user) setUserName(user.name);
    if (storedToken) setToken(storedToken);
  }, []);

 const fetchPosts = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/posts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Failed to fetch posts');

    const data = await res.json();
    setPosts(data.posts);
  } catch (err) {
    console.error(err.message);
  }
};

useEffect(() => {
  if (token) fetchPosts();
}, [token]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center px-4 py-4 bg-gray-800 shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-400 mb-2 sm:mb-0">
          Mini LinkedIn
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span className="text-gray-300 text-sm sm:text-base">Welcome, {userName}</span>
          <div className="flex flex-row gap-2">
            <button
              onClick={goToProfile}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base transition"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
       <CreatePost token={token} posts={posts} setPosts={setPosts} />

        <Feed posts={posts} />
      </main>
    </div>
  );
};

export default Community;
