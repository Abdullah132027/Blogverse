import BlogItem from "../Components/BlogItem"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import vdo from '../assets/bg.mp4'

const content = JSON.parse(localStorage.getItem('posts')) || [];


const writersData = [
    {
        id: 1,
        name: "Abdullah",
        bio: "React & Tailwind Developer",
        image: "https://i.pravatar.cc/150?img=5",
    },
    {
        id: 2,
        name: "Fatima",
        bio: "Tech Blogger & Designer",
        image: "https://i.pravatar.cc/150?img=4",
    },
    {
        id: 3,
        name: "Rashid",
        bio: "Full Stack Engineer",
        image: "https://i.pravatar.cc/150?img=7",
    },
    {
        id: 4,
        name: "Shamima",
        bio: "Writer & Content Strategist",
        image: "https://i.pravatar.cc/150?img=8",
    },
];

function Home() {
    const navigate = useNavigate();
    const getStarted = () => {
        navigate("/blog");
    }
    return (
        <>
            <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                >
                    <source src={vdo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay for darkness (optional) */}
                <div className="absolute top-0 left-0 w-full h-full bg-secondary opacity-40 z-10"></div>

                {/* Foreground content */}
                <div className="relative z-20 text-center text-white px-4">
                    <h2 className="text-3xl font-bold mb-4 uppercase">Discover something new today</h2>
                    <p className="text-lg text-gray-200 mb-6 max-w-3xl">
                        Explore our latest blogs, tutorials, and resources to enhance your knowledge and skills in web development, design, and more.
                    </p>
                    <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-80 transition cursor-pointer" onClick={getStarted}>
                        Get Started
                    </button>
                </div>
            </section>

            <section className="container mx-auto mb-12">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-medium p-4">Top Blog</h3>
                    <Link to="/blog" className="text-primary pr-5">View All</Link>
                </div>
                <div className="flex flex-wrap">
                    {content.map((item, index) => (
                        <BlogItem
                            key={item.postId}
                            postId={item.postId}
                            category={item.category}
                            title={item.heading}
                            description={item.content}
                            image={item.image}
                            date={item.date}
                            userName={item.userName}
                        />
                    ))}
                </div >
            </section>

            <section className="bg-gray-100 pt-12 pb-8">
                <div className="container mx-auto px-5 flex justify-between items-center">
                    <h3 className="text-2xl font-medium text-center">Meet Our Writers</h3>
                    <Link to="/our-writers" className="text-primary pr-5">View All</Link>
                </div>
                <div className="container mx-auto my-12 px-4 flex justify-between flex-wrap ">
                    {writersData.map(writer => {
                        return (
                            <div key={writer.id} className="bg-white min-w-48 mb-4 border-2 border-primary rounded-xl shadow-md p-4 text-center">
                                <img src={writer.image} alt={writer.name} className="rounded-full w-16 h-16 mx-auto mb-2 border-2 border-primary" />
                                <h4 className="text-lg font-semibold">{writer.name}</h4>
                                <p className="text-sm text-gray-600">{writer.bio}</p>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-medium text-center mb-8 text-gray-800">Sponsored By</h3>

                    <div className="flex flex-wrap justify-center items-center gap-50">
                        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://assets.vercel.com/image/upload/v1629993480/front/favicon/vercel/android-chrome-192x192.png"
                                alt="Vercel"
                                className="h-16 w-auto grayscale hover:grayscale-0 transition duration-300"
                            />
                        </a>

                        <a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png"
                                alt="Firebase"
                                className="h-16 w-auto grayscale hover:grayscale-0 transition duration-300"
                            />
                        </a>

                        <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://tailwindcss.com/favicons/favicon-32x32.png"
                                alt="Tailwind CSS"
                                className="h-16 w-auto grayscale hover:grayscale-0 transition duration-300"
                            />
                        </a>

                        <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://reactjs.org/favicon.ico"
                                alt="React"
                                className="h-16 w-auto grayscale hover:grayscale-0 transition duration-300"
                            />
                        </a>
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-8">
                        Interested in sponsoring? <a href="/contact" className="text-primary underline">Contact us</a>
                    </p>
                </div>
            </section>
        </>
    )
}

export default Home
