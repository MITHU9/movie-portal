import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Community = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const forumPosts = [
    {
      id: 1,
      title: "Favorite Movies of 2023?",
      author: "John Doe",
      content:
        "What are your favorite movies released this year? Let's discuss the top picks!",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title: "Best Movie Soundtracks?",
      author: "Jane Smith",
      content:
        "Which movies have soundtracks that you can't stop listening to?",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      title: "Underrated Directors",
      author: "Alex Green",
      content:
        "Who are some directors that don't get the recognition they deserve?",
      timestamp: "1 day ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="py-6 bg-gray-800 dark:bg-gray-700 text-white">
        <h1 className="text-center text-3xl font-bold">Community & Forums</h1>
        <p className="text-center text-sm mt-2">
          Connect with fellow movie enthusiasts and share your thoughts!
        </p>
      </header>

      <main className="container mx-auto px-4 py-10">
        <section>
          <h2 className="text-2xl font-bold mb-6" data-aos="fade-up">
            Latest Discussions
          </h2>

          <div className="space-y-8">
            {forumPosts.map((post) => (
              <div
                key={post.id}
                className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg"
                data-aos="fade-up"
              >
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By {post.author} | {post.timestamp}
                </p>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  {post.content}
                </p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Join Discussion
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6" data-aos="fade-up">
            Start a Discussion
          </h2>

          <form
            className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg"
            data-aos="fade-up"
          >
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 outline-none"
                placeholder="Enter the discussion title"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300"
              >
                Content
              </label>
              <textarea
                id="content"
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 outline-none"
                placeholder="Write your thoughts here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Post Discussion
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Community;
