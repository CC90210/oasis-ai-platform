import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = blogPosts.find(p => p.slug === slug);

    useEffect(() => {
        if (!post) {
            navigate('/blog');
        }
    }, [post, navigate]);

    if (!post) return null;

    const relatedPosts = blogPosts
        .filter(p => p.slug !== post.slug && p.category === post.category)
        .slice(0, 2);

    return (
        <div className="bg-bg-primary min-h-screen pt-24 pb-20">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-oasis-cyan z-50 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
                style={{ scaleX: 0 }} // This would need a scroll listener to be dynamic
            />

            <article className="max-w-4xl mx-auto px-6">
                <Link to="/blog" className="inline-flex items-center text-text-secondary hover:text-oasis-cyan mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
                </Link>

                <header className="mb-12 text-center">
                    <div className="flex items-center justify-center gap-4 text-sm text-oasis-cyan font-medium mb-6">
                        <span className="bg-oasis-cyan/10 px-3 py-1 rounded-full">{post.category}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-oasis-cyan/20 flex items-center justify-center">
                            <User className="w-5 h-5 text-oasis-cyan" />
                        </div>
                        <div className="text-left">
                            <div className="text-white font-medium">{post.author}</div>
                            <div className="text-xs text-text-tertiary">Automation Specialist</div>
                        </div>
                    </div>
                </header>

                <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-12 border border-white/10">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

                <div className="grid md:grid-cols-[1fr_250px] gap-12">
                    <div
                        className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-oasis-cyan prose-img:rounded-xl"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <div className="glass-card p-6 sticky top-24">
                            <h3 className="font-bold text-white mb-4">Share this article</h3>
                            <div className="flex gap-4 mb-8">
                                <button className="p-2 bg-white/5 rounded-lg hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </button>
                                <button className="p-2 bg-white/5 rounded-lg hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </button>
                                <button className="p-2 bg-white/5 rounded-lg hover:bg-[#4267B2]/20 hover:text-[#4267B2] transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </button>
                                <button className="p-2 bg-white/5 rounded-lg hover:bg-oasis-cyan/20 hover:text-oasis-cyan transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>

                            <h3 className="font-bold text-white mb-4">Ready to automate?</h3>
                            <p className="text-sm text-text-secondary mb-4">
                                Book a free strategy call to see how we can implement these solutions for you.
                            </p>
                            <Link to="/contact" className="btn-primary w-full text-center block text-sm">
                                Book Strategy Call
                            </Link>
                        </div>
                    </aside>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="max-w-6xl mx-auto px-6 mt-24 pt-12 border-t border-white/10">
                    <h2 className="text-2xl font-display font-bold text-white mb-8">Related Articles</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {relatedPosts.map(related => (
                            <Link key={related.slug} to={`/blog/${related.slug}`} className="group glass-card p-6 flex gap-6 hover:border-oasis-cyan/30 transition-all">
                                <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div>
                                    <div className="text-xs text-oasis-cyan font-medium mb-2">{related.category}</div>
                                    <h3 className="font-bold text-white mb-2 group-hover:text-oasis-cyan transition-colors line-clamp-2">
                                        {related.title}
                                    </h3>
                                    <span className="text-xs text-text-tertiary">{related.readTime}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default BlogPost;
