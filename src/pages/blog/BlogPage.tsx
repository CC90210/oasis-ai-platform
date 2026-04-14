import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import GlobalBackground from '../../components/GlobalBackground';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};

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
        <div className="min-h-screen overflow-x-hidden font-sans text-white">
            {/* Background */}
            <div
                className="fixed inset-0 -z-20"
                style={{ background: 'linear-gradient(180deg, #030712 0%, #071426 50%, #030712 100%)' }}
            />
            <GlobalBackground intensity="high" showDNA={false} />
            <div className="fixed inset-0 pointer-events-none -z-10" style={{
                background: 'radial-gradient(ellipse at 50% 20%, rgba(6,182,212,0.08) 0%, transparent 65%)'
            }} />

            {/* Hero */}
            <section className="relative pt-32 pb-20 px-6 z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-oasis-teal/30 bg-oasis-slate/40 backdrop-blur-md text-sm font-medium tracking-wide text-oasis-mist/90">
                        <span className="w-2 h-2 rounded-full bg-oasis-teal animate-pulse" />
                        Insights
                    </motion.span>
                    <motion.h1 variants={fadeUp} className="font-editorial text-6xl md:text-8xl leading-[0.95] tracking-tight mb-8">
                        <span className="block text-white/95">OASIS</span>
                        <span className="block italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">
                            insights.
                        </span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-xl text-white/70 max-w-2xl mx-auto font-light">
                        Expert perspectives on AI automation, business strategy, and the future of work.
                    </motion.p>
                </motion.div>
            </section>

            <div className="relative z-10 px-6 pb-24">
                <div className="max-w-7xl mx-auto">
                    {/* Featured Post */}
                    {selectedCategory === 'All' && !searchQuery && (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUp}
                            className="mb-20"
                        >
                            <Link to={`/blog/${featuredPost.slug}`} className="group relative block rounded-2xl overflow-hidden aspect-[21/9] border border-white/10 hover:border-oasis-teal/30 transition-all duration-300">
                                <img
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-4xl">
                                    <div className="flex items-center gap-4 text-sm text-oasis-teal font-medium mb-4">
                                        <span className="bg-oasis-teal/10 border border-oasis-teal/20 px-3 py-1 rounded-full">{featuredPost.category}</span>
                                        <span className="flex items-center gap-1 text-white/50"><Calendar className="w-4 h-4" /> {featuredPost.date}</span>
                                    </div>
                                    <h2 className="font-editorial text-3xl md:text-5xl text-white mb-4 group-hover:text-oasis-teal transition-colors">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-lg text-white/60 mb-6 line-clamp-2">
                                        {featuredPost.excerpt}
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-white font-medium group-hover:text-oasis-teal transition-colors">
                                        Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-oasis-teal to-oasis-sky text-white'
                                        : 'bg-white/5 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:border-oasis-teal/30'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-oasis-teal/40 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Post Grid */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={stagger}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredPosts.map((post, index) => (
                            <motion.div key={post.slug} variants={fadeUp}>
                                <Link
                                    to={`/blog/${post.slug}`}
                                    className="group flex flex-col h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-oasis-teal/30 transition-all duration-300"
                                >
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-[#030712]/80 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-white border border-white/10">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-4 text-xs text-white/40 mb-3">
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-oasis-teal transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-white/50 text-sm mb-6 line-clamp-3 flex-1">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-oasis-teal/10 border border-oasis-teal/20 flex items-center justify-center">
                                                    <User className="w-3 h-3 text-oasis-teal" />
                                                </div>
                                                <span className="text-xs text-white/50">{post.author}</span>
                                            </div>
                                            <span className="inline-flex items-center gap-1 text-oasis-teal text-sm font-medium group-hover:translate-x-1 transition-transform">
                                                Read <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-white/50 text-lg mb-4">No articles found matching your search.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                className="text-oasis-teal hover:underline font-medium"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
