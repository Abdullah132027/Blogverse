import React from 'react';

function Footer() {
    return (
        <footer className="bg-secondary text-primary">
            <div className="container mx-auto px-5 py-16">
                <div className="flex flex-wrap justify-between text-center md:text-left">
                    {/* Navigation */}
                    <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-6">
                        <h2 className="font-semibold text-sm tracking-wider mb-4">Quick Links</h2>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-gray-300">Home</a></li>
                            <li><a href="/about" className="hover:text-gray-300">About</a></li>
                            <li><a href="/blog" className="hover:text-gray-300">Blog</a></li>
                            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-6">
                        <h2 className="font-semibold text-sm tracking-wider mb-4">Resources</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-gray-300">FAQ</a></li>
                            <li><a href="#" className="hover:text-gray-300">Support</a></li>
                        </ul>
                    </div>

                    {/* Subscribe */}
                    <div className="w-full md:w-1/2 px-4 mb-6">
                        <h2 className="font-semibold text-sm tracking-wider mb-4">Subscribe to Our Newsletter</h2>
                        <p className="text-gray-400 mb-4">Stay updated with the latest blog posts and updates.</p>
                        <form className="flex flex-col sm:flex-row items-center gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full sm:w-auto flex-1 px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-primary/50 text-primary bg-white"
                            />
                            <button
                                type="submit"
                                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} <span className="text-primary">BlogVerse</span>. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <a href="#" className="hover:text-primary">Twitter</a>
                        <a href="#" className="hover:text-primary">LinkedIn</a>
                        <a href="#" className="hover:text-primary">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
