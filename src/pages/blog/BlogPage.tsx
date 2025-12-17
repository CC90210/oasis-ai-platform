import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';

const BlogPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredPost = blogPosts[0];

    return (
        <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
            <div className="section-container relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                        OASIS <span className="text-oasis-cyan">Insights</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                        Expert perspectives on AI automation, business strategy, and the future of work.
                    </p>
                </div>

                {/* Featured Post */}
                {selectedCategory === 'All' && !searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-20"
                    >
                        <Link to={`/blog/${featuredPost.slug}`} className="group relative block rounded-2xl overflow-hidden aspect-[21/9] border border-white/10">
                            <img
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-4xl">
                                <div className="flex items-center gap-4 text-sm text-oasis-cyan font-medium mb-4">
                                    <span className="bg-oasis-cyan/10 px-3 py-1 rounded-full">{featuredPost.category}</span>
                                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {featuredPost.date}</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 group-hover:text-oasis-cyan transition-colors">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-lg text-text-secondary mb-6 line-clamp-2">
                                    {featuredPost.excerpt}
                                </p>
                                <span className="inline-flex items-center text-white font-medium group-hover:text-oasis-cyan transition-colors">
                                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                    ? 'bg-oasis-cyan text-bg-primary'
                                    : 'bg-bg-tertiary text-text-secondary hover:text-white'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-bg-tertiary border border-white/10 rounded-full py-2 pl-10 pr-4 text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan/50 transition-colors"
                        />
                    </div>
                </div>

                {/* Post Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={`/blog/${post.slug}`} className="group flex flex-col h-full glass-card overflow-hidden hover:border-oasis-cyan/30 transition-all">
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-bg-primary/80 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-white border border-white/10">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 text-xs text-text-tertiary mb-3">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-oasis-cyan transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-text-secondary text-sm mb-6 line-clamp-3 flex-1">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-oasis-cyan/20 flex items-center justify-center">
                                                <User className="w-3 h-3 text-oasis-cyan" />
                                            </div>
                                            <span className="text-xs text-text-secondary">{post.author}</span>
                                        </div>
                                        <span className="text-oasis-cyan text-sm font-medium group-hover:translate-x-1 transition-transform">
                                            Read <ArrowRight className="w-3 h-3 inline ml-1" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-text-secondary text-lg">No articles found matching your search.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                            className="mt-4 text-oasis-cyan hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
